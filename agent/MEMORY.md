# Agent Memory — Negombo Fish Price Board

## Do not store

Never store in this file, in any Markdown, in a commit, or in chat:

- the Atlas password or any `mongodb+srv://` connection string
- API keys, tokens, private keys
- student personal data beyond names and IT numbers already in the README
- OneDrive or CourseWeb credentials

`MONGO_URI` lives in exactly two places: `server/.env` (gitignored) and the
Railway Variables dashboard.

---

## Project knowledge

- **Status as of 2026-09-04:** planning and agent documentation complete. **No
  application code exists yet.** `client/` and `server/` exist but contain only
  `.env` and `.env.example` — no `package.json`, no source files, no git
  repository. The next agent starts at `agent/TODO.md` → **T0.2**.
- All reference code for every file is already written in
  `HACKATHON_BUILD_PLAN_FINAL.md`. Copy it; do not reinvent it.
- The whole product is four routes (`/`, `/prices`, `/add`, `*`) and two API
  endpoints (`GET /api/prices`, `POST /api/prices`). That is the entire scope.
- Time is the binding constraint, not difficulty. Build stop **11:55**, submit by
  **12:55**.
- The rubric awards the **lower** band when work sits between two bands, so
  evidence must be explicit rather than inferable.
- Marks come from a *complete, reliable, well-explained core* — not from extra
  features. Extra features that break the deployment are negative value.

## Team

| Code | Name | Student ID | Component |
|---|---|---|---|
| A | W.M.S.S.B. Wasala | IT24100559 | Integration, API, deployment |
| B | Karunathilaka K.D.J.C (Group Leader) | IT24100551 | Form + validation |
| C | Fernando K.R.N | IT24101875 | List, search, filter, average, 404 |
| D | Samaranayaka S.G.V.S | IT23544154 | Home, nav, CSS, sample data |

The Group Leader is B, not A. A owns deployment and merges by role; the Leader
signs off on the submission.

## Deployed URLs

Fill these in during Phase 6 and keep them here for handoff.

| Thing | URL |
|---|---|
| GitHub repo | https://github.com/Jani6969/Mini-Hackathon-SE-16 |
| Vercel (frontend) | https://negombo-fish-price-board.vercel.app |
| Railway (API) | https://api-production-e135.up.railway.app |
| Railway health probe | https://api-production-e135.up.railway.app/health |
| Demo video (OneDrive) | _TBD_ |

---

## Mistakes to avoid

These are known, specific failure modes for this exact stack. Each one has cost a
team marks before.

1. **Atlas Network Access not set to `0.0.0.0/0`.** The API deploys fine and then
   every query times out. Verify with `/health` showing `database: connected`.
2. **`VITE_API_URL` set after the first Vercel deploy.** Vite bakes environment
   variables in at *build* time, so the running bundle has an empty API URL. You
   must **redeploy** after adding the variable.
3. **Trailing slash on `VITE_API_URL`.** Produces `https://host//api/prices`.
4. **`app.use(cors())` placed after the route registration.** CORS must be
   registered *before* `app.use('/api/prices', ...)` or the browser blocks every
   request from Vercel.
5. **Wrong root directory.** Vercel root must be `client`; Railway root must be
   `server`. Either wrong and the build or start fails.
6. **Missing `"type": "module"` in `server/package.json`.** Produces
   `require is not defined` on start, because the files use ESM `import`.
7. **Hardcoding `PORT`.** Railway injects it; `server.js` must read
   `process.env.PORT` with a local fallback of 5000.
8. **Forgetting `event.preventDefault()`** in the form submit handler — the page
   reloads and the submission is lost.
9. **Using the array index as the React `key`.** The list prepends new records, so
   index keys break reconciliation. Use `key={p._id}`. This is a viva question.
10. **Running `npm run seed` after the deployment demo.** `seed.js` calls
    `deleteMany({})` and would wipe the record you just proved persists in Atlas.
    Seed only during Phase 2.
11. **A hard refresh on `/prices` returning a Vercel 404.** A client-routed SPA
    needs a rewrite to `index.html` — add `client/vercel.json` (task T6.18).
12. **A member with no commits.** Costs the whole 5-mark contribution criterion.
    File-level ownership (see `docs/TEAM.md`) prevents it, but verify with
    `git log --pretty=format:"%an %s"` before submitting.
13. **A OneDrive video link that requires login.** Counts as no video. Set sharing
    to "anyone with the link" and test it in incognito.
14. **Describing the sample prices as real market data.** An integrity problem.
    They are illustrative; the prototype notice must be visible in the UI.
15. **Testing only on campus wifi.** Test the deployed link on a phone using
    mobile data — it catches network-scoped failures the marker would hit.

---

## Patterns that work

- **Props down, callbacks up.** `App.jsx` owns the data; `PriceList` takes
  `prices` as a prop; `AddPrice` takes an `onAdd` callback. B and C are never
  blocked on the API, and the merge at 11:15 is nearly conflict-free.
- **Derived state, not duplicated state.** The filtered list and the average are
  computed on every render from `prices` + `search` + `market`. There is no second
  array to keep in sync.
