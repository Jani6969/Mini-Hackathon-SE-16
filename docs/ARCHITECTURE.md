# Architecture — Negombo Fish Price Board

## One-sentence summary

A React SPA hosted on Vercel calls a REST API on Railway, which reads and writes
documents in MongoDB Atlas.

---

## System diagram

```
┌──────────────┐   HTTPS    ┌─────────────────────┐   fetch    ┌──────────────────────┐
│   Browser    │──────────► │  Vercel (CDN)       │            │  Railway             │
│  phone/      │            │  React 18 + Vite    │───────────►│  Node + Express      │
│  desktop     │◄────────── │  static bundle      │◄───────────│  REST API            │
└──────────────┘            └─────────────────────┘   JSON     └──────────┬───────────┘
                                                                          │ Mongoose
                                                                          ▼
                                                             ┌────────────────────────┐
                                                             │  MongoDB Atlas (M0)    │
                                                             │  db: fishprice         │
                                                             │  collection: prices    │
                                                             └────────────────────────┘
```

Three tiers, three hosts, one repository. Vercel builds from `client/`, Railway
builds from `server/`, and both auto-deploy on a push to `main`.

---

## Repository layout

```
negombo-fish-price-board/
│
├── client/                       # React + Vite frontend  → Vercel
│   ├── src/
│   │   ├── api/priceApi.js       # ALL fetch calls, one file          (A)
│   │   ├── components/Navbar.jsx                                      (D)
│   │   ├── data/sampleData.js    # offline fallback data              (D)
│   │   ├── pages/Home.jsx        # problem, solution, who it helps    (D)
│   │   ├── pages/AddPrice.jsx    # form + validation                  (B)
│   │   ├── pages/PriceList.jsx   # list, search, filter, average      (C)
│   │   ├── pages/NotFound.jsx    # 404                                (C)
│   │   ├── App.jsx               # state, routing, offline fallback   (A)
│   │   ├── main.jsx
│   │   └── index.css             # the whole stylesheet               (D)
│   ├── .env                      # VITE_API_URL          (gitignored)
│   ├── vercel.json               # SPA rewrite to index.html
│   ├── index.html
│   └── package.json
│
├── server/                       # Express + Mongoose  → Railway
│   ├── models/Price.js           # schema + server-side validation    (A)
│   ├── routes/priceRoutes.js     # GET + POST only                    (A)
│   ├── seed.js                   # 8 illustrative records             (A)
│   ├── server.js                 # cors → json → routes → 404         (A)
│   ├── .env                      # MONGO_URI, PORT       (gitignored)
│   └── package.json              # "type": "module"
│
├── agent/                        # BRIEF · TODO · DECISIONS · MEMORY
├── docs/                         # this file and the rest
├── rules/  skills/  workflows/   # agent guidance from the template
├── AI-PROMPT-LOG.md              # MANDATORY (spec §2.2)
├── HACKATHON_BUILD_PLAN_FINAL.md # source-of-truth plan + all reference code
├── CLAUDE.md · AGENTS.md · START_HERE.md · design.md · README.md
└── .gitignore
```

---

## Data flow — reading prices

```
App.jsx mounts
   └─ useEffect fires once
        └─ getPrices()  ──►  GET {VITE_API_URL}/api/prices
                                  └─ Express route
                                       └─ Price.find().sort({ createdAt: -1 })
                                            └─ Atlas returns documents
              ◄── { success: true, message: 'OK', data: [...] }
   └─ setPrices(data), setOffline(false), setLoading(false)
        └─ <PriceList prices={prices} loading={loading} />
             └─ derives: filtered = search ∩ market, avg = mean(filtered)
```

If the fetch **throws**: `setPrices(sampleData)` and `setOffline(true)`, which
renders a persistent banner stating that entries in this mode are not persisted.
The fallback is deliberately labelled — see `agent/DECISIONS.md`.

## Data flow — writing a price

```
AddPrice.jsx  submit
   └─ event.preventDefault()
   └─ validate()  ── errors? ──► render per-field messages, stop
        └─ no errors
             └─ onAdd({ ...form, price: Number(form.price) })
                  └─ App.addPrice
                       ├─ offline → prepend a demo-* record locally, do not call the API
                       └─ online  → createPrice(entry)
                                      └─ POST /api/prices  (JSON body)
                                           └─ Price.create(req.body)
                                                ├─ Mongoose validation passes → 201 + saved doc
                                                └─ ValidationError → 400 + joined messages
                       └─ setPrices(prev => [saved, ...prev])
             └─ navigate('/prices')  → new record is at the top
```

**Two validation gates, on purpose.** The client gate is user experience; the
Mongoose gate is correctness, because the API is public and anyone can POST
directly. See `docs/requirements.md` for the shared rule table.

---

## API contract

Base URL: the Railway domain (production) or `http://localhost:5000` (local).

Every response uses one envelope:

```json
{ "success": true, "message": "OK", "data": [] }
```

