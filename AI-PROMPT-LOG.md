# AI Prompt Log — Group SE_016

Mandatory log (spec §2.2). Redact secrets. Record tool, exact prompt, purpose, and how output was checked.

---

## Member C — IT24101875

| Field | Detail |
|---|---|
| **Tool** | Cursor (Grok) |
| **Purpose** | Implement the price list (search, filter, live average, empty state) and the 404 page on branch `it24101875`. |
| **Exact prompt (summary)** | Read the SE3090 Mini Hackathon specification PDF, check the Negombo Fish Price Board plan against the ten minimum requirements, then implement only Member C files on branch `it24101875`. |
| **Output received** | `client/src/pages/PriceList.jsx` and `client/src/pages/NotFound.jsx`. |
| **How it was checked / modified** | Matched the locked plan: live text search on fish name, landing-site dropdown, combined filters, derived average of the filtered set, empty-state message, `key={p._id}`, and a `*` 404 route page with a link home. Added safe defaults (`prices = []`) and number coercion so a missing/invalid price does not crash the average. No API fetch was added (owned by Member A). |

| Field | Detail |
|---|---|
| **Tool** | Cursor (Grok) |
| **Purpose** | Add MongoDB connection layer and Express API so price records can be stored in Atlas. |
| **Exact prompt (summary)** | Help with the MongoDB database connections for the Negombo Fish Price Board. |
| **Output received** | `server/db.js`, `server/server.js`, `server/models/Price.js`, `server/routes/priceRoutes.js`, `server/seed.js`, `server/.env.example`. |
| **How it was checked / modified** | Connection is isolated in `db.js`. Collaborator Atlas cluster connected and 8 records were seeded. Local API served on port 5052 because macOS AirPlay uses 5000. |

| Field | Detail |
|---|---|
| **Tool** | Cursor (Grok) |
| **Purpose** | Build the React UI (landing page, navigation, form, price cards, responsive CSS) and wire it to the live API. |
| **Exact prompt (summary)** | Proceed with the UI/UX implementation. |
| **Output received** | Vite client scaffold, Home, Navbar, AddPrice, PriceList, NotFound, `index.css`, `priceApi.js`, sample data. |
| **How it was checked / modified** | Kept plan class names and Member C list logic. Added coastal styling, active nav, empty/loading states, and API fallback to sample data if the server is down. |