- **One file per member.** Removes merge conflicts *and* produces the git evidence
  the rubric asks for, without anyone having to manufacture commits later.
- **Verify before ticking.** Run the command, read the output, then tick the box.
  `agent/TODO.md` is only useful if its ticks are trustworthy.
- **Deploy the backend before the frontend.** The frontend build needs the API URL
  baked in, so the API must have a domain first.
- **`/health` as deployment evidence.** One URL that proves both "the API is up"
  and "the database is connected" — far faster than explaining it.

---

## Dependencies and versions

Pin nothing beyond what `npm` resolves; these are the expected majors.

**server/**
- `express` ^4
- `mongoose` ^8
- `cors` ^2
- `dotenv` ^16
- `nodemon` ^3 (dev)
- `"type": "module"` — ESM, not CommonJS

**client/**
- `react` ^18, `react-dom` ^18
- `react-router-dom` ^6
- `vite` ^5 (scaffolded by `npm create vite@latest`)

Node 18+ required (top-level `await` in `seed.js`, native `fetch` in tooling).

---

## Environment notes

| Variable | Where it lives | Value |
|---|---|---|
| `MONGO_URI` | `server/.env` (local) + Railway Variables | Atlas connection string — **never committed** |
| `PORT` | `server/.env` (local) · injected by Railway | 5000 locally |
| `VITE_API_URL` | `client/.env` (local) + Vercel env vars | `http://localhost:5000` locally, the Railway domain in production, **no trailing slash** |

- `server/.env` and `client/.env` are both gitignored. Verify with
  `git check-ignore -v server/.env`.
- Local ports: API 5000, Vite dev server 5173.
- Database name in the connection string: `fishprice`. Collection: `prices`.

---

## Session handoff notes

**2026-09-04 — documentation session (no code).**

Set up the project from the universal agent template at
`~/Documents/Github/Templates/Project-Template`. Copied `.claude/` (agents,
commands, hooks, settings), `rules/`, `skills/`, `workflows/`, `docs/`, `agent/`,
`templates/`, `.gitignore`, `.env.example`, `.mcp.json`. Pruned everything
irrelevant to this stack — other-language rules, LLM-provider docs, web-data
acquisition, sandbox and automation workflows.

Wrote every project-specific document: `CLAUDE.md` (switched to **PROJECT_MODE**),
`START_HERE.md`, `AGENTS.md`, `README.md` skeleton, `AI-PROMPT-LOG.md`,
`design.md`, `agent/BRIEF.md`, `agent/TODO.md`, `agent/DECISIONS.md`, this file,
and `docs/{ARCHITECTURE, requirements, RUBRIC, ENV_VARS, DEPLOYMENT, TESTING,
TEAM, VIVA, SUBMISSION, TROUBLESHOOTING, changelog}.md`.

**The next agent should:** read `START_HERE.md`, then `CLAUDE.md`, then
`agent/BRIEF.md`, then execute `agent/TODO.md` from **T0.1** in order.

Team roster supplied and recorded in `docs/TEAM.md`, `README.md`, `agent/BRIEF.md`
and `docs/SUBMISSION.md`. `server/.env`, `server/.env.example`, `client/.env` and
`client/.env.example` created with placeholders — only `MONGO_URI` still needs a
real value.

**Still unknown:** the four GitHub usernames (for collaborator invites), the
GitHub org/user for the repo URL, and the OneDrive account for the video.
See `agent/BRIEF.md` → Open questions.

---

## 2026-09-04 — Stitch MCP + UI rebuild

**Stitch MCP server.** Added to Claude Code at **user** scope, so it is available
in every project, not just this worktree. Two gotchas worth remembering:

- `claude mcp add`'s `--header` flag is variadic (`-H, --header <header...>`), so
  it swallows a URL placed after it. The URL must come **before** `--header`, or
  the command fails with `missing required argument 'commandOrUrl'`.
- MCP tools bind at session start. A server added mid-session has no `mcp__*`
  tools until Claude Code restarts. The server can still be driven directly over
  HTTP JSON-RPC (`initialize`, then `tools/list` / `tools/call`) in the meantime.

**Stitch's shape.** Its tools operate on Stitch's own projects only — it cannot
write to this repo. `list_screens` returns each screen's `htmlCode.downloadUrl`
and `screenshot.downloadUrl`; the HTML is a full Tailwind-CDN page with the theme
in an inline `tailwind.config`, which is where the colour tokens were read from.

**Vite worktree gotcha.** A fresh git worktree has no `node_modules`, so
`npm run build` fails with `sh: vite: command not found` until `npm install` is
run inside `client/`.

**Browser-pane gotcha.** Screenshots come back as a blank page while the pane is
hidden (`document.visibilityState === "hidden"`). Fronting the tab is not always
enough — screenshots taken immediately after a `navigate` work reliably, while
scroll-then-screenshot does not. To capture a long page, set a tall viewport with
`resize_window` and screenshot once after navigating.

**Not recorded here:** the Stitch API key. It lives in `~/.claude.json` outside
this repo and must never be committed or pasted into project files.
