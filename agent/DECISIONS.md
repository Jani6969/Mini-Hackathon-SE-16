# Architecture Decisions — Negombo Fish Price Board

Every decision here is a potential viva question. Each entry gives the decision,
the reason, the alternatives, and the tradeoff — that is exactly the shape of a
good viva answer.

## Format

### YYYY-MM-DD — Decision title

**Decision:** what was decided.
**Reason:** why.
**Alternatives considered:** other options.
**Risk:** downside or tradeoff.
**Status:** proposed / accepted / changed / rejected.

---

## Decisions

### 2026-09-04 — MongoDB Atlas over a relational database

**Decision:**
Store price reports as flat documents in a MongoDB Atlas free M0 cluster, accessed
through Mongoose.

**Reason:**
The data is a single flat set of independent price records with no relational
joins — one collection, six fields, no foreign keys. A document store fits that
shape directly and removes the schema-migration step entirely, which matters in a
four-hour build. Mongoose also gives schema validation server-side for free, which
covers the "validate twice" requirement without extra code.

**Alternatives considered:**
PostgreSQL via Supabase — better if the data were relational or if auth were
needed, but it adds a migration step and a heavier client for no benefit here.
SQLite — no free managed host that Railway can reach persistently.
A JSON file on the server — Railway's filesystem is ephemeral, so writes would be
lost on redeploy. That alone disqualifies it.

**Risk:**
No schema enforcement at the database level beyond what Mongoose applies in the
application layer. A direct write bypassing the app could store anything. Accepted
— the only writer is our API.

**Status:** Accepted

---

### 2026-09-04 — Split hosting: Vercel for the SPA, Railway for the API

**Decision:**
Deploy `client/` to Vercel as a static Vite build, and `server/` to Railway as a
long-running Node process. Both deploy from the same GitHub repo using different
root directories.

**Reason:**
Vercel is zero-config for Vite and serves the SPA from a CDN, which is what a
static bundle wants. Railway runs a persistent Node process with environment
variables on the free tier, which is what an Express server that holds a MongoDB
connection wants. Using each platform for what it is good at avoids the two
classic failure modes — a serverless function reopening a database connection per
request, and a static host that cannot run a server at all.

**Alternatives considered:**
Everything on Vercel as serverless functions — cold starts reopen the Mongo
connection and the deployment shape is less obvious to explain in a viva.
Everything on Railway — works, but loses CDN delivery for the frontend and adds
a build step we do not need.
Render — equivalent to Railway; Railway was chosen because the team already has
accounts.

**Risk:**
Two platforms means two places to misconfigure, and it forces CORS to be correct.
Mitigated by `app.use(cors())` before the routes and by the deployment checklist
in `agent/TODO.md` Phase 6.

**Status:** Accepted

---

### 2026-09-04 — Plain CSS instead of a UI framework

**Decision:**
One hand-written `client/src/index.css`, using CSS Grid with
`repeat(auto-fit, minmax(240px, 1fr))` and a single `max-width: 600px` media query.

**Reason:**
Zero install, zero build config, zero version risk, and nothing to debug under
time pressure. `auto-fit` + `minmax` makes the card grid reflow responsively
without writing per-breakpoint rules, which answers the responsiveness
requirement with one line. The target users are on cheap Android phones on mobile
data — a framework bundle is a real cost for them and buys us nothing.

**Alternatives considered:**
Tailwind — excellent, but the setup step and the class-heavy JSX are pure risk in
a four-hour window with four people merging.
Bootstrap / MUI — a large bundle and a generic look, and the marker cannot tell
which styling decisions were ours.

**Risk:**
No design system, so visual consistency depends on discipline. Mitigated by
`design.md` and by giving one member (D) sole ownership of the stylesheet, which
also removes CSS merge conflicts.

**Status:** Accepted

---

### 2026-09-04 — All state lives in `App.jsx` and flows down as props

**Decision:**
`App.jsx` holds `prices`, `loading` and `offline`. It fetches once on mount and
passes data down. `PriceList` receives `prices` as a prop and never fetches.
`AddPrice` receives an `onAdd` callback and never calls the API directly.

**Reason:**
One source of truth, one-way data flow, and a clean ownership boundary between
the four members — B and C can build their pages against props without touching
the API layer, so nobody is blocked and merge conflicts stay near zero. New
records are prepended to state after the API confirms, so the list updates without
a refetch.

**Alternatives considered:**
Redux or Zustand — unnecessary state-management overhead for one array.
React Context — no prop drilling problem exists at this depth (one level).
Fetching inside each page — duplicate requests, duplicate loading states, and two
copies of the same array to keep in sync.

**Risk:**
Would not scale past a handful of pages. Correct at this size; we would lift to
Context or a store if the app grew.

**Status:** Accepted

---

### 2026-09-04 — Validate twice: client-side and server-side

**Decision:**
Per-field validation in `AddPrice.jsx` for instant feedback, **and** the same
rules expressed as Mongoose schema constraints in `server/models/Price.js`. The
API maps `ValidationError` to HTTP 400 with a friendly joined message.

