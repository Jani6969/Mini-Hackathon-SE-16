# MASTER TODO — Negombo Fish Price Board

> **This is the complete work list. Nothing is omitted.** Work top to bottom.
> Tick each box only after you have *verified* it — run the command, read the
> output, then tick. Never tick ahead.
>
> **Reference code for every task is in `HACKATHON_BUILD_PLAN_FINAL.md`.**
> Copy it verbatim unless the task says otherwise.
>
> Owner codes: **A** = Integration/API/Deploy · **B** = Form/Validation ·
> **C** = List/Search/Filter/404 · **D** = Home/Nav/CSS/Sample data ·
> **ALL** = whole team. See `docs/TEAM.md`.

---

## Current

**MVP built and deployed** (commits `750d3ef`, `dad52ba`). The phase checkboxes
below were never ticked during that build and are stale — treat git history, not
the boxes, as the record of what exists.

**This session (branch `claude/stitch-mcp-setup-ff4fb1`):** the client UI was
rebuilt to the dark "dockside terminal" theme designed in Google Stitch. Backend,
API, schema and data model are untouched.

**Next action:** decide whether the UI rebuild merges to `main` before
submission, and replace the three placeholder fish photos.

---

## Progress summary

| Phase | Title | Window | Owner | Status |
|---|---|---|---|---|
| 0 | Pre-flight & team setup | before 09:20 | ALL | ☐ not started |
| 1 | Repo, Atlas, scaffolding | 09:20–09:45 | A | ☐ not started |
| 2 | Server / API | 09:45–10:15 | A | ☐ not started |
| 3 | Client (parallel) | 09:45–11:15 | A B C D | ☐ not started |
| 4 | Integration & local testing | 11:15–11:55 | ALL | ☐ not started |
| 5 | **BUILD STOP 11:55** | — | ALL | ☐ not reached |
| 6 | Hosting & deployment | 11:55–12:25 | A | ☐ not started |
| 7 | Documentation & evidence | 12:00–12:45 | A + ALL | ☐ not started |
| 8 | Video, PDF, submission | 12:25–12:55 | ALL | ☐ not started |
| 9 | Viva readiness | 12:45–12:55 | ALL | ☐ not started |

---

# PHASE 0 — Pre-flight & team setup (before 09:20, ALL)

- [x] **T0.1** ~~Confirm the four members, their full names and IT numbers.~~
      **Done** — recorded in `docs/TEAM.md`, `README.md`, `agent/BRIEF.md` and
      `docs/SUBMISSION.md`:
      A = W.M.S.S.B. Wasala (IT24100559) · B = Karunathilaka K.D.J.C
      (IT24100551, **Group Leader**) · C = Fernando K.R.N (IT24101875) ·
      D = Samaranayaka S.G.V.S (IT23544154).
      **Still needed:** the four GitHub usernames, for collaborator invites (T1.21).
- [ ] **T0.2** Assign owners: A = integration/API/deploy, B = form/validation,
      C = list/search/filter/404, D = home/nav/CSS/sample data. Confirm each
      member has read their section of `docs/TEAM.md`.
- [ ] **T0.3** Every member verifies their local toolchain:
      `node --version` (v18+), `npm --version`, `git --version`, `gh --version`.
- [ ] **T0.4** Every member sets their git identity **on this machine** so their
      commits are attributable:
      `git config user.name "Full Name"` and `git config user.email "<sliit email>"`.
      Verify with `git config user.name && git config user.email`.
- [ ] **T0.5** Every member confirms a GitHub account and is signed in to `gh`
      (`gh auth status`).
- [ ] **T0.6** Member A creates accounts / signs in: MongoDB Atlas, Railway,
      Vercel. Confirm all three dashboards open before 09:20.
- [ ] **T0.7** Confirm the OneDrive account for the demo video and that link
      sharing can be set to "anyone with the link".
- [ ] **T0.8** Confirm the CourseWeb submission page opens and the Group ID is known.
- [ ] **T0.9** Write the wall card on paper (see `docs/SUBMISSION.md` → Wall card):
      scope locked 09:20 · build stop 11:55 · Railway 11:55 · Vercel 12:10 ·
      video 12:45 · CourseWeb 12:55.
