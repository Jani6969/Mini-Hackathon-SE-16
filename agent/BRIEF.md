# Project Brief — Negombo Fish Price Board

## Project type

Full-stack web application (MERN-lite: React + Express + MongoDB), built as a
4-hour hackathon prototype for SLIIT SE3090. Public, no authentication.

## Goal

Ship a small, working, publicly reachable price board where fishermen and buyers
at Negombo landing sites can report today's fish price and compare recent
reported prices across sites before agreeing a sale.

## Target users

- **Primary:** small-scale fishermen at Negombo Main, Duwa Landing and Pitipana
  who need a price reference before agreeing a sale.
- **Secondary:** small buyers and retail sellers who want to see recent reported
  prices across sites.
- **Admin/operator:** none. This prototype has no admin role by design.

## Main problem

Small-scale fishermen and buyers around Negombo need to make quick selling and
buying decisions, but price information from nearby landing sites is not always
available in one simple shared place at the moment they need it. A fisherman at
Negombo Main may want to compare the reported price for the same fish at Duwa
Landing or Pitipana before agreeing to a sale, while small buyers also benefit
from seeing recent reported prices across sites.

This project addresses that **price-information gap** by giving users one public
place to report and compare recent fish prices across selected Negombo landing
sites. It is deliberately scoped as a four-hour prototype, not an official
market-pricing system.

> **Evidence rule:** if the team has personally observed, researched, or can cite
> stronger facts about the local problem, add them here. Do **not** present
> invented price gaps, storage claims, or sample values as verified current facts.

## Solution

A shared public price board. Any fisherman or buyer records today's price for a
fish type at their landing site. Anyone can search and filter to see what that
fish is selling for elsewhere in Negombo, plus the live average of the filtered
set, before agreeing a price.

## Main workflow

```text
Report a price  →  stored in MongoDB Atlas  →  appears at top of Prices list
                                                      │
Browse / search by fish  +  filter by landing site  ───┤
                                                      ▼
                                        live average of filtered set
```

## MVP

### Included

1. Landing page explaining the problem, solution and who it helps — **inside the app**
2. Report Price form with four fields and per-field validation
3. Prices list with live text search by fish name
4. Dropdown filter by landing site
5. Live average price of the current filtered set
6. Empty state when nothing matches
7. 404 page for unknown routes
8. Responsive desktop + mobile layout
9. 8 illustrative sample records with real Sinhala fish names
10. Public deployment: Vercel (SPA) + Railway (API) + MongoDB Atlas (DB)

### Excluded (do not build)

- Authentication / login / user accounts
- Admin panel or moderation
- Maps or geolocation
- Notifications / email / SMS
- AI agent, chatbot, or any LLM in the product
- Extra CRUD screens, `GET /:id`, `PUT`, `DELETE`
- Charts or complex data visualisation
- Multiple databases, caching layers, Docker
- Image upload
- Price history / trend over time
- UI redesign once the interface is clean and responsive

## Core features

1. **Report a price** — validated form writing to the API
2. **Browse, search and filter** — live text search + landing-site dropdown
3. **Calculate** — live average price of the currently filtered set

## Pages / screens / flows

| Page or flow | Route | Purpose | Owner |
|---|---|---|---|
| Home | `/` | Problem, solution, who it helps, prototype notice | D |
| Prices | `/prices` | List + search + filter + average + empty state | C |
| Report Price | `/add` | Validated input form | B |
| Not Found | `*` | 404 page with link home | C |
| Navbar | all pages | Navigation between the three pages | D |

## Data model

Single collection: `prices`.

| Field | Type | Rules | Sensitivity |
|---|---|---|---|
| `fish` | String | required, trimmed | none |
| `market` | String | required, trimmed (landing site) | none |
| `price` | Number | required, min 1, max 10000 (Rs. per kg) | none |
| `seller` | String | required, min length 3, trimmed (reporter name) | low — a first name, self-supplied |
| `date` | String | defaults to today, `YYYY-MM-DD` | none |
| `createdAt` / `updatedAt` | Date | Mongoose `timestamps: true` | none |

No relationships. No joins. Flat, independent documents — this is the reason
MongoDB was chosen over SQL (see `agent/DECISIONS.md`).

## APIs and integrations

| Requirement | Interface | Tool | Fallback | Permission |
|---|---|---|---|---|
| List all prices | `GET /api/prices` | Express + Mongoose | `sampleData.js` in the client with a visible banner | public read |
| Create a price | `POST /api/prices` | Express + Mongoose | in-memory append with a visible "not persisted" banner | public write |
| Health probe | `GET /health` | Express | none | public read |
| Root probe | `GET /` | Express | none | public read |

No third-party API integrations. No crawling. No scraping.

## LLM requirements

- **LLM required in the product: NO.**
- AI tools (Codex / ChatGPT / Claude) are **build-time tools only**. Every
  significant prompt is logged in `AI-PROMPT-LOG.md` and declared in the README
  and the submission PDF.
- No API keys, no model calls, no token budget, no provider selection needed.

## Auth

- **Required: no.** Public read and public write is the intended prototype
  behaviour and is stated as such on the Home page.
- Roles: none.
- Consequence to state in the viva: anyone can POST, which is why **server-side
  Mongoose validation exists** — client validation alone can be bypassed.

## Payments

- **Required: no.**

## Deployment

