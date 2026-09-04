---
name: wrap-session
description: Post-coding-session wrap-up — update agent files, commit, land on main, deploy.
allowed_tools: ["Bash", "Read", "Write", "Edit", "Grep", "Glob"]
---

# /wrap-session

End-of-coding-session protocol. Fires automatically from the `Stop` hook
(`.claude/hooks/session-wrap.sh`) whenever the repo has uncommitted or unpushed
work. Also invocable by hand.

Standing policy: do not ask whether to run this. Run it.

## Step 1 — Update the agent files (never skip)

Update only what actually changed this session. Do not pad with restatements of
the diff — git already has that.

| File | Update when | What goes in |
|---|---|---|
| `agent/TODO.md` | always | Move finished items to **Done**. Add anything discovered but not done to **Next** or **Blocked**. Rewrite **Current** and **Last Session**. |
| `agent/MEMORY.md` | when something non-obvious was learned | Project knowledge, mistakes to avoid, patterns that worked, dependency/version gotchas, environment notes. Never secrets, keys, or tokens. |
| `agent/DECISIONS.md` | when a design or tooling choice was made | One dated entry in the file's format: decision, reason, alternatives considered, risk, status. |
| `agent/BRIEF.md` | when scope, users, or the problem statement moved | Keep it current; it is the first thing the next session reads. |
| `CLAUDE.md` | when stack/tools/platform were chosen or changed | Update the **Current selections** block (Stack, Web-data tool, Backend, Deployment, LLM, Evaluator, Approval model) and flip `STATUS` if the mode changed. |
| `design.md` | when UI/UX direction changed | Keep in sync with what was actually built. |

If nothing meaningful changed for a file, leave it alone. `agent/TODO.md` is the
exception — it always gets a pass.

## Step 2 — Commit

Review the diff first, then commit with a conventional-commit message
(`feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`, `perf:`, `ci:`).

Before staging, confirm no secrets, `.env` files, or credentials are in the diff.

Work that is genuinely mid-flight still gets committed — record the state in
`agent/TODO.md` under **Current** and commit it as WIP. Unrecorded work is worse
than an untidy commit.

## Step 3 — Land it on `main`

```bash
bash .claude/hooks/git-sync-main.sh
```

Pushes the current branch, then fast-forwards `main` and pushes it. Refuses
anything that is not a fast-forward and never force-pushes — if it reports a
divergence, integrate `main` into the branch, then re-run.

## Step 4 — Deploy

```bash
bash .claude/hooks/deploy.sh
```

- No `deploy/deploy.config.json` → exits 0, nothing to do. This is the template default.
- Config present with `"auto_deploy": true` → deploys unattended.
- Config present with `"auto_deploy": false` → exits **3** without deploying. Ask the user to
  confirm, and only then re-run as `DEPLOY_CONFIRMED=1 bash .claude/hooks/deploy.sh`.
- Exit 1 → deploy failed. Report the error verbatim; do not retry blindly and do not
  claim the deploy succeeded.

## Step 5 — Report one line

```
Wrap-up: agent files=[TODO,MEMORY] · commit=<sha> · main=pushed · deploy=<deployed|skipped|needs-approval|FAILED>
```

Report what actually happened. If a step was skipped or failed, say so plainly.
