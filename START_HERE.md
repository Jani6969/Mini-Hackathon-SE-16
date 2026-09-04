# START HERE — Negombo Fish Price Board

**Read this file first. It tells you exactly what this repo is, what order to read
things in, and where the work list lives.**

---

## What this project is

| Field | Value |
|---|---|
| Project | Negombo Fish Price Board — Daily Landing-Site Price Transparency |
| Course | SLIIT SE3090 Mini Hackathon |
| Group | SE_016 (4 members) |
| Repo name | `negombo-fish-price-board` |
| Status | **Scaffold not yet built.** Only planning/agent docs exist. |
| Stack | React 18 + Vite (Vercel) → Express (Railway) → MongoDB Atlas |
| Hard deadline | Build stop 11:55 · CourseWeb submit 12:55 |

A public price board where fishermen and buyers at Negombo landing sites report
today's fish price, and anyone can search, filter and see the live average.

---

## Reading order for an AI agent picking this up cold

1. **`START_HERE.md`** (this file) — orientation
2. **`CLAUDE.md`** — project brain, mode, rules, gates, skill router
3. **`agent/BRIEF.md`** — full project brief (problem, users, data model, scope)
4. **`agent/TODO.md`** — ⭐ **THE MASTER TASK LIST.** Every step from empty repo
   to CourseWeb upload. Work top to bottom. Do not skip a numbered task.
5. **`agent/DECISIONS.md`** — why each technology was chosen (needed for viva)
6. **`agent/MEMORY.md`** — accumulated facts, gotchas, session handoff
7. **`docs/requirements.md`** — the 10 minimum functional requirements
8. **`docs/RUBRIC.md`** — how marks are actually awarded, evidence per criterion
9. **`docs/ARCHITECTURE.md`** — system design and data flow
10. **`docs/DEPLOYMENT.md`** — Atlas + Railway + Vercel, step by step
11. **`docs/TESTING.md`** — the manual test matrix that must pass before submit
12. **`docs/TEAM.md`** — who owns which file, and the commit plan per member
13. **`docs/VIVA.md`** — 2-minute video script + memorised viva answers
14. **`docs/SUBMISSION.md`** — PDF, video, CourseWeb upload
15. **`docs/TROUBLESHOOTING.md`** — every known failure point and its fix
16. **`design.md`** — colors, typography, components, states
17. **`HACKATHON_BUILD_PLAN_FINAL.md`** — the original source-of-truth plan with
    **all reference code**. Copy code from here; do not reinvent it.

---

## Your first instruction if you are the implementing agent

```text
Read CLAUDE.md, agent/BRIEF.md and agent/TODO.md. Then execute agent/TODO.md
from the top, in order, ticking each box as you complete it. All reference code
is in HACKATHON_BUILD_PLAN_FINAL.md — use it verbatim unless a task says
otherwise. Do not add features listed under "Out of scope" in agent/BRIEF.md.
Stop and ask before any deploy, any secret handling, or any destructive git
operation.
```

---

## Hard rules for this repo

- **No secrets in Markdown or in git.** `MONGO_URI` lives only in `server/.env`
  (gitignored) and in the Railway dashboard.
- **Scope is locked.** No auth, no admin panel, no maps, no charts, no chatbot.
  See `agent/BRIEF.md` → Out of scope.
- **All four members must have meaningful commits** under their own git identity.
  See `docs/TEAM.md`.
- **`AI-PROMPT-LOG.md` is mandatory** and must be filled as you go, not at the end.
- **Do not present sample prices as real market data.** They are illustrative.
- **Build stop at 11:55.** After that: deploy, verify, document, submit only.

---

## Definition of "project complete"

Every box in `agent/TODO.md` is ticked, including Phase 8 (Submission).
The final gate is `docs/SUBMISSION.md` → Final 10-Minute Pre-Submission Checklist.