- **Frontend:** Vercel · Root Directory `client` · Framework Vite
- **Backend:** Railway · Root Directory `server` · Node process
- **Database:** MongoDB Atlas free M0 cluster, network access `0.0.0.0/0`
- **Environments:** local dev + single production. No staging.
- **CI/CD:** git push to `main` triggers both Vercel and Railway auto-deploy.
- **Environment variables:** `MONGO_URI`, `PORT` (server) · `VITE_API_URL` (client).
  See `docs/ENV_VARS.md`.

## Design direction

- **Brand:** civic, plain, trustworthy. Not a startup landing page.
- **Audience:** fishermen and small buyers on cheap Android phones, outdoors, in
  bright sunlight, on mobile data.
- **Visual tone:** high contrast, large tap targets, no decoration that costs
  loading time.
- **Colors:** deep navy `#0d2b6b` primary, `#f4f7fa` page background, white cards.
- **Typography:** system UI stack. No web fonts (no network cost).
- **Accessibility:** semantic form with `<label htmlFor>`, visible focus, 16px
  inputs (prevents iOS zoom-on-focus), no horizontal scroll at 320px.

Full details in `design.md`.

## Evaluation

- **Evaluator:** human marker using the SE3090 rubric — `docs/RUBRIC.md`.
- **Output types:** running deployed app, git history, README, AI prompt log,
  2-minute video, submission PDF, live viva.
- **Hard failures:** deployed link does not open · API returns no JSON ·
  no AI prompt log · a member has no commits · sample data presented as real
  market data · submitted after 12:55.
- **Passing bar:** all 10 minimum requirements in `docs/requirements.md` ticked
  and live-demonstrable.
- **Rubric rule:** work between two bands is awarded the **lower** band.
- **Human approval required:** yes, for deployment and for final submission.

## Approval model

| Action | Risk | Approval required | Rollback |
|---|---|---|---|
| Write app code | low | no | `git revert` |
| Commit / push to a branch | low | no | `git revert` |
| Merge to `main` | medium | team lead (Member A) | `git revert` |
| Create Atlas cluster / DB user | medium | Member A only | delete cluster |
| Set `0.0.0.0/0` network access | medium (prototype-acceptable) | Member A | restrict IP list |
| Deploy to Railway / Vercel | medium | Member A | redeploy previous commit |
| Run `seed.js` (it calls `deleteMany({})`) | **high — destroys all records** | Member A, and **never after 11:55** | re-run seed |
| Upload to CourseWeb | high, irreversible | whole team | resubmit before 12:55 only |

## Sandbox

- **Required: no.** No untrusted code execution, no user-supplied scripts.

## Logging

- **Log:** server start, MongoDB connection state, DB connection failures, seed
  record count.
- **Never log:** `MONGO_URI`, the Atlas password, or any connection string.
- **Retention:** ephemeral — Railway platform logs only.

## Automation

- Out of scope for a 4-hour build. No cron, no scheduled jobs, no webhooks
  beyond the platform's own git-push auto-deploy.

## Acceptance criteria

- [ ] All 10 minimum requirements in `docs/requirements.md` pass a live test
- [ ] Loading, empty, error and offline states are all handled and visible
- [ ] The manual test matrix in `docs/TESTING.md` passes end to end
- [ ] Vercel link opens in incognito **and** on a phone on mobile data
- [ ] Railway `/health` reports `status: ok` and `database: connected`
- [ ] A record submitted from the deployed site is visible in MongoDB Atlas
- [ ] No secrets in the repository or in any Markdown file
- [ ] Client fallback behaviour is defined **and clearly labelled** in the UI
- [ ] Mobile responsive with no horizontal scroll at 320px
- [ ] README contains all 10 required items
- [ ] `AI-PROMPT-LOG.md` contains exact significant prompts
- [ ] All four members have meaningful commits under their own git identity

## Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Atlas connection times out from Railway | API dead, no data, heavy mark loss | Network Access → `0.0.0.0/0` during Phase 1, verified via `/health` |
| `VITE_API_URL` set after the first Vercel build | Deployed site cannot fetch | Vite bakes env vars at build time — **set the variable, then redeploy** |
| CORS error on the deployed site | Fetch blocked | `app.use(cors())` must come **before** the route registration |
| Wrong root directory on Vercel or Railway | Build/start failure | Vercel root `client`, Railway root `server` |
| One member has no commits | Loses the 5-mark contribution criterion | Each member owns distinct files; commit per finished feature |
| Running `seed.js` late | Wipes the demo record just proven in Atlas | Seed only in Phase 2. Forbidden after 11:55. |
| Demo runs long | Drops the demonstration band | Rehearse to 1:50–1:58 |
| Late submission | Zero for submission | Upload by 12:55, not 12:59 |
| Sample data described as real | Integrity problem + mark loss | Prototype notice in the UI, README and video |

## Team

| Code | Name | Student ID | Component |
|---|---|---|---|
| A | W.M.S.S.B. Wasala | IT24100559 | Integration, API layer, Git & deployment |
| B | Karunathilaka K.D.J.C **(Group Leader)** | IT24100551 | Add Price form + validation |
| C | Fernando K.R.N | IT24101875 | Price list, search, filter, calculate, 404 |
| D | Samaranayaka S.G.V.S | IT23544154 | Landing page, navigation, responsive CSS, sample data |

Full ownership map and commit plan: `docs/TEAM.md`.

## Open questions

1. The four GitHub usernames, for collaborator invites.
2. Actual GitHub org/user for the repo URL.
3. Whether the team has any stronger, verifiable local evidence to strengthen the
   problem statement.
4. OneDrive account used for the demo video link (sharing must be set to anyone).