**Reason:**
Client validation is a user-experience feature: it gives feedback without a round
trip and clears as the user types. Server validation is a correctness feature:
the API is public, so anyone can POST directly and bypass the browser entirely.
Neither one replaces the other.

**Alternatives considered:**
Client-only — trivially bypassed with `curl`, and the database would accept
garbage.
Server-only — correct but slow and unfriendly; the user waits for a round trip to
be told a field is empty.

**Risk:**
The rules are written in two places and can drift. Accepted at this size; the
values (min 1, max 10000, name ≥ 3) are documented in `docs/requirements.md` so
both sides can be checked against one list.

**Status:** Accepted

---

### 2026-09-04 — A labelled offline fallback, not a silent one

**Decision:**
If `getPrices()` fails, the client falls back to `sampleData.js` **and** sets
`offline = true`, which renders a persistent banner: *"API unavailable — showing
demonstration sample data. New entries in this mode are not persisted to
MongoDB."*

**Reason:**
The fallback exists so a network or platform failure during evaluation does not
leave a blank screen — the UI stays explorable and the marker can still see the
features. But an unlabelled fallback would misrepresent demo data as live database
data, which is an integrity problem, not a feature. The banner makes the mode
honest and explicit.

**Alternatives considered:**
No fallback — a single Railway hiccup at 12:20 loses most of the demo.
A silent fallback — the demo looks fine while quietly lying about persistence.
Rejected on integrity grounds.

**Risk:**
A reader might think the fallback is how the app normally works. Mitigated by
proving live persistence in the demo — submit a record and show it in Atlas.

**Status:** Accepted

---

### 2026-09-04 — Only two API endpoints

**Decision:**
`GET /api/prices` and `POST /api/prices`, plus `GET /` and `GET /health` as
probes. No `GET /:id`, no `PUT`, no `DELETE`.

**Reason:**
Every endpoint the UI does not call is untested surface area and one more thing
to explain and defend. The rubric rewards a complete, reliable core, not endpoint
count. `/health` is the exception because it is *deployment evidence* — it proves
the API is up and the database is connected in a single URL the marker can open.

**Alternatives considered:**
Full CRUD — more code, more risk, no marks, and no screen uses it.

**Risk:**
A marker might ask "where is delete?". The honest answer is that a public board
with no auth should not expose deletion, and moderation is listed as future work.

**Status:** Accepted

---

### 2026-09-04 — Atlas network access set to `0.0.0.0/0`

**Decision:**
Allow database connections from any IP address.

**Reason:**
Railway does not publish a stable outbound IP range on the free tier, so an IP
allow-list cannot be written. Without this setting the API deploys successfully
and then times out on every query — the single most common failure in this stack.

**Alternatives considered:**
An IP allow-list — not possible against Railway's free tier.
A self-hosted database — no time, and no host.

**Risk:**
The cluster is reachable from anywhere, so the credential is the only control.
Acceptable for a throwaway hackathon cluster holding non-sensitive illustrative
price data with a strong generated password that is never committed. **This is
explicitly not a production posture** — a production system would use a private
network or a VPC peer, and this is the right thing to say if asked.

**Status:** Accepted (prototype scope only)

---

### 2026-09-04 — File-level ownership per member

**Decision:**
Each member owns distinct files: A owns `App.jsx`, `priceApi.js` and all of
`server/`; B owns `AddPrice.jsx`; C owns `PriceList.jsx` and `NotFound.jsx`;
D owns `Home.jsx`, `Navbar.jsx`, `index.css` and `sampleData.js`.

**Reason:**
Two problems solved at once. Merge conflicts approach zero because four people
never edit the same file. And the rubric's 5-mark "contribution from all members"
criterion needs each member to have identifiable commits under their own git
identity — file ownership makes that automatic instead of something to reconstruct
at 12:40.

**Alternatives considered:**
Pair programming on one machine — three members end up with no commits.
Feature branches with shared files — merge conflicts in `index.css` and `App.jsx`
during the tightest window of the build.

**Risk:**
A blocked member blocks their whole file. Mitigated because B, C and D work
against props and sample data and never need a running API.

**Status:** Accepted

---

### 2026-09-04 — No LLM in the product

**Decision:**
The application contains no AI feature. AI tools are used only during the build
and are declared in `AI-PROMPT-LOG.md`, the README and the submission PDF.

**Reason:**
An AI feature would add an API key, a cost, a latency risk and a failure mode to
a four-hour build, and the rubric awards nothing for it. The "effective use of
technology & AI" criterion is about justifying the stack and documenting AI use
honestly — which the prompt log does.

**Alternatives considered:**
A price-anomaly detector or a chatbot — both are in the explicit "skip" list of
the build plan for exactly this reason.

**Risk:**
Someone may assume "no AI feature" means "no AI use". The prompt log and the
README AI declaration prevent that misreading.

**Status:** Accepted

---

### 2026-09-04 — Adopt the Stitch dark theme, but rewrite it as plain CSS

