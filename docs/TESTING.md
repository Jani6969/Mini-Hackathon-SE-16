# Manual Test Matrix

There is no automated test suite — a four-hour build spends its time on the
rubric, and this is stated honestly rather than hidden. What replaces it is this
matrix, run twice: once locally at Phase 4, and once against the deployed site at
Phase 6.

**Rule:** run the step, read the actual output, then tick. Never tick from memory.

---

## Suite A — Server (local, Phase 2)

| # | Step | Expected |
|---|---|---|
| A1 | `cd server && npm run seed` | `Seeded 8 records` |
| A2 | `npm run dev` | `MongoDB connected` then `API on 5000` |
| A3 | Open `http://localhost:5000/` | `{"success":true,"message":"Fish Price API running"}` |
| A4 | Open `http://localhost:5000/health` | `{"status":"ok","database":"connected"}` |
| A5 | Open `http://localhost:5000/api/prices` | JSON array of 8 records, newest first |
| A6 | Open `http://localhost:5000/nonsense` | `{"success":false,"message":"Endpoint not found"}` |
| A7 | Bad POST (below) | **HTTP 400** with joined friendly messages |
| A8 | Good POST (below) | **HTTP 201** with the saved document |
| A9 | Atlas → Browse Collections → `prices` | 9 documents |

```bash
# A7 — every field invalid at once
curl -i -X POST http://localhost:5000/api/prices \
  -H "Content-Type: application/json" \
  -d '{"fish":"","market":"","price":99999,"seller":"ab"}'

# A8 — valid
curl -i -X POST http://localhost:5000/api/prices \
  -H "Content-Type: application/json" \
  -d '{"fish":"Balaya (Skipjack)","market":"Pitipana","price":900,"seller":"Test User"}'
```

**A7 is the proof that server-side validation is real** and not just a client
nicety. It is a viva question — keep the terminal output.

---

## Suite B — Form and validation (requirement 4, 5)

| # | Step | Expected |
|---|---|---|
| B1 | Open `/add` | Four labelled fields and a submit button |
| B2 | Submit with everything empty | **Four** error messages appear at once |
| B3 | Price = `abc` | "Price must be a number greater than 0." |
| B4 | Price = `0` | Same number error |
| B5 | Price = `-5` | Same number error |
| B6 | Price = `50000` | "That looks too high — please check the price per kilo." |
| B7 | Price = `10000` | **Accepted** — the boundary is inclusive |
| B8 | Name = `ab` | "Name must be at least 3 characters." |
| B9 | Name = `   ` (spaces only) | "Please enter your name." — it is trimmed |
| B10 | Start typing in a field showing an error | That error clears immediately |
| B11 | Click into a `<label>` | Focus moves to its input (semantic `htmlFor`) |
| B12 | Press **Enter** inside a text field | The form submits — no page reload |
| B13 | Submit a valid record | Button disables and reads "Saving..." |
| B14 | After a valid submit | Navigates to `/prices`, new record **at the top** |
| B15 | Stop the server, then submit | The offline path appends locally; the banner explains it is not persisted |

---

## Suite C — List, search, filter, average (requirement 6)

| # | Step | Expected |
|---|---|---|
| C1 | Open `/prices` before data arrives | "Loading prices..." |
| C2 | Data loaded | 8 cards; each shows fish, `Rs. n /kg`, market, date, reporter |
| C3 | Type `Bala` | Only Balaya rows remain; the count updates |
| C4 | Type `BALA` | Same result — the search is case-insensitive |
| C5 | Type `zzz` | "No prices found for that search." |
| C6 | Clear the search | All 8 return |
| C7 | Filter → `Pitipana` | Only Pitipana rows |
| C8 | Search `Bala` **+** filter `Pitipana` | The intersection — exactly one row |
| C9 | Watch the average through C3–C8 | Recalculates on every change |
| C10 | Filter to an empty result | Average shows `Rs. 0` — no `NaN`, no crash |
| C11 | Submit a new record, return to the list | It is at the top and included in the average |
| C12 | Browser console | **No** "each child should have a unique key" warning |

---

## Suite D — Navigation and 404 (requirement 8)

| # | Step | Expected |
|---|---|---|
| D1 | Click Home / Prices / Report Price | Each route loads, **no page reload** |
| D2 | Navbar present on every page | Yes |
| D3 | Visit `/random-url` | The app's 404 page |
| D4 | Click "Back to home" on the 404 | Returns to `/` |
| D5 | Browser back button | Returns to the previous route |
| D6 | Hard refresh on `/prices` (deployed) | Loads — proves the `vercel.json` rewrite |

---

## Suite E — Content and honesty (requirements 1, 2, 9, 10)

| # | Step | Expected |
|---|---|---|
| E1 | Open `/` | Clean landing page, no Vite boilerplate anywhere |
| E2 | Read the Home page | **The Problem**, **Our Solution**, **Who It Helps** sections present |
| E3 | Home page names | Negombo Main, Duwa Landing, Pitipana all named |
| E4 | Home page users | Small-scale fishermen and small buyers named |
| E5 | Prototype notice | Visible, stating that sample prices are illustrative and not official quotations |
| E6 | Sample data | 8 records, real Sinhala fish names, spread over all three sites |
| E7 | The same fish at two sites | Balaya appears at both Negombo Main and Pitipana — this is what makes comparison demonstrable |