- [ ] **T0.10** Read `docs/requirements.md` (10 minimum requirements) and
      `docs/RUBRIC.md` (how marks are awarded) as a team. 5 minutes, out loud.
- [ ] **T0.11** Agree the scope lock out loud: no auth, no admin, no maps, no
      charts, no chatbot, no extra CRUD. Reference `agent/BRIEF.md` → Excluded.

---

# PHASE 1 — Repo, Atlas, scaffolding (09:20–09:45, Member A)

## 1a. Git repository

- [ ] **T1.1** In this project folder: `git init`
- [ ] **T1.2** Confirm `.gitignore` exists at the root and contains
      `node_modules/`, `dist/`, `.env`, `.DS_Store`. (Already present — verify.)
- [ ] **T1.3** `AI-PROMPT-LOG.md` **already exists** with the rules, the table and
      a worked example. **Start logging immediately** — mandatory (spec §2.2) and
      must not be backfilled at submission time.

## 1b. MongoDB Atlas

- [ ] **T1.4** Go to `atlas.mongodb.com` → create a **free M0** cluster.
- [ ] **T1.5** Database Access → Add New Database User → username `hackathon`,
      generate a password. **Store the password in a password manager or offline
      note. Never in the repo, never in Markdown, never in chat.**
- [ ] **T1.6** ⚠ Network Access → Add IP Address → **Allow access from anywhere
      (`0.0.0.0/0`)**. Skipping this is the single most common reason Atlas fails
      from Railway.
- [ ] **T1.7** Connect → Drivers → copy the connection string. Replace
      `<password>` with the real password and add the database name `fishprice`.
- [ ] **T1.8** Verify the cluster shows **Active** in the Atlas dashboard.

## 1c. Server scaffold

- [ ] **T1.9** `mkdir server && cd server && npm init -y`
- [ ] **T1.10** `npm i express mongoose cors dotenv`
- [ ] **T1.11** `npm i -D nodemon`
- [ ] **T1.12** Edit `server/package.json` — add `"type": "module"` and scripts:
      `"start": "node server.js"`, `"dev": "nodemon server.js"`, `"seed": "node seed.js"`.
- [ ] **T1.13** `server/.env` and `server/.env.example` **already exist** with
      placeholders — just paste the Atlas string into `MONGO_URI` in
      `server/.env`. `PORT=5000` is already set. **Confirm it is ignored by git**
      — run `git check-ignore -v server/.env` and expect a match.

## 1d. Client scaffold

- [ ] **T1.14** From the project root: `npm create vite@latest client -- --template react`
- [ ] **T1.15** `cd client && npm i` then `npm i react-router-dom`
- [ ] **T1.16** `client/.env` and `client/.env.example` **already exist** with
      `VITE_API_URL=http://localhost:5000` (no trailing slash). Nothing to change
      for local development. ⚠ Vite creates `client/` via `npm create vite` — do
      **not** let it overwrite the existing `.env` files.
- [ ] **T1.17** Confirm `client/.env` is gitignored (`git check-ignore -v client/.env`).
- [ ] **T1.18** Delete Vite boilerplate that will not be used: `client/src/App.css`,
      `client/src/assets/react.svg`. Leave `index.css` — D will replace it.

## 1e. First push and collaborators

- [ ] **T1.19** `git add . && git commit -m "chore: scaffold client and server"`
- [ ] **T1.20** `gh repo create negombo-fish-price-board --public --source=. --push`
- [ ] **T1.21** Add B, C and D as **collaborators** on the GitHub repo.
- [ ] **T1.22** B, C and D each **clone the repo now** and run
      `npm i` in `client/`. Confirm all three have it before Phase 3 starts.
- [ ] **T1.23** B, C and D each create their local `client/.env` — it is
      gitignored, so a fresh clone will not have it:
      `cp client/.env.example client/.env`
- [ ] **T1.24** Record the repo URL in `README.md` and `docs/SUBMISSION.md`.

---