| Method | Path | Purpose | Success | Failure |
|---|---|---|---|---|
| `GET` | `/` | liveness probe | 200 `{ success, message }` | — |
| `GET` | `/health` | deployment evidence | 200 `{ status: "ok", database: "connected" \| "disconnected" }` | — |
| `GET` | `/api/prices` | all records, newest first | 200 `{ success, message, data: [...] }` | 500 `{ success: false, message: "Server error" }` |
| `POST` | `/api/prices` | create one record | 201 `{ success, message, data: {...} }` | 400 validation message · 500 server error |
| any | anything else | JSON 404 handler | — | 404 `{ success: false, message: "Endpoint not found" }` |

**Deliberately absent:** `GET /:id`, `PUT`, `DELETE`. No screen calls them, so
they would be untested surface area. See `agent/DECISIONS.md`.

### Middleware order in `server.js` — this order is load-bearing

```
dotenv.config()
app.use(cors())            ⚠ MUST come before the routes
app.use(express.json())
GET /                      liveness
GET /health                db state from mongoose.connection.readyState
app.use('/api/prices', priceRoutes)
app.use(404 handler)       last
mongoose.connect() ──then──► app.listen(PORT)
```

`cors()` after the route registration is a known failure: the browser blocks every
request from the Vercel origin while `curl` keeps working, which makes it look
like a frontend bug.

The server listens **only after** the database connects, so a healthy process
implies a healthy connection.

---

## Data model

One collection, `prices`, in database `fishprice`. Flat, independent documents, no
relationships, no joins — which is the reason a document store was chosen.

```js
{
  _id:       ObjectId,   // Mongo-generated; used as the React list key
  fish:      String,     // required, trimmed
  market:    String,     // required, trimmed — the landing site
  price:     Number,     // required, 1..10000, Rs. per kg
  seller:    String,     // required, min 3 chars — the reporter's name
  date:      String,     // 'YYYY-MM-DD', defaults to today
  createdAt: Date,       // timestamps: true — also the sort key
  updatedAt: Date
}
```

Sorted by `createdAt: -1` so new reports appear at the top.

---

## State management

| State | Owner | Kind |
|---|---|---|
| `prices` | `App.jsx` | source of truth, fetched once on mount |
| `loading` | `App.jsx` | source of truth |
| `offline` | `App.jsx` | source of truth |
| `search`, `market` | `PriceList.jsx` | local UI state |
| `filtered`, `avg` | `PriceList.jsx` | **derived** — recomputed each render |
| `form`, `errors`, `saving`, `apiError` | `AddPrice.jsx` | local form state |

Props down, callbacks up. No Redux, no Context — one array one level deep does not
need them. `filtered` and `avg` are derived rather than stored, so there is no
second copy of the data to keep in sync.

---

## Responsive strategy

```css
.grid { display: grid; gap: 14px;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }

@media (max-width: 600px) { .nav { flex-direction: column; } }
```

The card grid reflows on its own — `auto-fit` collapses empty tracks and `minmax`
sets the floor, so columns adapt at every width with **no breakpoint**. One media
query remains, purely to stack the navigation bar. This is the responsiveness
answer in the viva.

Inputs are `font-size: 16px` so iOS Safari does not zoom when a field is focused.

---

## Failure modes and what the user sees

| Failure | Detected by | User sees |
|---|---|---|
| API unreachable at load | `getPrices()` throws | Sample data + a persistent "not persisted" banner |
| API rejects a submission | `createPrice()` throws | The server's message rendered in the form |
| Field invalid before submit | `validate()` | Per-field message, cleared as the user types |
| Filter matches nothing | `filtered.length === 0` | "No prices found for that search." |
| Data not yet arrived | `loading` | "Loading prices..." |
| Unknown route | React Router `*` | The 404 page with a link home |
| Unknown API path | Express 404 handler | JSON `{ success: false, message: "Endpoint not found" }` |
| Atlas unreachable from Railway | `/health` | `database: "disconnected"` — the deployment probe |

---

## Security posture

This is a **public prototype** and its posture is deliberate, not accidental.

- **No authentication.** Public read and public write is the intended behaviour
  for a community board at this scope. It is stated on the Home page.
- **Server-side validation is the real gate.** Client validation can be bypassed
  with `curl`; Mongoose constraints cannot.
- **No secrets in the repo.** `MONGO_URI` exists only in `server/.env`
  (gitignored) and in Railway's Variables dashboard. It is never logged.
- **Atlas network access is `0.0.0.0/0`** because Railway's free tier has no
  stable outbound IP. The credential is the only control. This is acceptable for a
  throwaway cluster holding illustrative data, and it is **explicitly not a
  production posture** — production would use a private network or VPC peering.
- **No PII.** The only personal field is a self-supplied first name.
- **CORS is fully open** (`app.use(cors())` with no origin list) because the
  frontend origin is not known until Vercel assigns a domain. A production build
  would pin the allowed origin.

---

## What we would change with more time

1. Price history and trends over time, rather than only the latest reports.
2. Per-site comparison charts for the same fish.
3. Moderation — a report is currently trusted, which a real board would not do.
4. A pinned CORS origin and an Atlas private endpoint.
5. Automated tests: Vitest for the validation and filter logic, Supertest for the
   two endpoints.