---

## Suite F — Responsive (requirement 7)

| # | Width | Expected |
|---|---|---|
| F1 | 320px | **No horizontal scroll.** Cards single column, nav stacked |
| F2 | 375px | Same, comfortable |
| F3 | 600px | The nav breakpoint applies |
| F4 | 768px | Grid begins to show two columns |
| F5 | 1280px | Content centred at `max-width: 900px`, multi-column grid |
| F6 | Real phone | Text legible without pinching; tap targets reachable |
| F7 | Focus a form input on iOS | The page **does not zoom** — inputs are 16px |

---

## Suite G — Build and integration (Phase 4)

| # | Step | Expected |
|---|---|---|
| G1 | `grep -rn "<<<<<<<" client server` | No output — no conflict markers |
| G2 | `cd client && npm i` | Clean install |
| G3 | `cd server && npm i` | Clean install |
| G4 | `cd client && npm run build` | **Succeeds.** A failure here becomes a Vercel failure |
| G5 | `npm run preview`, click all four routes | All work on the production bundle |
| G6 | Browser console during a full walkthrough | No errors, no React warnings |
| G7 | `git ls-files \| grep -E "\.env$\|node_modules"` | No output — nothing secret is tracked |
| G8 | `git log --pretty=format:"%an %s"` | Meaningful commits from **all four** members |

---

## Suite H — Deployed site (Phase 6, the marked one)

| # | Step | Expected |
|---|---|---|
| H1 | `<railway>/health` | `status: ok`, `database: connected` |
| H2 | `<railway>/api/prices` | JSON in the browser |
| H3 | Vercel link, normal window | Live data; **offline banner not visible** |
| H4 | Vercel link, **incognito** | Works — proves it is public |
| H5 | Vercel link, **phone on mobile data** | Works — not just on campus wifi |
| H6 | Console on the deployed site | **No CORS error** |
| H7 | Re-run Suite B on the deployed build | All pass |
| H8 | Re-run Suite C on the deployed build | All pass |
| H9 | Submit `Balaya (Skipjack) / Duwa Landing / 975 / Demo Team` | Appears at the top |
| H10 | **Refresh** the page | The record survives — real persistence |
| H11 | Atlas → Browse Collections → `prices` | The same record is present |
| H12 | Screenshot H11 | Saved for the submission PDF |

---

## Suite I — Failure and recovery

| # | Step | Expected |
|---|---|---|
| I1 | Stop the local server, reload the client | Sample data + the offline banner appear |
| I2 | Read the banner | It states plainly that entries are **not persisted** |
| I3 | Restart the server, reload | Banner disappears, live data returns |
| I4 | POST a duplicate record | Accepted — duplicates are legitimate; two people can report the same fish |

---

---

## Suite J — Edit PIN ownership and 24-hour expiry

Every step here is server-verified: the UI check and the Atlas check must agree.
Replace `<ID>` with a real `_id` from `GET /api/prices`.

### J1 — Create with a PIN

| # | Step | Expected |
|---|---|---|
| J1.1 | `/add`, submit with the PIN field empty | "Please create a 4-digit Edit PIN." |
| J1.2 | PIN = `482` | "Edit PIN must contain exactly 4 digits." |
| J1.3 | Type letters into the PIN field | Nothing is entered — digits only, max 4 |
| J1.4 | PIN = `4826`, other fields valid | Saves, navigates to `/prices`, card at the top |
| J1.5 | Atlas → Browse Collections → `prices` | New document present |
| J1.6 | Inspect that document | `editPinHash` starts `$2`; **no** `editPin` field; raw `4826` appears nowhere |
| J1.7 | `GET /api/prices` response | No `editPinHash` anywhere in the JSON |

```bash
# J1.2 server-side — the frontend is not the only guard
curl -i -X POST http://localhost:5000/api/prices \
  -H "Content-Type: application/json" \
  -d '{"fish":"Balaya (Skipjack)","market":"Pitipana","price":950,"seller":"Nimal","editPin":"482"}'
# expect: HTTP 400  "Edit PIN must contain exactly 4 digits."

# J1.4 server-side
curl -i -X POST http://localhost:5000/api/prices \
  -H "Content-Type: application/json" \
  -d '{"fish":"Balaya (Skipjack)","market":"Pitipana","price":950,"seller":"Nimal","editPin":"4826"}'
# expect: HTTP 201, data contains expiresAt, and NO editPinHash
```

### J2 — Edit with the wrong PIN

| # | Step | Expected |
|---|---|---|
| J2.1 | Card → **Edit**, change price, PIN = `9999` | Dialog stays open, "Incorrect edit PIN." |
| J2.2 | Atlas | Price unchanged |