# PHASE 2 — Server / API (09:45–10:15, Member A)

- [ ] **T2.1** Create `server/models/Price.js` — Mongoose schema with
      `fish`, `market`, `price`, `seller`, `date`, `{ timestamps: true }`, and
      **all validation messages** (required, min 1, max 10000, minlength 3).
      Code: `HACKATHON_BUILD_PLAN_FINAL.md` §Phase 2.
- [ ] **T2.2** Create `server/routes/priceRoutes.js` with **exactly two endpoints**:
      `GET /` and `POST /`. Response envelope `{ success, message, data }`.
      `POST` maps Mongoose `ValidationError` to HTTP 400 with joined messages.
      **Do not add `GET /:id`, `PUT` or `DELETE`** — they are not used by the UI.
- [ ] **T2.3** Create `server/server.js`:
      - `dotenv.config()` first
      - ⚠ `app.use(cors())` **before** the routes — CORS after routes is a known failure
      - `app.use(express.json())`
      - `GET /` → `{ success: true, message: 'Fish Price API running' }`
      - `GET /health` → `{ status, database }` reading `mongoose.connection.readyState`
      - `app.use('/api/prices', priceRoutes)`
      - a final 404 handler returning `{ success: false, message: 'Endpoint not found' }`
      - `mongoose.connect(process.env.MONGO_URI)` then `app.listen(PORT)`
- [ ] **T2.4** Create `server/seed.js` with the **8 sample records** (Balaya,
      Kelawalla, Hurulla, Thalapath, Isso, Balaya@Pitipana, Paraw, Koduwa).
- [ ] **T2.5** Run `npm run seed` in `server/`. **Expected output:** `Seeded 8 records`.
      ⚠ `seed.js` calls `deleteMany({})` — it wipes the collection. Never run it
      after Phase 6 verification.
- [ ] **T2.6** Run `npm run dev`. **Expected output:** `MongoDB connected` then
      `API on 5000`.
- [ ] **T2.7** Open `http://localhost:5000/` in a browser — expect the running message.
- [ ] **T2.8** Open `http://localhost:5000/health` — expect
      `{"status":"ok","database":"connected"}`.
- [ ] **T2.9** Open `http://localhost:5000/api/prices` — **expect a JSON array of 8
      records. Do not proceed to Phase 3 until you see this.**
- [ ] **T2.10** Test a bad POST from the terminal and confirm HTTP 400 with a
      friendly message (proves server-side validation works — this is a viva point):
      ```bash
      curl -i -X POST http://localhost:5000/api/prices -H "Content-Type: application/json" -d '{"fish":"","market":"","price":99999,"seller":"ab"}'
      ```
- [ ] **T2.11** Test a good POST and confirm HTTP 201:
      ```bash
      curl -i -X POST http://localhost:5000/api/prices -H "Content-Type: application/json" -d '{"fish":"Balaya (Skipjack)","market":"Pitipana","price":900,"seller":"Test User"}'
      ```
- [ ] **T2.12** Open Atlas → Browse Collections → `fishprice` → `prices` and see the
      9 documents. Confirms the whole write path.
- [ ] **T2.13** Commit (A): `git commit -m "feat(api): add price read/create endpoints with validation"`
- [ ] **T2.14** Push. Confirm B, C and D can `git pull`.

---

# PHASE 3 — Client (09:45–11:15, all four in parallel)

> B, C and D can start immediately — they do not need a working API. A's
> `sampleData.js` fallback and props keep them unblocked.

## 3a. Member A — API layer and app shell

- [ ] **T3.1** Create `client/src/api/priceApi.js` — `getPrices()` and
      `createPrice(entry)`, both reading `import.meta.env.VITE_API_URL`, both
      throwing `new Error(json.message)` when `success` is false. **All fetch calls
      live in this one file.**
- [ ] **T3.2** Create `client/src/App.jsx`:
      - `useState` for `prices`, `loading`, `offline`
      - `useEffect` fetching once on mount
      - on failure: fall back to `sampleData` **and set `offline = true`**
      - `addPrice(entry)`: when offline, append locally with a `demo-` id; when
        online, `await createPrice(entry)` then prepend the saved record
      - `<BrowserRouter>` with routes `/`, `/prices`, `/add`, `*`
      - the **visible offline banner** stating that entries in this mode are not
        persisted to MongoDB
