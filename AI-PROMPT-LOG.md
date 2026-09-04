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
