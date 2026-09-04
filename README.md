# Negombo Fish Price Board

**SE3090 Mini Hackathon · Group SE_016**

Live app: _pending deploy_
API: http://127.0.0.1:5052/api/prices
Demo video: _pending_

## The Problem

Small-boat fishermen in Negombo land their catch before dawn and must sell it immediately. They have no way to know what the same fish is fetching at nearby landing sites such as Duwa or Pitipana, so the same Balaya can sell for Rs. 880 at one site and Rs. 950 at another on the same morning.

## Our Solution

A shared public price board. Anyone records today's price for a fish type at their landing site. Anyone can search, filter, and see the live average before agreeing a price.

## Main Features

- Report today's price for a fish type at a landing site (validated form)
- Browse reported prices with live search by fish and filter by landing site
- Live average price for the current filtered set
- Responsive layout for desktop and mobile
- 404 page for unknown routes

## Technologies Used

React 18, Vite, React Router v6, plain CSS · Node.js, Express, Mongoose · MongoDB Atlas · Vercel (frontend), Railway (backend)

## AI Tools Used

- Cursor (Grok) — generated React pages, Express routes, and MongoDB connection code; we checked validation, filters, and the live Atlas connection.
- Full prompt log: `AI-PROMPT-LOG.md`

## Team & Contributions

| Name | Student ID | Contribution |
|---|---|---|
| Ranidu Fernando | IT24101875 | Price list search/filter/average, 404 page, UI, API wiring on this branch |
| | IT24100551 | |
| | IT24100559 | |
| | IT23544154 | |

## Installation & Execution

### Backend

```bash
cd server
npm install
# create .env from .env.example with MONGO_URI and PORT=5052
npm run seed
npm run start
```

### Frontend

```bash
cd client
npm install
# create .env with VITE_API_URL=http://127.0.0.1:5052
npm run dev
```

Then open http://localhost:5173
