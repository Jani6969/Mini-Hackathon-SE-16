# Submission Pack

**Window: 12:25 – 12:55. Owner: Member A, signed off by the Group Leader
(Karunathilaka K.D.J.C).**

Upload by **12:55**, not 12:59.

---

## What gets submitted

| Item | Where | Owner |
|---|---|---|
| Public GitHub repository | github.com | A |
| Deployed application | Vercel | A |
| 2-minute demo video | OneDrive, sharing = anyone with the link | ALL |
| Submission PDF, renamed to the Group ID | CourseWeb | A + Leader |
| `AI-PROMPT-LOG.md` | in the repo **and** inside the PDF | A |

---

## Links — fill these in

| Thing | URL |
|---|---|
| GitHub repository | https://github.com/Jani6969/Mini-Hackathon-SE-16 |
| Vercel (live app) | https://negombo-fish-price-board.vercel.app |
| Railway API base | https://api-production-e135.up.railway.app |
| Health probe | https://api-production-e135.up.railway.app/health |
| Demo video (OneDrive) | |

---

## Submission PDF skeleton

Build the skeleton early; fill the links in at 12:45.

```
GROUP SE_016 · Negombo Fish Price Board

1. Git repository link:   https://github.com/…/negombo-fish-price-board
2. Deployed application:  https://….vercel.app
3. Demonstration video:   https://onedrive…

4. Team members and contributions
   IT24100559 · W.M.S.S.B. Wasala
        Integration, Express API, MongoDB Atlas, Railway + Vercel deployment,
        README and submission.
   IT24100551 · Karunathilaka K.D.J.C (Group Leader)
        Report Price form, controlled inputs, client-side input validation.
   IT24101875 · Fernando K.R.N
        Price list, search, landing-site filter, average calculation, 404 page.
   IT23544154 · Samaranayaka S.G.V.S
        Landing page and problem content, navigation, responsive stylesheet,
        sample data.

5. Problem & solution        (4–6 sentences — see agent/BRIEF.md)
6. Technologies & AI tools   (see README)
7. AI Prompt Log             tool | exact prompt | purpose | how output was checked
8. Deployment evidence       Atlas screenshot showing the submitted record
```

**Contribution lines must be in the team's own words.** Copy-pasted generic text
reads as such.

Rename the file to the **Group ID** before uploading.

---

## Video

Full script in `docs/VIVA.md` §1. Target **1:50–1:58**.

- [ ] Recorded, watched back once
- [ ] Under 2:00
- [ ] Uploaded to OneDrive
- [ ] Sharing set to **anyone with the link**
- [ ] Link tested in an **incognito window** — a login wall counts as no video
- [ ] Link added to the README and the PDF

---

## Final 10-minute pre-submission checklist

Run this at 12:45. Every box, in order. This is the last gate.

**Deployment**
- [ ] Vercel URL works in a normal window
- [ ] Vercel URL works in **incognito**
- [ ] Vercel URL works on a **phone using mobile data**
- [ ] Railway `/health` → `status: ok`, `database: connected`
- [ ] Railway `/api/prices` → JSON
- [ ] Submit a fresh record → visible in the app → survives refresh → visible in Atlas

**Application**
- [ ] Empty and bad form inputs show friendly errors
- [ ] Search + filter + average work together
- [ ] `/random-url` shows the 404 page
- [ ] No horizontal scroll at phone width
- [ ] Home page states the problem, the solution, the affected users, and the
      prototype notice
- [ ] All 10 minimum requirements in `docs/requirements.md` are ticked

**Documentation**
- [ ] README contains every required item, all links clickable
- [ ] `AI-PROMPT-LOG.md` contains exact significant prompts, secrets redacted
- [ ] README **and** PDF both declare AI usage
- [ ] The repository is **public**

**Contribution**
- [ ] `git shortlog -sn --all` shows all four members
- [ ] GitHub → Insights → Contributors shows all four
- [ ] Each member has rehearsed a live edit in their own file

**Security**
- [ ] `git log -p | grep -i "mongodb+srv"` returns **nothing**
- [ ] `git ls-files | grep -E "\.env$"` returns **nothing**

**Submission**
- [ ] Video link opens without a login
- [ ] PDF contains repo link, deployed link, video link, members and IDs,
      problem/solution, technologies/AI tools, prompt log
- [ ] PDF renamed to the Group ID
- [ ] Uploaded to CourseWeb **before 12:55**
- [ ] Upload confirmed in CourseWeb and re-downloaded once to check it is not corrupt

**Final rule:** once this checklist passes, **stop touching the code.**

---

## Wall card — write this on paper

```
┌──────────────────────────────────────────────┐
│  SCOPE LOCKED 09:20  ·  BUILD STOP 11:55     │
│  Railway 11:55 · Vercel 12:10 · Video 12:45  │
│  CourseWeb 12:55  (not 12:59)                │
│                                              │
│  API down at 12:20 → fallback already coded  │
│  Test: INCOGNITO + PHONE ON 4G               │
│  Prove DB: submit → Atlas → refresh          │
│  Meaningful feature commits, ALL FOUR        │
│  AI PROMPT LOG = mandatory                   │
│  Between two bands → marker gives the LOWER  │
└──────────────────────────────────────────────┘
   PROBLEM → SHIP → PROVE
   ප්‍රශ්නය කියන්න · deploy කරන්න · commit වලින් ඔප්පු කරන්න
```