- [ ] **T3.3** Delete the Vite starter contents of `App.jsx` fully — no leftover
      counter, logo or boilerplate.
- [ ] **T3.4** Verify `npm run dev` in `client/` starts with no console errors.
- [ ] **T3.5** Commit (A): `feat(integration): connect React client to API with labelled offline fallback`

## 3b. Member D — Home, Navbar, CSS, sample data

- [ ] **T3.6** Create `client/src/data/sampleData.js` — the same 8 records with
      `_id` values `s1`–`s8`. These are **illustrative**, not real quotations.
- [ ] **T3.7** Create `client/src/components/Navbar.jsx` — brand + `<Link>` to
      `/`, `/prices`, `/add`. (Requirement 8.)
- [ ] **T3.8** Create `client/src/pages/Home.jsx` with four sections:
      **The Problem**, **Our Solution**, **Who It Helps**, and a visible
      **Prototype notice** stating that sample prices are illustrative and not
      official market quotations. (Requirements 1, 2, 9, 10.)
- [ ] **T3.9** Name Negombo Main, Duwa Landing and Pitipana explicitly on the Home
      page, and name the affected users — this is the 10-mark "relevance of Sri
      Lankan problem" criterion.
- [ ] **T3.10** Replace `client/src/index.css` entirely with the project stylesheet:
      reset, `.page`, `.nav`, `.card`, `.grid`, `.filters`, form controls, `button`,
      `.error`, `.price`, `.muted`, `.summary`, `.notice`, `.offline-banner`.
- [ ] **T3.11** Card grid must use `repeat(auto-fit, minmax(240px, 1fr))` — this is
      the responsive answer in the viva.
- [ ] **T3.12** Add the `@media (max-width: 600px)` breakpoint stacking the nav.
      (Requirement 7.)
- [ ] **T3.13** Inputs must be `font-size: 16px` — smaller values make iOS Safari
      zoom on focus.
- [ ] **T3.14** Commits (D): `feat(home): add local problem solution and user context` ·
      `feat(nav): add application navigation` · `style: add responsive desktop and mobile layout`

## 3c. Member B — Report Price form + validation

- [ ] **T3.15** Create `client/src/pages/AddPrice.jsx` with a **semantic `<form>`**
      and `onSubmit={handleSubmit}` calling `event.preventDefault()`.
- [ ] **T3.16** Four controlled fields: `fish` (select), `market` (select),
      `price` (input, `inputMode="decimal"`), `seller` (input). Every field has a
      `<label htmlFor>` matching the input `id`. (Requirement 4.)
- [ ] **T3.17** `validate()` producing friendly per-field messages:
      - empty fish → "Please select a fish type."
      - empty market → "Please select a landing site."
      - empty price → "Please enter today's price per kilo."
      - non-numeric or ≤ 0 → "Price must be a number greater than 0."
      - > 10000 → "That looks too high — please check the price per kilo."
      - empty name → "Please enter your name."
      - name shorter than 3 → "Name must be at least 3 characters."
      (Requirement 5.)
- [ ] **T3.18** `handleChange` clears that field's error as the user types and
      clears any API error.
- [ ] **T3.19** `saving` state disables the button and shows "Saving..." while the
      request is in flight.
- [ ] **T3.20** `apiError` state renders the server's message when the API rejects
      the submission.
- [ ] **T3.21** On success: `navigate('/prices')`.
- [ ] **T3.22** Local test — submit empty → **four** messages appear at once.
- [ ] **T3.23** Local test — type `abc` in price → number error.
- [ ] **T3.24** Local test — type `50000` → range error.
- [ ] **T3.25** Local test — type `ab` in name → length error.
- [ ] **T3.26** Local test — errors clear as you type in that field.
- [ ] **T3.27** Local test — a valid submit navigates to `/prices` and the new
      record is at the **top** of the list.
