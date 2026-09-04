#!/usr/bin/env bash
#
# Post-session deployment driver.
#
# Reads deploy/deploy.config.json and deploys the already-pushed main branch.
# Ships DISABLED. A project opts in by copying deploy/deploy.config.example.json
# to deploy/deploy.config.json (gitignored) and setting "enabled": true.
#
# Exit codes:
#   0  deployed, or nothing to do (not configured / disabled)
#   3  configured but requires explicit human approval this run
#   1  deploy attempted and failed
#
set -uo pipefail

CONFIG="${DEPLOY_CONFIG:-deploy/deploy.config.json}"

fail() { echo "deploy: $*" >&2; exit 1; }

root=$(git rev-parse --show-toplevel 2>/dev/null) || fail "not a git repository"
cd "$root" || fail "cannot enter $root"

if [ ! -f "$CONFIG" ]; then
  echo "deploy: no $CONFIG — skipped (nothing to deploy)"
  exit 0
fi

jq -e . "$CONFIG" >/dev/null 2>&1 || fail "$CONFIG is not valid JSON"

cfg() { jq -r "$1 // empty" "$CONFIG"; }

enabled=$(cfg '.enabled')
if [ "$enabled" != "true" ]; then
  echo "deploy: disabled in $CONFIG — skipped"
  exit 0
fi

method=$(cfg '.method')
[ -z "$method" ] && fail "$CONFIG has no \"method\""

# Deployment is outward-facing. Unattended runs require an explicit opt-in in
# the config; otherwise the caller must confirm with the user and re-run with
# DEPLOY_CONFIRMED=1.
auto=$(cfg '.auto_deploy')
if [ "$auto" != "true" ] && [ "${DEPLOY_CONFIRMED:-}" != "1" ]; then
  echo "deploy: configured (method=$method) but auto_deploy is false."
  echo "deploy: ask the user to confirm, then re-run with DEPLOY_CONFIRMED=1."
  exit 3
fi

echo "deploy: starting (method=$method)"

case "$method" in
  none)
    echo "deploy: method=none — skipped"
    exit 0
    ;;

  ssh)
    host=$(cfg '.ssh.host');    [ -z "$host" ] && fail "ssh.host is empty"
    user=$(cfg '.ssh.user');    [ -z "$user" ] && fail "ssh.user is empty"
    path=$(cfg '.ssh.path');    [ -z "$path" ] && fail "ssh.path is empty"
    port=$(cfg '.ssh.port');    [ -z "$port" ] && port=22
    remote_cmd=$(cfg '.ssh.command')
    [ -z "$remote_cmd" ] && fail "ssh.command is empty"

    # BatchMode: never hang waiting for a password or host-key prompt.
    ssh -o BatchMode=yes -o StrictHostKeyChecking=accept-new -p "$port" \
      "${user}@${host}" "cd $(printf '%q' "$path") && $remote_cmd" \
      || fail "ssh deploy to ${user}@${host} failed"
    ;;

  webhook)
    url_env=$(cfg '.webhook.url_env')
    [ -z "$url_env" ] && fail "webhook.url_env is empty (name the env var holding the URL; never store it in the config)"
    url="${!url_env:-}"
    [ -z "$url" ] && fail "environment variable $url_env is not set"

    code=$(curl -sS -o /dev/null -w '%{http_code}' -X POST --max-time 60 "$url") \
      || fail "webhook request failed"
    case "$code" in
      2*) ;;
      *) fail "webhook returned HTTP $code" ;;
    esac
    ;;

  command)
    local_cmd=$(cfg '.command')
    [ -z "$local_cmd" ] && fail ".command is empty"
    bash -c "$local_cmd" || fail "deploy command failed"
    ;;

  *)
    fail "unknown method \"$method\" (expected: none, ssh, webhook, command)"
    ;;
esac

# --- health check -----------------------------------------------------------
health=$(cfg '.health_check_url')
if [ -n "$health" ]; then
  for attempt in 1 2 3 4 5; do
    code=$(curl -sS -o /dev/null -w '%{http_code}' --max-time 15 "$health" 2>/dev/null || echo 000)
    case "$code" in
      2*|3*) echo "deploy: health check OK ($code) after ${attempt} attempt(s)"; exit 0 ;;
    esac
    sleep 5
  done
  fail "health check on $health never returned 2xx/3xx (last: ${code:-none}) — deploy ran but the service looks unhealthy"
fi

echo "deploy: completed (no health_check_url configured)"
