# Negombo Fish Price Board

**SE3090 Mini Hackathon · Group SE_016**

Today's fish prices across Negombo landing sites, reported by the people who are there.

| | |
|---|---|
| **Live app** | `<vercel-url>` |
| **API** | `<railway-url>/api/prices` |
| **API health** | `<railway-url>/health` |
| **Demo video** | `<onedrive-link>` |
| **GitHub** | [Jani6969/Mini-Hackathon-SE-16](https://github.com/Jani6969/Mini-Hackathon-SE-16) |

---

## The Problem

Small-scale fishermen and buyers around Negombo need to make quick selling and
buying decisions, but price information from nearby landing sites is not always
available in one simple shared place at the moment they need it. A fisherman at
Negombo Main may want to compare the reported price for the same fish at Duwa
Landing or Pitipana before agreeing to a sale, while small buyers also benefit
from seeing recent reported prices across sites.

This project focuses on that **price-information gap** by giving users one public
place to report and compare recent fish prices across selected Negombo landing
sites.

**Affected users:** small-scale fishermen, small buyers and retail sellers using
Negombo Main, Duwa Landing and Pitipana.

## Our Solution

A shared, public price board. Any fisherman or buyer records today's price for a
fish type at their landing site. Anyone can search and filter to see what that
fish is selling for elsewhere in Negombo, plus the live average of the filtered
results, before agreeing a price.

> **Prototype notice:** the prices shipped with this hackathon build are
> sample/illustrative data. They are **not** official market quotations.

## Main Features

- Report today's price for a fish type at a landing site, through a validated form
- Browse all reported prices with live search by fish name
- Filter by landing site
- Live average price for the current filtered set
- Responsive layout for desktop and mobile
- 404 page for unknown routes

## Technologies Used

**Frontend** — React 18, Vite, React Router v6, plain CSS
**Backend** — Node.js, Express, Mongoose
**Database** — MongoDB Atlas (free M0)
**Hosting** — Vercel (frontend), Railway (backend)

Why these, specifically: the data is a flat set of independent price records with
no relational joins, so a document store fit the shape directly and removed the
schema-migration step from a four-hour build. Vercel serves a static Vite bundle
from a CDN; Railway runs the persistent Node process that holds the database
connection. Full reasoning in [`agent/DECISIONS.md`](agent/DECISIONS.md).

## AI Tools Used

Full exact prompt log: [`AI-PROMPT-LOG.md`](AI-PROMPT-LOG.md).

- **Codex** — generated and refactored application code. The team reviewed the
  diff, ran the app, tested validation and API behaviour, and modified the output
  where needed.
Every member can explain the code in the files they own.

## Architecture

```text
Browser → Vercel (React + Vite) → Railway (Express API) → MongoDB Atlas
                    HTTPS/JSON               Mongoose
```

Detail: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)

## Deployment Verification

- API health: `<railway-url>/health` → `status: ok`, `database: connected`
- API data: `<railway-url>/api/prices` → returns JSON
- Frontend tested in an incognito window
- Frontend tested on a phone using mobile data
- A price submitted from the deployed site was verified in MongoDB Atlas →
  Browse Collections → `prices`

## Team & Contributions

| Name | Student ID | Contribution |
|---|---|---|
| W.M.S.S.B. Wasala | IT24100559 | Integration, API layer, Express server, MongoDB Atlas, Railway + Vercel deployment, README |
| Karunathilaka K.D.J.C *(Group Leader)* | IT24100551 | Add Price form and client-side input validation |
| Fernando K.R.N | IT24101875 | Price list, search, landing-site filter, average calculation, 404 page |
| Samaranayaka S.G.V.S | IT23544154 | Landing page, problem content, navigation, responsive styling, sample data |

## Installation & Execution

### Backend

```bash
cd server
npm install
cp .env.example .env      # then set MONGO_URI
npm run seed              # expect: Seeded 8 records
npm run dev               # expect: MongoDB connected / API on 5000
```

`server/.env`:

```
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/fishprice?retryWrites=true&w=majority
PORT=5000
```

### Frontend

```bash
cd client
npm install
cp .env.example .env      # VITE_API_URL=http://localhost:5000
npm run dev
```

Open `http://localhost:5173`. The API must be running on port 5000, or the app
falls back to labelled sample data.

## API

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/` | liveness probe |
| `GET` | `/health` | API status + database connection state |
| `GET` | `/api/prices` | all price records, newest first |
| `POST` | `/api/prices` | create one price record |

All responses use the envelope `{ success, message, data }`.

## Repository Guide

| Path | What it is |
|---|---|
| [`START_HERE.md`](START_HERE.md) | orientation and reading order |
| [`agent/TODO.md`](agent/TODO.md) | the complete build checklist |
| [`agent/BRIEF.md`](agent/BRIEF.md) | full project brief and scope |
| [`agent/DECISIONS.md`](agent/DECISIONS.md) | why each technology was chosen |
| [`docs/requirements.md`](docs/requirements.md) | the 10 minimum requirements |
| [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) | Atlas → Railway → Vercel runbook |
| [`docs/TESTING.md`](docs/TESTING.md) | the manual test matrix |
| [`docs/TROUBLESHOOTING.md`](docs/TROUBLESHOOTING.md) | every known failure and its fix |
| [`AI-PROMPT-LOG.md`](AI-PROMPT-LOG.md) | mandatory AI prompt log |

## Limitations

Honest scope statement for a four-hour prototype:

- No authentication — anyone can submit a price, and there is no moderation
- No automated test suite; testing is the documented manual matrix
- No price history or trends over time
- Sample data is illustrative, not verified market data

Next, in priority order: price history, per-site trend comparison, and moderation
of reported prices.