- [ ] **T3.28** Commits (B): `feat(form): add price reporting form` ·
      `feat(validation): add friendly client-side validation`

## 3d. Member C — Price list, search, filter, average, 404

- [ ] **T3.29** Create `client/src/pages/PriceList.jsx` receiving `prices` and
      `loading` as props (no fetching in this component).
- [ ] **T3.30** `loading` renders "Loading prices..." before the list.
- [ ] **T3.31** Text search state filtering on `p.fish` case-insensitively.
      (Requirement 6.)
- [ ] **T3.32** Landing-site dropdown built from `['All', ...new Set(prices.map(p => p.market))]`.
- [ ] **T3.33** Both filters combine in a single `.filter()` — derived state, no
      duplicated array in state.
- [ ] **T3.34** Live average of the **filtered** set, rounded, with a divide-by-zero
      guard when the filtered list is empty.
- [ ] **T3.35** Summary line showing the count (singular/plural correct) and the
      average.
- [ ] **T3.36** Empty state: "No prices found for that search." when nothing matches.
- [ ] **T3.37** Cards mapped with `key={p._id}` — **not** the array index. The list
      prepends new records, so an index key would break reconciliation. This is a
      viva question.
- [ ] **T3.38** Each card shows fish, `Rs. <price> /kg`, market, date, and
      "Reported by <seller>".
- [ ] **T3.39** Create `client/src/pages/NotFound.jsx` — a 404 heading and a
      `<Link to="/">` home. (Requirement 8.)
- [ ] **T3.40** Local test — typing narrows the list live.
- [ ] **T3.41** Local test — changing the site dropdown filters correctly.
- [ ] **T3.42** Local test — search + filter together give the correct intersection.
- [ ] **T3.43** Local test — the average recalculates on every change.
- [ ] **T3.44** Local test — `/random-url` renders the 404 page.
- [ ] **T3.45** Commits (C): `feat(prices): add price list search and market filter` ·
      `feat(prices): calculate average for filtered results` ·
      `feat(routing): add not-found page`

---

# PHASE 4 — Integration & local testing (11:15–11:55, ALL)

- [ ] **T4.1** Merge every branch into `main`. Resolve conflicts. No leftover
      conflict markers anywhere (`grep -rn "<<<<<<<" client server`).
- [ ] **T4.2** Fresh install check: `cd client && npm i` and `cd server && npm i`.
- [ ] **T4.3** Start both: `server` on 5000, `client` on 5173. Both start with no
      errors.
- [ ] **T4.4** Browser console is **clean** — no React key warnings, no failed
      fetches, no uncaught errors.
- [ ] **T4.5** Run the full manual test matrix in `docs/TESTING.md`. Every row passes.
- [ ] **T4.6** Requirement sweep — walk `docs/requirements.md` and tick all 10 live.
- [ ] **T4.7** Production build check: `cd client && npm run build`. **Must succeed.**
      A build failure here becomes a Vercel failure later.
- [ ] **T4.8** `npm run preview` and click through all four routes on the built
      bundle.
- [ ] **T4.9** Responsive check — DevTools at 320px, 375px, 768px, 1280px. **No
      horizontal scroll at any width.**
- [ ] **T4.10** Offline-fallback check — stop the server, reload the client, and
      confirm the demo banner appears and the UI still works.
- [ ] **T4.11** Restart the server and confirm the banner disappears and live data
      returns.
- [ ] **T4.12** Contribution check — `git log --oneline --pretty=format:"%an %s"`
      shows meaningful commits from **all four** members. Fix now if anyone is
      missing (see `docs/TEAM.md`).
- [ ] **T4.13** Confirm no `.env` file and no `node_modules/` is tracked:
      `git ls-files | grep -E "\.env$|node_modules"` returns nothing.
- [ ] **T4.14** Push `main`.

---

# PHASE 5 — ⛔ BUILD STOP 11:55

- [ ] **T5.1** **No new features after this point.** Announce it out loud.
- [ ] **T5.2** From here on: deploy, verify, document, rehearse, submit. Bug fixes
      only if a minimum requirement is broken.

