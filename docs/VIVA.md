# Viva & Demonstration Pack

Three things live here: the **2-minute video script**, the **live evaluation
flow**, and the **memorised answer sheet**. Every member reads all of it and
memorises their own row.

---

## 1 · Two-minute video script

Target **1:50–1:58**. Going noticeably over or under two minutes drops the
demonstration band (5 marks).

| Time | Say / show |
|---|---|
| 0:00–0:15 | Group ID and the four names. "Negombo Fish Price Board." |
| 0:15–0:35 | **The problem** — small-scale fishermen and buyers need a quicker shared reference for reported prices across Negombo Main, Duwa Landing and Pitipana. *Do not claim the sample prices are verified market facts.* |
| 0:35–0:50 | **The solution** in one sentence. Show the home page. |
| 0:50–1:20 | **Live:** open Report Price → submit empty → four errors → type `abc` → number error → fill correctly → submit → the new record appears at the top. |
| 1:20–1:40 | **Live:** search `Bala` → the list narrows → filter to Pitipana → the average recalculates. |
| 1:40–1:50 | Show the **Vercel URL in the address bar**. Resize, or show it on a phone. |
| 1:50–2:00 | **Impact:** a fisherman quoting the going rate at the next site is negotiating with information instead of guessing. |

**Recording checklist**

- [ ] Rehearse once before recording
- [ ] Screen legible, audio audible
- [ ] Under 2:00 — time it
- [ ] Watch it back once
- [ ] Uploaded to OneDrive
- [ ] Sharing set to **anyone with the link**, tested in incognito. A
      login-walled video counts as no video.

---

## 2 · Live evaluation flow (if the panel gives you a live window)

Same content, same clock, different order — this one is optimised for questions.

| Time | Show |
|---|---|
| 0:00–0:10 | **Problem** — the specific Negombo users and the price-information gap |
| 0:10–0:20 | **Architecture** — React/Vercel to Express/Railway to MongoDB Atlas |
| 0:20–0:45 | **Validation** — empty submit, bad price, friendly errors |
| 0:45–1:10 | **Core flow** — a valid report appears in Prices |
| 1:10–1:30 | **Search / filter / average** — combine both filters |
| 1:30–1:50 | **Database proof** — refresh Atlas and show the persisted record |
| 1:50–2:00 | **Responsive + deployment** — public URL, narrow/mobile view |
| — | **Impact** — one sentence on better price visibility |

Keep git, README and the AI log ready in tabs for questions rather than spending
demo time scrolling through them.

**Tab order before you start:**
1. The deployed Vercel app
2. `<railway>/health`
3. MongoDB Atlas, Browse Collections, `prices`
4. GitHub repo (commits + README)

---

## 3 · The stack answer — everyone memorises this

> We used React with Vite on Vercel, and an Express API with MongoDB Atlas on
> Railway. **Because** the data is a flat set of price records with no relational
> joins, a document store fit the shape directly and let us skip schema migration
> in a four-hour build. **Consequence:** we finished all ten functional
> requirements with less setup risk, and could spend the limited session on a
> working public prototype instead of configuration.

Note the shape: **decision, because, consequence.** Use it for every answer.
Naming a technology scores nothing; justifying it scores.

---

## 4 · Answer sheet — memorise your own row

### Member A — Integration, API, deployment

| Question | Answer |
|---|---|
| **Where does state live?** | In `App.jsx`. It fetches once on mount and passes the array down as props — one-way data flow, single source of truth. New records are prepended to state after the API confirms, so the list updates without a refetch. |
| **What happens if the API is down?** | The fetch falls back to clearly labelled demonstration data, so the UI stays explorable. The banner states that fallback entries are not persisted, so we do not misrepresent demo data as live database data. |
| **Why MongoDB over SQL?** | The records are flat and independent with no joins. A document store meant no schema migration step, which mattered given the four-hour limit. With relational data we would have chosen PostgreSQL. |
| **Why two hosting platforms?** | Vercel serves a static Vite bundle from a CDN, which is what a built SPA wants. Railway runs a persistent Node process holding a database connection, which is what Express wants. Serverless would reopen the Mongo connection on cold starts. |
| **Walk me through a request.** | The browser calls `GET /api/prices` on the Railway domain. Express passes it to the route, Mongoose queries Atlas sorted by `createdAt` descending, and the response comes back in a `{ success, message, data }` envelope. |
| **How do you know it is really deployed?** | `/health` reports the API status and the database connection in one URL. Then I submit a record on the live site and show the same document in Atlas. |

### Member B — Form and validation

