# Team, Ownership & Commit Plan

**Group SE_016 · 4 members.** Worth 5 marks directly ("contribution from all
members") and it underpins the 10-mark git/documentation criterion.

> The mechanism that makes this work is **file-level ownership**: no two members
> edit the same file. That removes merge conflicts *and* produces per-member git
> evidence automatically, instead of something to reconstruct at 12:40.

---

## Members

| Code | Name | Student ID | GitHub username | Role |
|---|---|---|---|---|
| **A** | W.M.S.S.B. Wasala | IT24100559 | _TBD_ | Integration, API layer, Git & deployment |
| **B** | Karunathilaka K.D.J.C **(Group Leader)** | IT24100551 | _TBD_ | Add Price form + validation |
| **C** | Fernando K.R.N | IT24101875 | _TBD_ | Price list, search, filter, calculate, 404 |
| **D** | Samaranayaka S.G.V.S | IT23544154 | _TBD_ | Landing page, navigation, responsive CSS, sample data |

> **Group Leader is Karunathilaka K.D.J.C (Member B).** Member A owns the
> deployment and merge duties by role, not by seniority — the leader signs off on
> submission and owns the CourseWeb upload. Fill in the four GitHub usernames at
> T0.1.

⚠ Every member runs this on their own machine **before the first commit**, or
their work is attributed to someone else:

```bash
git config user.name "Full Name"
git config user.email "IT24xxxxxx@my.sliit.lk"
```

Per member:

```bash
# A
git config user.name "W.M.S.S.B. Wasala"        && git config user.email "it24100559@my.sliit.lk"
# B (Group Leader)
git config user.name "Karunathilaka K.D.J.C"    && git config user.email "it24100551@my.sliit.lk"
# C
git config user.name "Fernando K.R.N"           && git config user.email "it24101875@my.sliit.lk"
# D
git config user.name "Samaranayaka S.G.V.S"     && git config user.email "it23544154@my.sliit.lk"
```

Confirm the email domain matches what SLIIT actually issues before using it.

Verify: `git config user.name && git config user.email`.

---

## File ownership — nobody else edits these

| Member | Owns | Must not touch |
|---|---|---|
| **A** | `server/**` (all), `client/src/App.jsx`, `client/src/api/priceApi.js`, `README.md`, `AI-PROMPT-LOG.md`, deployment config | page UI, form fields, list layout, CSS |
| **B** | `client/src/pages/AddPrice.jsx` | the API call itself (that is A's `priceApi.js`), styling beyond the shared CSS classes |
| **C** | `client/src/pages/PriceList.jsx`, `client/src/pages/NotFound.jsx` | data fetching (arrives as a prop), the form |
| **D** | `client/src/pages/Home.jsx`, `client/src/components/Navbar.jsx`, `client/src/index.css`, `client/src/data/sampleData.js` | any page logic |

Need a change in someone else's file? **Ask them to make it.** A three-line edit is
not worth a merge conflict in `index.css` at 11:30.

---

## Definition of done, per member

### Member A — Integration, API, Git & deployment

**Done when:** the Vercel link opens in incognito on mobile data and shows live
data from Railway; `/health` reports API + DB status; a newly submitted record is
visible in MongoDB Atlas; the README is complete; the AI declaration and prompt log
are complete; the PDF is uploaded.

**Covers:** the deployment criterion (10), git & documentation (10), and the API
half of requirement 5.

### Member B — Add Price form + validation

**Done when:** submitting empty shows four friendly messages; `abc` in price shows
a number error; `50000` shows a range error; a valid submit navigates to `/prices`
and the new record is at the top.

**Covers:** requirements **4** (form) and **5** (validation).

### Member C — List, search, filter, average, 404

**Done when:** typing narrows the list live; changing the site filters correctly;
both together work; the average recalculates; an unknown URL shows the 404 page.

**Covers:** requirements **3** (second feature) and **6** (search/filter/calculate),
and part of **8** (404).

### Member D — Landing page, navigation, responsive, sample data

**Done when:** the problem paragraph is visible on the home page; navigation works
on all pages; the layout is usable on a phone with no horizontal scroll.

**Covers:** requirements **1**, **2**, **7**, **8**, **9**, **10**.

---

## Commit plan

Conventional commits, one per finished feature, under the member's own identity.

### Member A
```bash
git commit -m "chore: scaffold React and Express applications"
git commit -m "feat(api): add MongoDB price read/create endpoints with validation"
git commit -m "feat(integration): connect React client to API with labelled offline fallback"
git commit -m "docs: complete README and deployment evidence"
```

### Member B
```bash
git commit -m "feat(form): add price reporting form"
git commit -m "feat(validation): add friendly client-side validation"
```

### Member C
```bash
git commit -m "feat(prices): add price list search and market filter"
git commit -m "feat(prices): calculate average for filtered results"
git commit -m "feat(routing): add not-found page"
```

### Member D
```bash
git commit -m "feat(home): add local problem solution and user context"
git commit -m "feat(nav): add application navigation"
git commit -m "style: add responsive desktop and mobile layout"
```

**Never commit:** `update`, `fix`, `fix2`, `final`, `final-final`, `asdf`, or one
giant dump commit at 11:50. The marker reads `git log --oneline`, and a single
dump commit reads as one person doing everything.

---

## Working agreement

1. **Pull before you start**, push when a feature is done. Do not sit on work.
2. **Never commit `.env`, `node_modules/` or `dist/`.** They are gitignored —
   verify with `git status` before every commit.
3. **B, C and D are never blocked by the API.** They work against props and
   `sampleData.js`. If the API is down, keep building.
4. **Only A merges to `main`** and only A touches Atlas, Railway and Vercel.
5. **Only A runs `npm run seed`**, and never after Phase 6 — it calls
   `deleteMany({})` and would wipe the demo record.
6. **Log AI prompts as you go** in `AI-PROMPT-LOG.md`. Backfilling at 12:40 is how
   teams lose that mark.
7. **Build stop is 11:55.** After that: deploy, verify, document, rehearse.

---

## Contribution verification — run at Phase 7

```bash
# every author with a commit count
git shortlog -sn --all

# every commit with its author
git log --pretty=format:"%an  %s"
```

Also check **GitHub → Insights → Contributors** shows all four.

**If a member has no commits**, fix it honestly and immediately: have them make a
real change in their own file — a validation message, a CSS value, a Home page
sentence, an added fish in the dropdown — and commit it under their own identity.
Do not fabricate history, and do not have one person commit "on behalf of"
another. An empty contributor costs the whole 5-mark criterion.

---

## Live-edit readiness (spec §2.4)

The evaluator can ask any member to **open their own file and make a live edit**.
Every member rehearses this once at 12:50, then undoes the change.

| Member | A safe live edit |
|---|---|
| A | Change the `/health` response, or the API "running" message |
| B | Change a validation message, or the max price threshold |
| C | Change the empty-state text, or the summary wording |
| D | Change the primary colour, or add a fish to the dropdown list |

Each member must also be able to answer **why** their code is written that way —
see `docs/VIVA.md` for the memorised answers.