---

# PHASE 6 — Hosting & deployment (11:55–12:25, Member A)

> Full walkthrough with screenshots-worth of detail: `docs/DEPLOYMENT.md`.
> **Deploy the backend first.** The frontend build needs the API URL.

## 6a. Railway — backend

- [ ] **T6.1** `railway.app` → New Project → **Deploy from GitHub repo** → select
      `negombo-fish-price-board`.
- [ ] **T6.2** Service → Settings → **Root Directory: `server`**. ⚠ Wrong root
      directory is the most common Railway failure.
- [ ] **T6.3** Confirm the start command resolves to `npm start` (from
      `server/package.json`).
- [ ] **T6.4** Variables → add **`MONGO_URI`** = the Atlas connection string.
      Do not add it to any file in the repo.
- [ ] **T6.5** Do **not** hardcode `PORT` — Railway injects it and `server.js`
      already reads `process.env.PORT`.
- [ ] **T6.6** Deploy. Watch the build log until it reports the server listening.
- [ ] **T6.7** Settings → Networking → **Generate Domain**. Record the URL.
- [ ] **T6.8** ✅ Open `https://<railway-domain>/health` — must show
      `"status":"ok"` **and** `"database":"connected"`. If `disconnected`, go to
      `docs/TROUBLESHOOTING.md` → Atlas.
- [ ] **T6.9** ✅ Open `https://<railway-domain>/api/prices` — **must return JSON**
      in the browser.
- [ ] **T6.10** ✅ Open `https://<railway-domain>/nonsense` — must return the JSON
      404 handler, not an HTML error page.
- [ ] **T6.11** Record the Railway URL in `README.md`, `docs/SUBMISSION.md` and
      `agent/MEMORY.md`.

## 6b. Vercel — frontend

- [ ] **T6.12** `vercel.com` → Add New → Project → **Import the same repo**.
- [ ] **T6.13** **Root Directory: `client`** · Framework preset: **Vite**.
- [ ] **T6.14** Build command `npm run build`, output directory `dist` (Vercel's
      Vite defaults — confirm, do not fight them).
- [ ] **T6.15** Environment Variables → **`VITE_API_URL`** = the Railway domain,
      **with no trailing slash**.
- [ ] **T6.16** Deploy.
- [ ] **T6.17** ⚠ **If `VITE_API_URL` was added after the first deploy, redeploy
      now.** Vite bakes environment variables in at build time; the running bundle
      will otherwise have an empty API URL.
- [ ] **T6.18** Add SPA rewrites so a hard refresh on `/prices` does not 404 on
      Vercel — create `client/vercel.json`:
      ```json
      { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
      ```
      Commit, push, and let Vercel redeploy.
- [ ] **T6.19** Record the Vercel URL in `README.md`, `docs/SUBMISSION.md` and
      `agent/MEMORY.md`.

## 6c. Deployment verification — all must pass

- [ ] **T6.20** ✅ Vercel link opens in a normal window and shows **live** data
      (the offline banner must **not** be visible).
- [ ] **T6.21** ✅ Vercel link opens in an **incognito window** (proves it is
      public, not cached to your session).
- [ ] **T6.22** ✅ Vercel link opens on a **phone using mobile data**, not campus
      wifi.
- [ ] **T6.23** ✅ Hard-refresh directly on `/prices` and `/add` — both load
      (proves T6.18 worked).
- [ ] **T6.24** ✅ `/some-random-url` on the deployed site shows the app's 404 page.
- [ ] **T6.25** ✅ Submit a **unique test record** from the deployed site
      (Balaya (Skipjack) · Duwa Landing · 975 · Demo Team).
- [ ] **T6.26** ✅ The record appears at the top of the Prices list.
- [ ] **T6.27** ✅ Refresh the deployed page — the record **survives** (proves
      persistence, not local state).
- [ ] **T6.28** ✅ MongoDB Atlas → Browse Collections → `prices` → the **same
      record is there**. Screenshot it for the PDF.
- [ ] **T6.29** ✅ Deployed form validation still works — empty submit shows four
      errors, `abc` shows the number error.