```bash
curl -i -X PUT http://localhost:5000/api/prices/<ID> \
  -H "Content-Type: application/json" \
  -d '{"price":980,"editPin":"9999"}'
# expect: HTTP 403  "Incorrect edit PIN."
```

### J3 — Edit with the correct PIN

| # | Step | Expected |
|---|---|---|
| J3.1 | Note the record's `expiresAt` in Atlas before editing | Write it down |
| J3.2 | Card → **Edit**, price `950` → `980`, PIN = `4826` | Dialog closes, "Price report updated successfully." |
| J3.3 | The card | Shows Rs. 980 — **no page reload** |
| J3.4 | Average / search / filter | Recalculate on their own |
| J3.5 | Atlas | `price` is `980` |
| J3.6 | Atlas `expiresAt` | **Identical** to J3.1 — an edit never extends the life of a report |

```bash
curl -i -X PUT http://localhost:5000/api/prices/<ID> \
  -H "Content-Type: application/json" \
  -d '{"price":980,"editPin":"4826"}'
# expect: HTTP 200, data.price = 980

# The client cannot push the expiry out or replace the hash:
curl -i -X PUT http://localhost:5000/api/prices/<ID> \
  -H "Content-Type: application/json" \
  -d '{"price":985,"editPin":"4826","expiresAt":"2030-01-01T00:00:00Z","editPinHash":"pwned"}'
# expect: HTTP 200, price 985 — but expiresAt and editPinHash unchanged in Atlas
```

### J4 — Delete with the wrong PIN

| # | Step | Expected |
|---|---|---|
| J4.1 | Card → **Delete**, PIN = `0001` | Dialog stays open, "Incorrect edit PIN." |
| J4.2 | Atlas | Record still there |

```bash
curl -i -X DELETE http://localhost:5000/api/prices/<ID> \
  -H "Content-Type: application/json" -d '{"editPin":"0001"}'
# expect: HTTP 403
```

### J5 — Delete with the correct PIN

| # | Step | Expected |
|---|---|---|
| J5.1 | Card → **Delete**, PIN = `4826` | Card disappears, "Price report deleted successfully." |
| J5.2 | Average / entry count | Recalculate immediately |
| J5.3 | Atlas | Document gone |
| J5.4 | `DELETE` the same id again | **HTTP 404** "Price report not found." |

```bash
curl -i -X DELETE http://localhost:5000/api/prices/<ID> \
  -H "Content-Type: application/json" -d '{"editPin":"4826"}'
# expect: HTTP 200  "Price report deleted successfully."
```

### J6 — TTL

Do **not** sit and wait 24 hours. Prove the mechanism instead.

| # | Step | Expected |
|---|---|---|
| J6.1 | Atlas, compare a record's `createdAt` and `expiresAt` | Exactly 24 hours apart |
| J6.2 | Atlas → Collections → `prices` → **Indexes** | An index on `expiresAt` with `expireAfterSeconds: 0` |
| J6.3 | A card on `/prices` | Shows "Expires in 23h" (or `m` / "Expiring soon" as it runs down) |

MongoDB's TTL monitor sweeps roughly once a minute, so an expired document is
removed shortly **after** `expiresAt`, not at the exact second. That is expected
behaviour, not a bug — it is a likely viva question.

### J7 — Seed and legacy records

| # | Step | Expected |
|---|---|---|
| J7.1 | `npm run seed` | `Seeded 8 records (demo Edit PIN: 1234)` |
| J7.2 | Edit a seeded card with PIN `1234` | Succeeds |
| J7.3 | Edit a seeded card with any other PIN | **403** "Incorrect edit PIN." |
| J7.4 | A record created before this feature (no `editPinHash`) | Still visible on the board; Edit/Delete returns **403** saying it predates Edit PINs |

The demo PIN `1234` is documented in the README and belongs to seed data only.
Real submissions use the PIN their reporter typed.

### J8 — Regression and fallback

| # | Step | Expected |
|---|---|---|
| J8.1 | Search, landing-site filter, average, lowest, highest | All still work |
| J8.2 | Add a new price | Still works |
| J8.3 | Stop the API, reload | Fallback banner appears; Edit/Delete buttons are **disabled** with "Editing is unavailable while demo data is being shown." |
| J8.4 | 375px width | Card buttons and both dialogs stack; no horizontal scrolling |
| J8.5 | Deployed site in Incognito | Full create → edit → delete cycle works against Railway + Atlas |

---

## Sign-off

| Suite | Local (Phase 4) | Deployed (Phase 6) |
|---|---|---|
| A — Server | ☐ | ☐ |
| B — Form & validation | ☐ | ☐ |
| C — List, search, filter | ☐ | ☐ |
| D — Navigation & 404 | ☐ | ☐ |
| E — Content & honesty | ☐ | ☐ |
| F — Responsive | ☐ | ☐ |
| G — Build & integration | ☐ | n/a |
| H — Deployed | n/a | ☐ |
| I — Failure & recovery | ☐ | ☐ |
| J — Edit PIN & expiry | ☐ | ☐ |

A suite with an untested row is an untested suite. If something fails, fix it and
**re-run the whole suite**, not only the failing row.
