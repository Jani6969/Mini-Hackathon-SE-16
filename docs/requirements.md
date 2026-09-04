# Requirements — Negombo Fish Price Board

Two lists live here: the **10 minimum functional requirements** the assessment
demands, and the **validation rules** that must match on both the client and the
server.

Nothing may be built that is not on these lists until every item is ticked and
live-demonstrable. See `agent/BRIEF.md` → Excluded.

---

## The 10 minimum functional requirements

Each row names the file that satisfies it, the owner, and — most importantly —
**what the marker must be able to see**. A requirement that exists in code but
cannot be demonstrated in 10 seconds scores as if it were missing.

| # | Requirement | Where it lives | Owner | Evidence to show |
|---|---|---|---|---|
| 1 | **Landing / main UI** | `client/src/pages/Home.jsx` | D | The deployed URL opens straight onto a clean home page |
| 2 | **Problem explained inside the app** | `Home.jsx` — Problem / Solution / Who It Helps sections | D | Scroll the home page. Not the README, not the PDF — **in the running app** |
| 3 | **At least two functional features** | `AddPrice.jsx` + `PriceList.jsx` | B, C | (a) report a price, (b) search / filter / average |
| 4 | **User input form** | `client/src/pages/AddPrice.jsx` | B | Four labelled fields, semantic `<form>`, submit button |
| 5 | **Input validation** | `AddPrice.jsx` + `server/models/Price.js` | B, A | Empty submit → 4 messages · `abc` → number error · `50000` → range error · 2-char name → length error |
| 6 | **Display / search / filter / calculate** | `client/src/pages/PriceList.jsx` | C | Type to search, change the dropdown, watch the average recalculate |
| 7 | **Responsive desktop + mobile** | `client/src/index.css` | D | Open on a phone, or resize to 320px. No horizontal scroll |
| 8 | **Basic navigation** | `Navbar.jsx` + `NotFound.jsx` | D, C | Home / Prices / Report Price links work on every page; `/random-url` shows the 404 page |
| 9 | **Relevant sample data** | `client/src/data/sampleData.js` + `server/seed.js` | D, A | 8 records with real Sinhala fish names, **clearly labelled illustrative** |
| 10 | **Value to Sri Lankan users** | `Home.jsx` + the demo impact sentence | D, ALL | Named landing sites, named affected users, one clear impact sentence |

**Do not build new features until all ten boxes are checked.**

---

## Validation rules — must be identical on both sides

Client rules live in `AddPrice.jsx` → `validate()`.
Server rules live in `server/models/Price.js` as Mongoose schema constraints.

| Field | Rule | Client message | Server constraint |
|---|---|---|---|
| `fish` | required | "Please select a fish type." | `required: [true, 'Fish type is required']` |
| `market` | required | "Please select a landing site." | `required: [true, 'Landing site is required']` |
| `price` | required | "Please enter today's price per kilo." | `required: [true, 'Price is required']` |
| `price` | numeric and > 0 | "Price must be a number greater than 0." | `min: [1, 'Price must be greater than 0']` |
| `price` | ≤ 10000 | "That looks too high — please check the price per kilo." | `max: [10000, 'Price looks too high for one kilo']` |
| `seller` | required | "Please enter your name." | `required: [true, 'Reporter name is required']` |
| `seller` | ≥ 3 characters | "Name must be at least 3 characters." | `minlength: [3, 'Name must be at least 3 characters']` |
| `date` | defaults to today | — | `default: () => new Date().toISOString().slice(0, 10)` |

**Why twice?** Client validation is for user experience — instant feedback with no
round trip. Server validation is for correctness — the API is public, so anyone
can POST directly with `curl` and bypass the browser entirely. Neither replaces
the other. This is a viva question; see `docs/VIVA.md`.

---

## Behavioural requirements

Beyond the ten, these are what separates a "quality & usability" band from the one
below it.

- [ ] **Loading state** — "Loading prices..." renders before data arrives
- [ ] **Empty state** — "No prices found for that search." when a filter matches nothing
- [ ] **Error state** — the server's rejection message renders in the form
- [ ] **Offline state** — a visible banner when the API is unreachable, stating
      explicitly that entries are not persisted
- [ ] **Saving state** — the submit button disables and reads "Saving..." in flight
- [ ] **Errors clear as the user types** in the field they are fixing
- [ ] **Semantic form** — every input has a `<label htmlFor>` matching its `id`
- [ ] **Enter key submits** the form (a consequence of using a real `<form>`)
- [ ] **New records appear at the top** of the list, without a refetch
- [ ] **`key={p._id}`** on the mapped list — never the array index
- [ ] **No horizontal scroll** at 320px
- [ ] **16px inputs** so iOS Safari does not zoom on focus

---

## Data requirements

- Exactly **three landing sites**: `Negombo Main`, `Duwa Landing`, `Pitipana`.
- **Seven fish types** in the dropdown, each with the Sinhala name and the English
  name in brackets: Balaya (Skipjack), Kelawalla (Yellowfin), Hurulla,
  Thalapath (Seer), Isso (Prawns), Paraw (Trevally), Koduwa (Barramundi).
- **Eight seed records** spanning all three sites, including the same fish
  (Balaya) at two different sites — this is what makes the search-and-compare
  feature demonstrable.
- All prices are Rs. per kilogram.
- Sample values are **illustrative**. They must never be described as official or
  verified current market quotations, in the app, the README, the video or the viva.

---

## Non-requirements

Explicitly out of scope. Building any of these costs time and earns nothing:

authentication · login · user accounts · admin panel · moderation · maps ·
geolocation · notifications · email · SMS · AI features · chatbot ·
`GET /:id` · `PUT` · `DELETE` · charts · price history · trends over time ·
image upload · multiple databases · caching · Docker · dark mode ·
UI redesign once the interface is clean and responsive.

If everything above is finished, deployed, documented and rehearsed **and** time
remains, the honest answer to "what next?" is: price history over time, per-site
trend comparison, and moderation of reported prices.