- [ ] **T6.30** ✅ Browser console on the deployed site is clean — **no CORS error**.
      If CORS fails, see `docs/TROUBLESHOOTING.md`.
- [ ] **T6.31** ✅ Search + filter + average all work on the deployed site.
- [ ] **T6.32** ⛔ **Do not run `npm run seed` again.** It would delete the record
      you just proved.
- [ ] **T6.33** Commit (A): `docs: record deployment URLs and verification evidence`

---

# PHASE 7 — Documentation & evidence (12:00–12:45)

## 7a. README — all 10 required items

- [ ] **T7.1** Title, group ID, and the three links: live app, API, demo video.
- [ ] **T7.2** **The Problem** section (from `agent/BRIEF.md`, evidence-conscious).
- [ ] **T7.3** **Our Solution** section + the prototype notice.
- [ ] **T7.4** **Main Features** — five bullets.
- [ ] **T7.5** **Technologies Used** — the full stack list.
- [ ] **T7.6** **AI Tools Used** — declare **only tools actually used**, and for
      each one state how the output was reviewed, tested and modified.
- [ ] **T7.7** **Architecture** diagram block.
- [ ] **T7.8** **Deployment Verification** — health URL, data URL, incognito test,
      mobile test, Atlas persistence proof.
- [ ] **T7.9** **Team & Contributions** table — name, IT number, contribution, for
      all four members.
- [ ] **T7.10** **Installation & Execution** — backend and frontend commands,
      including the `.env` variables needed.
- [ ] **T7.11** Read the README top to bottom as if you were the marker. Every
      link is clickable and correct.

## 7b. AI prompt log

- [ ] **T7.12** `AI-PROMPT-LOG.md` contains **exact significant prompts**, not
      summaries.
- [ ] **T7.13** Every row states the tool, purpose, and **how the output was
      checked or modified**.
- [ ] **T7.14** All passwords, API keys, connection strings and personal data are
      **redacted** from the log.
- [ ] **T7.15** The same log is included in the submission PDF **and** in the repo.
- [ ] **T7.16** Contribution statements are written in the team's own words.

## 7c. Repository hygiene

- [ ] **T7.17** `git log --oneline --all` shows meaningful, conventional commits.
      No `update`, `fix2`, `final-final`, and no single giant dump commit.
- [ ] **T7.18** GitHub → Insights → Contributors shows **all four members**.
- [ ] **T7.19** No secrets anywhere: `git log -p | grep -i "mongodb+srv"` returns
      nothing. If it does, rotate the Atlas password immediately and tell the team.
- [ ] **T7.20** The repo is **public** (the marker must be able to open it).
- [ ] **T7.21** `agent/TODO.md`, `agent/MEMORY.md` and `agent/DECISIONS.md` updated
      with the final state and the deployed URLs.
- [ ] **T7.22** `docs/changelog.md` updated.
- [ ] **T7.23** Final push. `git status` is clean.

---

# PHASE 8 — Video, PDF, submission (12:25–12:55)

## 8a. Two-minute video

- [ ] **T8.1** Rehearse once against the script in `docs/VIVA.md` → Video script.
- [ ] **T8.2** Record. Target **1:50–1:58**. Over or noticeably under two minutes
      drops the demonstration band.
- [ ] **T8.3** Content order: group ID + names → problem → solution + home page →
      **live validation** → **live valid submit** → **search + filter + average**
      → deployed URL in the address bar + mobile view → impact sentence.
- [ ] **T8.4** Do **not** claim sample prices are verified market facts.
- [ ] **T8.5** Watch it back once. Audio audible, screen legible, under 2:00.
- [ ] **T8.6** Upload to OneDrive.
- [ ] **T8.7** ⚠ Set link sharing to **anyone with the link** and test the link in
      an incognito window. A login-walled video counts as no video.
- [ ] **T8.8** Put the video link in `README.md` and the PDF.

## 8b. Submission PDF

