# Changelog

## 2026-09-04 — Project documentation scaffold

**Added**

- Copied the universal agent template from `~/Documents/Github/Templates/Project-Template`
  and pruned it to this stack: `.claude/` (agents, commands, hooks, settings),
  `rules/` (common, react, typescript, framework, frontend, backend, api,
  database, security, tools), `skills/` (9 relevant), `workflows/` (7 relevant),
  `templates/`, `.gitignore`, `.mcp.json`.
- Removed everything irrelevant to a React/Express/MongoDB build: other-language
  rules (Go, Rust, Swift, Vue, Python, React Native), LLM-provider selection docs,
  web-data acquisition, sandbox and automation workflows, permissions and
  evaluation rules.
- Wrote every project-specific document:
  - `START_HERE.md` — orientation and reading order for a cold agent
  - `CLAUDE.md` — project brain, switched to **PROJECT_MODE**
  - `AGENTS.md` — portable instructions for non-Claude agents
  - `README.md` — submission README with all 10 required items
  - `AI-PROMPT-LOG.md` — mandatory prompt log with rules and a worked example
  - `design.md` — colors, typography, components, states, accessibility
  - `agent/BRIEF.md` — full brief, data model, risks, approval model
  - `agent/TODO.md` — the master task list, Phase 0 to Phase 9
  - `agent/DECISIONS.md` — 9 architecture decisions with alternatives and risks
  - `agent/MEMORY.md` — gotchas, patterns, versions, handoff notes
  - `docs/requirements.md` — the 10 minimum requirements + the validation rule table
  - `docs/RUBRIC.md` — rubric-to-evidence matrix, 100 marks
  - `docs/ARCHITECTURE.md` — system design, data flow, API contract
  - `docs/DEPLOYMENT.md` — Atlas → Railway → Vercel runbook
  - `docs/TESTING.md` — 9-suite manual test matrix
  - `docs/TEAM.md` — ownership, commit plan, live-edit readiness
  - `docs/VIVA.md` — video script, live flow, per-member answer sheet
  - `docs/SUBMISSION.md` — PDF skeleton, final checklist, wall card
  - `docs/TROUBLESHOOTING.md` — every known failure point and its fix
  - `docs/ENV_VARS.md` — the three variables and their platform settings
- Created `server/.env`, `server/.env.example`, `client/.env`,
  `client/.env.example` with placeholders and inline guidance. Both `.env` files
  are gitignored; both `.env.example` files are tracked.

**Recorded**

- Team roster: W.M.S.S.B. Wasala (IT24100559, Member A) · Karunathilaka K.D.J.C
  (IT24100551, Member B, Group Leader) · Fernando K.R.N (IT24101875, Member C) ·
  Samaranayaka S.G.V.S (IT23544154, Member D).

**Not done**

- No application code. No `client/src`, no `server/*.js`, no `package.json`.
- Git repository not initialised.
- The next agent starts at `agent/TODO.md` → **T0.1**.
