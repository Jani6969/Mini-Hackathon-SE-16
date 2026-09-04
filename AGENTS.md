# AGENTS.md — Negombo Fish Price Board

Instructions for any AI coding agent working in this repository (Claude Code,
Codex, Copilot, Gemini CLI, Cursor). Claude Code should read `CLAUDE.md` as well —
this file is the portable subset.

---

## What this repo is

A four-hour hackathon prototype for SLIIT SE3090, Group SE_016. A public board
where Negombo fishermen and buyers report today's fish price and compare recent
reports across three landing sites.

**Stack:** React 18 + Vite (Vercel) → Node/Express (Railway) → MongoDB Atlas.

**Current state:** documentation complete, **no application code written yet**.

---

## Read these before doing anything

1. `START_HERE.md` — orientation
2. `agent/BRIEF.md` — scope, users, data model, what is explicitly excluded
3. `agent/TODO.md` — **the master task list. Execute it in order from T0.1.**
4. `agent/DECISIONS.md` — why each technology was chosen
5. `docs/requirements.md` — the 10 minimum requirements
6. `HACKATHON_BUILD_PLAN_FINAL.md` — **all reference code lives here**

---

## Rules

### Scope

- Build only what is in `docs/requirements.md`. The excluded list in
  `agent/BRIEF.md` is binding: no auth, no admin panel, no maps, no charts, no
  chatbot, no extra CRUD endpoints, no Docker.
- Reference code for every file already exists in
  `HACKATHON_BUILD_PLAN_FINAL.md`. **Copy it. Do not reinvent it.**
- If something seems missing, check that file before writing anything new.

### Secrets

- `MONGO_URI` is the only secret. It lives in `server/.env` (gitignored) and in
  the Railway dashboard. **Never** in Markdown, in a commit, in a log line, or in
  chat output.
- Never commit `.env`, `node_modules/`, or `dist/`.
- Before finishing: `git log -p | grep -i "mongodb+srv"` must return nothing.

### Code

- Server is ESM — `server/package.json` needs `"type": "module"`.
- `app.use(cors())` must be registered **before** the routes.
- `PORT` must be read as `process.env.PORT || 5000`, never hardcoded.
- React list keys must be `key={p._id}`, never the array index.
- Form submit handlers must call `event.preventDefault()`.
- Inputs are 16px so iOS does not zoom on focus.
- Validation rules exist in **two** places (`AddPrice.jsx` and
  `server/models/Price.js`) and must match the table in `docs/requirements.md`.

### File ownership

Four members own distinct files. Do not edit outside the ownership boundary
without saying which member's work you are touching. See `docs/TEAM.md`.

| Member | Owns |
|---|---|
| A — W.M.S.S.B. Wasala | `server/**`, `client/src/App.jsx`, `client/src/api/priceApi.js`, `README.md` |
| B — Karunathilaka K.D.J.C | `client/src/pages/AddPrice.jsx` |
| C — Fernando K.R.N | `client/src/pages/PriceList.jsx`, `client/src/pages/NotFound.jsx` |
| D — Samaranayaka S.G.V.S | `client/src/pages/Home.jsx`, `components/Navbar.jsx`, `index.css`, `data/sampleData.js` |

### Commits

- Conventional commits, one per finished feature.
- Never `update`, `fix2`, `final-final`, or one giant dump commit.
- All four members must have commits under their own git identity — this is a
  marked criterion.

### Verification

- Run the command, read the output, **then** claim it works. Never tick a
  `agent/TODO.md` box from memory.
- The manual test matrix is `docs/TESTING.md`. Run it locally at Phase 4 and
  against the deployed site at Phase 6.

### Honesty

- Sample prices are **illustrative**. Never describe them as official or verified
  market data, in code comments, UI copy, the README, or a commit message.
- The offline fallback must stay visibly labelled. A silent fallback would
  misrepresent demo data as live database data.
- Log AI prompts in `AI-PROMPT-LOG.md` as you go. This is mandatory.

---

## Ask before

- Any deployment (Railway, Vercel) or Atlas configuration change
- Running `npm run seed` — it calls `deleteMany({})` and destroys all records
- Any `git push --force`, history rewrite, or branch deletion
- Adding a dependency not already listed in `agent/MEMORY.md`
- Anything outside the scope in `agent/BRIEF.md`

## Never

- Commit a secret
- Run `seed.js` after the deployment has been verified
- Add a feature from the excluded list
- Claim a step passed without running it