- [ ] **T8.9** Build the PDF from the skeleton in `docs/SUBMISSION.md`:
      1. Git repository link
      2. Deployed application link
      3. Demonstration video link
      4. Team members — name + IT number ×4, with a contribution line each
      5. Problem & solution (4–6 sentences)
      6. Technologies & AI tools
      7. AI prompt log (tool | exact prompt | purpose | how output was checked)
- [ ] **T8.10** Add the Atlas persistence screenshot as deployment evidence.
- [ ] **T8.11** Open every link in the PDF from a fresh incognito window.
- [ ] **T8.12** Rename the file to the **Group ID**.

## 8c. Upload

- [ ] **T8.13** Run the **Final 10-Minute Pre-Submission Checklist** in
      `docs/SUBMISSION.md`. Every box.
- [ ] **T8.14** Upload the PDF to CourseWeb by **12:55**, not 12:59.
- [ ] **T8.15** Confirm the upload appears in CourseWeb and re-download it once to
      verify it is not corrupt.
- [ ] **T8.16** ⛔ **Stop touching the code.**

---

# PHASE 9 — Viva readiness (12:45–12:55, ALL)

- [ ] **T9.1** Every member memorises the shared stack answer in `docs/VIVA.md`.
- [ ] **T9.2** Every member memorises **their own** row in the viva answer table.
- [ ] **T9.3** Every member opens **their own file** and practises a **live edit**
      once — change an error message, a colour, or add a fish to the dropdown.
      The evaluator can ask for this (spec §2.4).
- [ ] **T9.4** Undo the practice edit. `git status` clean.
- [ ] **T9.5** Prepare the demonstration tabs in this order:
      1. Deployed Vercel app
      2. `<railway>/health`
      3. MongoDB Atlas → Browse Collections → `prices`
      4. GitHub repo (commits + README)
- [ ] **T9.6** Rehearse the live evaluation flow in `docs/VIVA.md` §Live flow —
      problem → architecture → validation → core flow → search/filter/average →
      database proof → responsive/deployment → impact. Under two minutes.
- [ ] **T9.7** Prepare the honest answer for "what would you do next": price
      history over time, per-site trends, and moderation of reported prices.

---

## Blocked

None.

## Next

- [ ] Replace the three placeholder fish photos — `client/public/fish/kelawalla.jpg`,
      `hurulla.jpg`, `koduwa.jpg` (and `default.jpg`). Overwrite the file at the
      same path; `client/src/data/fishImages.js` needs no change.
- [ ] `client/package-lock.json` is now tracked. Confirm the other members run
      `npm install` in `client/` before their next local run.
- [ ] Member D (Samaranayaka S.G.V.S) owns `client/src/index.css` and `design.md`
      per `design.md`'s own ownership line. Both were rewritten this session by
      another hand — get their sign-off.
- [ ] Re-verify the deployed Vercel build in incognito and on a phone over mobile
      data once the UI rebuild is merged.

## Done

- **2026-09-04** — Client UI rebuilt to the dark dockside-terminal theme
  (Home, Prices, Report, 404). Verified: production build passes, no console
  errors, validation renders, no horizontal scroll at 320px, focus rings intact.

## Last session

**2026-09-04** — Added the Google Stitch MCP server to Claude Code (user scope),
then rebuilt the client UI from the Stitch designs in project
`Website Homepage Design`.

Rewrote `client/src/index.css` (30 → ~480 lines) as a token-based dark design
system, and rebuilt `Home`, `PriceList`, `AddPrice`, `NotFound` and `Navbar` to
match the mockups. Added `PriceCard`, `Footer` and `fishImages.js`, plus image
assets under `client/public/`. Updated `design.md` to match what was built.

Stitch's own export is Tailwind-via-CDN; it was **not** adopted — everything was
rewritten as plain CSS so the stack table in `CLAUDE.md` still holds. No backend,
schema, API or dependency changes. Decorative panels in the mockups that had no
real data behind them (live ticker, market-spread chart, boat names, grade chips)
were deliberately dropped rather than filled with invented market figures.

## Update rule

Update this file at task start, at each meaningful milestone, and at session end.
Not for every tiny edit. When a phase completes, update the progress summary table
at the top.