| Question | Answer |
|---|---|
| **Show me your validation.** | *(Live)* Empty submit gives four messages. `abc` gives a number error. `50000` gives a range error. Errors clear as you type. Client-side for instant feedback, **and** Mongoose schema rules server-side so the API cannot be bypassed. |
| **Why validate twice?** | Client validation is for user experience — no round trip. Server validation is for correctness, because the API is public and anyone can POST directly with `curl`. Neither replaces the other. |
| **Why a real form element and `preventDefault()`?** | It preserves form semantics — Enter submits, labels are associated with inputs, screen readers work — while `preventDefault()` stops the browser reloading and losing the submission. |
| **Why does the max price exist?** | Rs. 10,000 per kilo is above any realistic price here, so a larger number is almost certainly a typo — someone entering a total instead of a per-kilo price. Catching it protects the average from one bad row. |
| **Why do errors clear on typing?** | An error that persists while the user is fixing it reads as "still wrong". Clearing on change gives immediate feedback that they are on the right track. |

### Member C — List, search, filter, average, 404

| Question | Answer |
|---|---|
| **How does the search work?** | `search` and `market` are React state. On every render the array is filtered against both, so the list is **derived state** — there is no separate copy to keep in sync. |
| **Why `key={p._id}`?** | React uses the key to match elements between renders. An array index breaks when the list reorders or an item is inserted at the top — which ours does, since new reports are prepended. `_id` is stable. |
| **How is the average calculated?** | It is the mean of the **currently filtered** set, not the whole dataset, rounded to a whole rupee — so filtering to one landing site gives that site's average. There is a guard for an empty set so it shows 0 rather than `NaN`. |
| **What if nothing matches?** | An explicit empty state — "No prices found for that search." An empty screen looks broken; a sentence does not. |
| **How does the 404 work?** | React Router's `*` route catches any path that matches nothing else, and renders a page with a link home. On Vercel a `vercel.json` rewrite serves `index.html` for every path, so a hard refresh on a deep link still reaches the router. |

### Member D — Home, navigation, responsive, sample data

| Question | Answer |
|---|---|
| **Is it responsive?** | *(Open the deployed link on a phone.)* The card grid uses `repeat(auto-fit, minmax(240px, 1fr))`, so columns reflow automatically with no per-breakpoint rules, and the nav stacks below 600px. |
| **Where is the problem explained?** | On the landing page — three sections covering the problem, the solution and who it helps, so a first-time visitor understands the context before using the tool. It is in the app, not only the README. |
| **Are these real prices?** | No. They are illustrative sample data for a prototype, and the home page says so in a visible notice. We deliberately did not present them as official market quotations. |
| **Why no UI framework?** | Zero install, zero config risk, and a small bundle. Our users are on cheap phones on mobile data, so a framework bundle costs them and buys us nothing at this size. |
| **Why these fish and sites?** | Real Sinhala names for fish actually landed at Negombo, and the three landing sites the app targets. Balaya appears at two sites deliberately — that is what makes the compare-across-sites feature demonstrable. |

---

## 5 · Harder questions — be ready

| Question | Honest answer |
|---|---|
| **Anyone can post a fake price. Isn't that a problem?** | Yes, and it is the first thing we would add. This is a prototype scoped to four hours, so there is no moderation or accounts. In a real deployment we would add reporter accounts and flagging. |
| **Where are your tests?** | There is no automated suite — we spent the time on the working deployment. What we do have is a documented manual test matrix in `docs/TESTING.md`, run twice: locally and against production. With more time: Vitest for the validation and filter logic, Supertest for the two endpoints. |
| **Why is the database open to `0.0.0.0/0`?** | Railway's free tier has no stable outbound IP, so an allow-list is not possible. The credential is the only control. It is acceptable for a throwaway cluster of illustrative data and is explicitly **not** a production posture — production would use a private endpoint or VPC peering. |
| **What did AI write?** | *(Point to `AI-PROMPT-LOG.md`.)* We logged the exact significant prompts and, for each, how we checked the output — reviewed the diff, ran the app, tested the behaviour, and changed what did not fit. Every member can explain the code in their own file. |
| **What would you build next?** | Price history over time, per-site trend comparison, and moderation of reported prices. In that order, because the first two make the data more useful and the third makes it trustworthy. |
| **Why so few features?** | Deliberate. The rubric rewards a complete, reliable core, and an extra feature that breaks the deployment is negative value in a four-hour build. We scoped to one workflow and finished it. |

---

## 6 · Rules for answering

1. **Decision, because, consequence.** Never just name a technology.
2. **Show, do not describe.** If it is on screen in ten seconds, show it.
3. **Never claim the sample prices are real.** Integrity beats polish.
4. **"We did not do that, and here is why"** is a strong answer. Bluffing is not.
5. **Answer for your own file.** Do not answer over a teammate — the marker is
   checking that all four understand their work.