**Decision:**
Rebuild the client UI to the dark "dockside terminal" theme designed in Google
Stitch (project `Website Homepage Design`), hand-written as plain CSS with
`:root` custom properties. Stitch's own export — Tailwind loaded from a CDN plus
an inline config — was not adopted.

**Reason:**
Pasting the Stitch export would have added a render-blocking third-party script,
a CDN dependency on the critical path, and a contradiction with the stack table
in `CLAUDE.md` that the team has to defend in the viva. Rewriting the same design
as plain CSS keeps the stack answer true, adds no dependency to `package.json`,
and produces a 2.5 kB gzipped stylesheet.

**Alternatives considered:**
1. Tokens only — lift the palette and fonts, keep the existing layouts. Cheapest,
   but does not deliver the design that was asked for.
2. Adopt the Tailwind CDN export verbatim — fastest to paste, but breaks the
   stack story and adds a network dependency for users on mobile data.

**Risk:**
`design.md` previously listed dark mode, web fonts and theming tokens as
explicitly out of scope, and names Member D as the sole owner of
`client/src/index.css`. Both the stylesheet and `design.md` were rewritten by
another hand this session; Member D needs to sign off. The two Google Fonts add
one network request, mitigated by `display=swap` and real system fallbacks.

**Status:** Accepted, pending Member D sign-off

---

### 2026-09-04 — Drop the mockup panels that had no real data behind them

**Decision:**
The Stitch mockups show a live price ticker, a market-spread chart, boat names,
catch-grade chips and landing-zone statistics. None of these exist in the
`Price` schema (`fish`, `market`, `price`, `seller`, `date`). They were dropped
rather than populated with invented figures. The stats strips show only values
derived from real records: count, average, lowest, highest.

**Reason:**
`CLAUDE.md` requires that sample prices are never presented as official or
verified market quotations. Fabricated ticker and spread data would read as
market information the prototype does not have, which is precisely the failure
the prototype notice exists to prevent.

**Alternatives considered:**
Extending the schema to carry grade, quantity and boat name — rejected as scope
creep against a locked data model, with no rubric credit attached.

**Risk:**
The shipped pages are visually simpler than the mockups. Acceptable: the mockups
are a design reference, not a deliverable.

**Status:** Accepted

---

### 2026-09-04 — Per-report 4-digit Edit PIN instead of accounts

**Decision:**
Ownership of a price report is proved by a 4-digit Edit PIN the reporter chooses
at submission time. The server stores only a bcryptjs hash of it (`select: false`
on the field), and requires a matching PIN before `PUT` or `DELETE` will touch a
record. There is no registration, login, JWT, session or recovery flow.

**Reason:**
Gate 5 in `CLAUDE.md` fixes this prototype as public read + public write, and
authentication is explicitly out of scope. But an unprotected public board where
anyone can edit or delete anyone's report is worse than one with no edit at all.
A per-record PIN is the smallest mechanism that gives a reporter control over
their own entry without introducing accounts, and it is explainable in one
sentence at the viva.

**Alternatives considered:**
- Full auth (accounts, JWT) — rejected: explicitly out of scope, and a deployment
  risk that earns no rubric marks.
- Browser-local ownership (`localStorage` record ids) — rejected: it is not real
  ownership, it breaks across devices and incognito, and the marker tests in
  incognito.
- No edit or delete at all — rejected: the assessment asks for the capability,
  and a mistyped price otherwise sits on the board until it expires.

**Risk:**
A 4-digit PIN is guessable by brute force; there is no rate limiting. This is
stated honestly rather than hidden — the data is non-sensitive community price
reports, and every record self-destructs within 24 hours, which bounds the value
of guessing one. Rate limiting is named as a limitation, not implemented.

**Status:** Accepted

---

### 2026-09-04 — 24-hour expiry via a MongoDB TTL index, set once at creation

**Decision:**
`expiresAt` defaults to creation time + 24 hours and carries a TTL index
(`expireAfterSeconds: 0`). MongoDB's background monitor deletes expired
documents. An edit updates only `fish`, `market`, `price` and `seller`; it never
rewrites `expiresAt`.

**Reason:**
A dockside price is only meaningful on the day it was reported, so stale records
should disappear on their own rather than needing a cleanup job or a cron
service. The TTL index moves that work into the database, which means no extra
process to deploy on Railway and nothing to go wrong at 3am.

Anchoring the expiry to creation rather than to the last edit is the point: if an
edit reset the clock, a record could be kept alive indefinitely by editing it,
and the 24-hour guarantee shown in the UI would be false.

**Alternatives considered:**
- A `setInterval` sweeper in the Express process — rejected: dies with the dyno,
  duplicates work across instances, and is more code than an index.
- Filtering old records out at query time and leaving them in the collection —
  rejected: the documents would accumulate forever on a free M0 tier.

**Risk:**
TTL deletion is asynchronous — the monitor runs roughly once a minute, so a
document can outlive its `expiresAt` by up to about a minute. Expected MongoDB
behaviour; noted here because it is a likely viva question.

**Status:** Accepted
