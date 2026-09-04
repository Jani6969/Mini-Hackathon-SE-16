# Rubric-to-Evidence Matrix

**100 marks.** This is the actual scoring checklist. Use it during the final 45
minutes.

> **Rubric rule:** when work sits between two bands, the marker awards the
> **lower** band. Do not assume a feature earns marks because the code exists —
> the marker must be able to **see the evidence quickly**. Remove ambiguity.

---

## The matrix

| # | Criterion | Marks | Evidence the marker must see | Where it comes from |
|---|---|---:|---|---|
| 1 | **Relevance of Sri Lankan problem** | 10 | Home page names Negombo, the three landing sites and the affected users; the price-information gap is stated clearly and specifically | `Home.jsx` · `agent/BRIEF.md` |
| 2 | **Practicality & creativity** | 15 | One focused workflow: report a price → search/filter → use the average as a reference. Explain *why* the scope fits four hours | Live demo + `agent/DECISIONS.md` |
| 3 | **Minimum functional requirements** | 20 | All 10 items in `docs/requirements.md`, live-tested in front of the marker | `docs/requirements.md` |
| 4 | **Quality & usability** | 15 | Clean responsive layout; loading, empty, error and offline states; semantic form; friendly client validation; server validation | `docs/TESTING.md` |
| 5 | **Effective use of technology & AI** | 10 | Justify React / Express / MongoDB / Vercel / Railway with reasons, not names. Show the AI prompt log. Every member explains their own code | `agent/DECISIONS.md` · `AI-PROMPT-LOG.md` |
| 6 | **Git repository & documentation** | 10 | Meaningful commits from **all four** members; complete README; deployed link + video link + contribution table | `docs/TEAM.md` · `README.md` |
| 7 | **Successful deployment** | 10 | Public Vercel link works in incognito; Railway `/health` shows the DB connected; the API returns JSON; a new record persists in Atlas | `docs/DEPLOYMENT.md` |
| 8 | **2-minute demonstration** | 5 | Problem → solution → validation → working feature → deployed URL → impact, **under two minutes** | `docs/VIVA.md` |
| 9 | **Contribution from all members** | 5 | Git commits + README contribution lines + each member ready for a live edit | `docs/TEAM.md` |

---

## Criterion-by-criterion: what moves you up a band

### 1 · Relevance of Sri Lankan problem (10)

**Low band:** "fish prices in Sri Lanka" — generic, could be anywhere.
**High band:** named district, named landing sites, named user groups, and a
specific decision the user is trying to make ("before agreeing a sale").

Say Negombo Main, Duwa Landing and Pitipana out loud. Name small-scale fishermen
and small buyers. State the moment of need.

⚠ **Do not invent statistics.** An unverifiable "40% price gap" is worse than no
number. If the team has genuinely observed or researched something, add it and say
where it came from.

### 2 · Practicality & creativity (15)

The creative move here is **restraint**, and you should say so: the workflow is one
loop — report, compare, decide — and every feature serves it. Explain that a
four-hour scope was chosen deliberately over a half-broken larger app.

### 3 · Minimum functional requirements (20)

The largest single block. Walk `docs/requirements.md` and demonstrate each item
live. Do not describe features — show them.

### 4 · Quality & usability (15)

The states are the differentiator. Most teams ship the happy path only. Show:
loading, empty search result, a validation error, the saving state, and the
offline banner. Each one is visible proof of care.

### 5 · Effective use of technology & AI (10)

Two halves.

**Technology:** justify with a *reason and a consequence*, not a name. "MongoDB
because the records are flat with no joins, so we skipped schema migration and
finished all ten requirements in the time available."

**AI:** the prompt log must contain **exact significant prompts**, and each row
must say **how the output was checked or modified**. "Reviewed the diff, ran the
app, tested validation" is the answer that earns the mark. Declaring AI use is
required; hiding it is the failure mode.

### 6 · Git repository & documentation (10)

`git log --oneline` is read by the marker. Conventional commits describing
features beat `update`, `fix2`, `final-final`. One giant dump commit reads as one
person doing everything.

The README must contain all ten items — see `README.md`.

### 7 · Successful deployment (10)

Four proofs, all fast:
1. `<railway>/health` → `status: ok`, `database: connected`
2. `<railway>/api/prices` → JSON in the browser
3. The Vercel link in **incognito**
4. Submit a record → it appears → refresh → still there → **show it in Atlas**

The Atlas step is what separates "it looks deployed" from "it is deployed".

### 8 · 2-minute demonstration (5)

Time it. **1:50–1:58.** Going noticeably over or under drops the band. Script in
`docs/VIVA.md`.

### 9 · Contribution from all members (5)

Three independent proofs: git commits under each member's own identity, a
contribution line per member in the README, and each member able to open their own
file and make a live edit on request.

---

## Fast self-audit — run this at 12:35

Score yourself honestly. Anything not a clear yes is a band you are about to lose.

- [ ] Can a stranger open the Vercel link on their phone and use the app?
- [ ] Does `/health` say `connected` **right now**?
- [ ] Can I show a record travelling from the form to Atlas in under 30 seconds?
- [ ] Does the home page name Negombo, the three sites, and the users?
- [ ] Can I show four validation errors in one click?
- [ ] Does `git log` show all four names with meaningful messages?
- [ ] Does the README have all ten items with working links?
- [ ] Does `AI-PROMPT-LOG.md` contain exact prompts and how each was checked?
- [ ] Is the video under 2:00 and openable without login?
- [ ] Can each member explain and edit their own file?

Ten yeses is a complete submission. Each no is a specific, fixable mark loss —
fix the cheapest one first.
