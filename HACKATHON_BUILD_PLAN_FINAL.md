# Negombo Fish Price Board — SE3090 Mini Hackathon FINAL Build Plan

**Group SE_016 · 4 Members · Rubric-aligned build plan · Build stop 11:55 · Submit 12:55**

> **Primary rule:** ship a small, working, publicly reachable solution. Do not add optional features until every minimum requirement, deployment check, README item, AI declaration, and team-contribution proof is complete.

---

## 1. Project Identity

| Field | Value |
|---|---|
| **Repo name** | `negombo-fish-price-board` |
| **Project title** | Negombo Fish Price Board — Daily Landing-Site Price Transparency |
| **Tagline** | Today's fish prices across Negombo landing sites, reported by the people who are there. |
| **Sri Lankan problem area** | Small-business digitalization / agriculture & fisheries |

### Problem statement — use this wording unless you have stronger verified evidence

Small-scale fishermen and buyers around Negombo need to make quick selling and buying decisions, but price information from nearby landing sites is not always available in one simple shared place at the moment they need it. A fisherman at Negombo Main may want to compare the reported price for the same fish at Duwa Landing or Pitipana before agreeing to a sale, while small buyers also benefit from seeing recent reported prices across sites.

This project focuses on that **price-information gap** by giving users one public place to report and compare recent fish prices across selected Negombo landing sites. It is deliberately scoped as a four-hour prototype rather than an official market-pricing system.

**Affected users named:** small-scale fishermen, small buyers and retail sellers using Negombo Main, Duwa Landing and Pitipana.

> **Evidence rule:** if the team has personally observed, researched, or can cite stronger facts about the local problem, add them. Do **not** present invented price gaps, storage claims, or sample values as verified current facts.

### Solution

A shared, public price board. Any fisherman or buyer records today's price for a
fish type at their landing site. Anyone can search and filter to see what that
fish is selling for elsewhere in Negombo, plus the live average, before agreeing
a price.

---

## 2. Stack (say exactly this in the viva)

| Layer | Technology | One-line justification |
|---|---|---|
| Frontend | **React 18 + Vite** | Component-based UI, instant dev server, fast production build |
| Routing | **React Router v6** | Client-side navigation, no page reloads, `*` route for 404 |
| Styling | **Plain CSS** (CSS Grid + one media query) | No build step, no config risk, fully responsive |
| Backend | **Node.js + Express** | Minimal REST API, ~80 lines, nothing to learn under time pressure |
| Database | **MongoDB Atlas** (free M0 cluster) | Document model matches our flat price records; no schema migration needed in a 4-hour build |
| ODM | **Mongoose** | Schema + validation in one place, server-side validation for free |
| Frontend host | **Vercel** | Zero-config static hosting, deploys straight from GitHub |
| Backend host | **Railway** | Runs a Node process with environment variables, free tier |
| AI tools | **Codex / ChatGPT / Claude — only tools actually used** | Exact prompts logged; output reviewed, tested and declared in README + PDF |

**Architecture in one sentence:** React SPA on Vercel calls a REST API on Railway,
which reads and writes documents in MongoDB Atlas.

```
Browser ──HTTPS──> Vercel (React SPA)
                       │  fetch /api/prices
                       ▼
                   Railway (Express REST API)
                       │  Mongoose
                       ▼
                   MongoDB Atlas (cloud)
```

---

## 3. Repository Structure

```
negombo-fish-price-board/
│
├── client/                       # React + Vite frontend  → Vercel
│   ├── src/
│   │   ├── api/priceApi.js       # ALL fetch calls, one file
│   │   ├── components/Navbar.jsx
│   │   ├── data/sampleData.js    # fallback data
│   │   ├── pages/Home.jsx
│   │   ├── pages/AddPrice.jsx
│   │   ├── pages/PriceList.jsx
│   │   ├── pages/NotFound.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env                      # VITE_API_URL
│   ├── index.html
│   └── package.json
│
├── server/                       # Express + Mongoose  → Railway
│   ├── models/Price.js
│   ├── routes/priceRoutes.js
│   ├── seed.js
│   ├── server.js
│   ├── .env                      # MONGO_URI  (gitignored)
│   └── package.json
│
├── AI-PROMPT-LOG.md              # MANDATORY (spec §2.2)
├── .gitignore
└── README.md
```

---

## 4. The Four Components — Owner, Scope, Definition of Done

### Member A — Integration, API layer, Git & Deployment
**Owns:** `client/src/App.jsx`, `client/src/api/priceApi.js`, `server/` (all),
`README.md`, both deployments, final submission PDF.

**Scope — in:** repo setup, Atlas cluster, Express API, Railway deploy, Vercel
deploy, state management in App.jsx, merging everyone's work, README, PDF.
**Scope — out:** page UI, form fields, list layout.

**Done when:** Vercel link opens in incognito on mobile data and shows live data
from Railway; `/health` reports API + DB status; a newly submitted record is visible
in MongoDB Atlas; README is complete; AI declaration/prompt log are complete; PDF uploaded.

---

### Member B — Add Price form + validation
**Owns:** `client/src/pages/AddPrice.jsx` only.

**Scope — in:** controlled inputs, per-field validation, friendly error messages,
errors clearing as the user types, calling `onAdd` and redirecting to the list.
**Scope — out:** the API call itself (that's A's `priceApi.js`), styling beyond
the shared CSS classes.

**Done when:** submitting empty shows four friendly messages; `abc` in price
shows a number error; `50000` shows a range error; a valid submit navigates to
`/prices` and the new record is at the top.

Covers requirements **4** (form) and **5** (validation).

---

### Member C — Price list, search, filter, calculate, 404
**Owns:** `client/src/pages/PriceList.jsx`, `client/src/pages/NotFound.jsx`.

**Scope — in:** render the price cards, text search on fish name, dropdown filter
by landing site, live average price of the filtered set, empty-state message,
`key={p._id}` on the mapped list.
**Scope — out:** fetching data (arrives as a prop), the form.

**Done when:** typing narrows the list live; changing the site filters correctly;
both together work; the average recalculates; an unknown URL shows the 404 page.

Covers requirements **3** (second feature) and **6** (search/filter/calculate).

---

### Member D — Landing page, problem content, navigation, responsive, sample data
**Owns:** `client/src/pages/Home.jsx`, `client/src/components/Navbar.jsx`,
`client/src/index.css`, `client/src/data/sampleData.js`.

**Scope — in:** landing page with the problem and solution written **inside the
app**, nav links to all three pages, the whole stylesheet, mobile breakpoint,
8–10 realistic sample records with real Sinhala fish names.
**Scope — out:** any page logic.

**Done when:** the problem paragraph is visible on the home page; nav works on
all pages; the layout is usable on a phone with no horizontal scroll.

Covers requirements **1** (landing page), **2** (problem in app), **7**
(responsive), **8** (navigation), **9** (sample data), **10** (value shown).

---

## 5. Step-by-Step Build Guide

### PHASE 1 — Setup (Member A alone, 20 min)

```bash
mkdir negombo-fish-price-board && cd negombo-fish-price-board
git init
```

**1.1 MongoDB Atlas**
1. atlas.mongodb.com → free M0 cluster
2. Database Access → add user `hackathon` + password
3. Network Access → Add IP → **Allow access from anywhere (0.0.0.0/0)**
   ⚠ Skipping this is the #1 reason Atlas fails from Railway
4. Connect → Drivers → copy the connection string

**1.2 Server**
```bash
mkdir server && cd server
npm init -y
npm i express mongoose cors dotenv
npm i -D nodemon
```
Add to `server/package.json`:
```json
"type": "module",
"scripts": { "start": "node server.js", "dev": "nodemon server.js", "seed": "node seed.js" }
```
Create `server/.env`:
```
MONGO_URI=mongodb+srv://hackathon:PASSWORD@cluster0.xxxxx.mongodb.net/fishprice?retryWrites=true&w=majority
PORT=5000
```

**1.3 Client**
```bash
cd .. && npm create vite@latest client -- --template react
cd client && npm i react-router-dom && npm i
```
Create `client/.env`:
```
VITE_API_URL=http://localhost:5000
```

**1.4 Root `.gitignore`**
```
node_modules/
dist/
.env
.DS_Store
```

**1.5 First push + collaborators**
```bash
cd .. && git add . && git commit -m "chore: scaffold client and server"
gh repo create negombo-fish-price-board --public --source=. --push
```
Add the other three as collaborators. **Everyone clones now.**

---

### PHASE 2 — Server code (Member A, 30 min)

**`server/models/Price.js`**
```js
import mongoose from 'mongoose';

const priceSchema = new mongoose.Schema({
  fish:   { type: String, required: [true, 'Fish type is required'], trim: true },
  market: { type: String, required: [true, 'Landing site is required'], trim: true },
  price:  { type: Number, required: [true, 'Price is required'],
            min: [1, 'Price must be greater than 0'],
            max: [10000, 'Price looks too high for one kilo'] },
  seller: { type: String, required: [true, 'Reporter name is required'],
            minlength: [3, 'Name must be at least 3 characters'], trim: true },
  date:   { type: String, default: () => new Date().toISOString().slice(0, 10) }
}, { timestamps: true });

export default mongoose.model('Price', priceSchema);
```

**`server/routes/priceRoutes.js`** — keep only endpoints used by the UI
```js
import express from 'express';
import Price from '../models/Price.js';

const router = express.Router();

// GET /api/prices
router.get('/', async (req, res) => {
  try {
    const prices = await Price.find().sort({ createdAt: -1 });
    res.json({ success: true, message: 'OK', data: prices });
  } catch {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/prices
router.post('/', async (req, res) => {
  try {
    const created = await Price.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Price recorded successfully',
      data: created
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
```

> **Scope rule:** do not add unused `GET /:id`, `DELETE`, authentication, admin pages, maps or AI features unless everything else is already finished and deployed. They are not required for the core marks.

**`server/server.js`**
```js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import priceRoutes from './routes/priceRoutes.js';

dotenv.config();
const app = express();

app.use(cors());              // must come BEFORE the routes
app.use(express.json());

app.get('/', (req, res) => res.json({ success: true, message: 'Fish Price API running' }));

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

app.use('/api/prices', priceRoutes);

app.use((req, res) => res.status(404).json({ success: false, message: 'Endpoint not found' }));

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`API on ${PORT}`));
  })
  .catch(err => console.error('DB connection failed:', err.message));
```

**`server/seed.js`**
```js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Price from './models/Price.js';

dotenv.config();

const data = [
  { fish: 'Balaya (Skipjack)',     market: 'Negombo Main',  price: 950,  seller: 'Nimal',   date: '2026-09-04' },
  { fish: 'Kelawalla (Yellowfin)', market: 'Negombo Main',  price: 1850, seller: 'Sunil',   date: '2026-09-04' },
  { fish: 'Hurulla',               market: 'Duwa Landing',  price: 620,  seller: 'Ranjith', date: '2026-09-04' },
  { fish: 'Thalapath (Seer)',      market: 'Pitipana',      price: 2900, seller: 'Ajith',   date: '2026-09-04' },
  { fish: 'Isso (Prawns)',         market: 'Negombo Main',  price: 2400, seller: 'Kamal',   date: '2026-09-04' },
  { fish: 'Balaya (Skipjack)',     market: 'Pitipana',      price: 880,  seller: 'Sarath',  date: '2026-09-04' },
  { fish: 'Paraw (Trevally)',      market: 'Duwa Landing',  price: 1350, seller: 'Nuwan',   date: '2026-09-04' },
  { fish: 'Koduwa (Barramundi)',   market: 'Negombo Main',  price: 1600, seller: 'Prasad',  date: '2026-09-04' }
];

await mongoose.connect(process.env.MONGO_URI);
await Price.deleteMany({});
await Price.insertMany(data);
console.log('Seeded', data.length, 'records');
process.exit();
```

**Run and verify:**
```bash
cd server
npm run seed          # expect: Seeded 8 records
npm run dev           # expect: MongoDB connected / API on 5000
```
Open `http://localhost:5000/api/prices` — you must see JSON. **Do not proceed until you do.**

---

### PHASE 3 — Client (all four, in parallel, 09:45 – 11:15)

**`client/src/api/priceApi.js`** (A)
```js
const BASE = import.meta.env.VITE_API_URL;

export async function getPrices() {
  const res = await fetch(`${BASE}/api/prices`);
  const json = await res.json();
  if (!json.success) throw new Error(json.message);
  return json.data;
}

export async function createPrice(entry) {
  const res = await fetch(`${BASE}/api/prices`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entry)
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message);
  return json.data;
}
```

**`client/src/App.jsx`** (A) — fallback is allowed, but it must be visible
```jsx
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddPrice from './pages/AddPrice';
import PriceList from './pages/PriceList';
import NotFound from './pages/NotFound';
import { getPrices, createPrice } from './api/priceApi';
import { sampleData } from './data/sampleData';

export default function App() {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    getPrices()
      .then(data => {
        setPrices(data);
        setOffline(false);
      })
      .catch(() => {
        setPrices(sampleData);
        setOffline(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const addPrice = async (entry) => {
    if (offline) {
      setPrices(prev => [
        { ...entry, _id: `demo-${Date.now()}`, date: new Date().toISOString().slice(0, 10) },
        ...prev
      ]);
      return;
    }

    const saved = await createPrice(entry);
    setPrices(prev => [saved, ...prev]);
  };

  return (
    <BrowserRouter>
      <Navbar />

      {offline && (
        <div className="offline-banner" role="status">
          API unavailable — showing demonstration sample data. New entries in this mode are not persisted to MongoDB.
        </div>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prices" element={<PriceList prices={prices} loading={loading} />} />
        <Route path="/add" element={<AddPrice onAdd={addPrice} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

> The fallback is **demo insurance**, not a way to hide deployment failure. During evaluation, prove live persistence by submitting a record and showing it in MongoDB Atlas.

**`client/src/data/sampleData.js`** (D)
```js
export const sampleData = [
  { _id: 's1', fish: 'Balaya (Skipjack)',     market: 'Negombo Main', price: 950,  seller: 'Nimal',   date: '2026-09-04' },
  { _id: 's2', fish: 'Kelawalla (Yellowfin)', market: 'Negombo Main', price: 1850, seller: 'Sunil',   date: '2026-09-04' },
  { _id: 's3', fish: 'Hurulla',               market: 'Duwa Landing', price: 620,  seller: 'Ranjith', date: '2026-09-04' },
  { _id: 's4', fish: 'Thalapath (Seer)',      market: 'Pitipana',     price: 2900, seller: 'Ajith',   date: '2026-09-04' },
  { _id: 's5', fish: 'Isso (Prawns)',         market: 'Negombo Main', price: 2400, seller: 'Kamal',   date: '2026-09-04' },
  { _id: 's6', fish: 'Balaya (Skipjack)',     market: 'Pitipana',     price: 880,  seller: 'Sarath',  date: '2026-09-04' },
  { _id: 's7', fish: 'Paraw (Trevally)',      market: 'Duwa Landing', price: 1350, seller: 'Nuwan',   date: '2026-09-04' },
  { _id: 's8', fish: 'Koduwa (Barramundi)',   market: 'Negombo Main', price: 1600, seller: 'Prasad',  date: '2026-09-04' }
];
```

> These values are **illustrative hackathon sample data**. Do not describe them as official or verified current market quotations.

**`client/src/pages/Home.jsx`** (D) — requirement 2 + local relevance + prototype notice
```jsx
export default function Home() {
  return (
    <div className="page">
      <h1>Negombo Fish Price Board</h1>
      <p className="muted">Recent community-reported fish prices across selected Negombo landing sites.</p>

      <section className="card">
        <h2>The Problem</h2>
        <p>
          Small-scale fishermen and buyers around Negombo often need to make quick
          selling and buying decisions. Price information from nearby landing sites
          is not always available in one simple shared place at the moment it is
          needed. A fisherman at Negombo Main may want to compare the reported price
          for the same fish at Duwa Landing or Pitipana before agreeing to a sale.
        </p>
      </section>

      <section className="card">
        <h2>Our Solution</h2>
        <p>
          A public community price board where fishermen and buyers can report a fish
          price for a selected landing site, then browse, search and filter recent
          reports and see the average of the current filtered results.
        </p>
      </section>

      <section className="card">
        <h2>Who It Helps</h2>
        <p>
          Small-scale fishermen, buyers and retail sellers using Negombo Main, Duwa
          Landing and Pitipana who want a faster price reference before trading.
        </p>
      </section>

      <section className="notice">
        <strong>Prototype notice:</strong> prices supplied with this hackathon build
        are sample/illustrative data and are not official market quotations.
      </section>
    </div>
  );
}
```

**`client/src/components/Navbar.jsx`** (D)
```jsx
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="nav">
      <span className="brand">🐟 Negombo Price Board</span>
      <div>
        <Link to="/">Home</Link>
        <Link to="/prices">Prices</Link>
        <Link to="/add">Report Price</Link>
      </div>
    </nav>
  );
}
```

**`client/src/pages/AddPrice.jsx`** (B) — semantic form + validation
```jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FISH = ['Balaya (Skipjack)', 'Kelawalla (Yellowfin)', 'Hurulla',
              'Thalapath (Seer)', 'Isso (Prawns)', 'Paraw (Trevally)',
              'Koduwa (Barramundi)'];
const MARKETS = ['Negombo Main', 'Duwa Landing', 'Pitipana'];

export default function AddPrice({ onAdd }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fish: '', market: '', price: '', seller: '' });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [apiError, setApiError] = useState('');

  const validate = () => {
    const e = {};
    if (!form.fish) e.fish = 'Please select a fish type.';
    if (!form.market) e.market = 'Please select a landing site.';
    if (!form.price) e.price = "Please enter today's price per kilo.";
    else if (isNaN(form.price) || Number(form.price) <= 0)
      e.price = 'Price must be a number greater than 0.';
    else if (Number(form.price) > 10000)
      e.price = 'That looks too high — please check the price per kilo.';
    if (!form.seller.trim()) e.seller = 'Please enter your name.';
    else if (form.seller.trim().length < 3)
      e.seller = 'Name must be at least 3 characters.';
    return e;
  };

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
    setApiError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    try {
      setSaving(true);
      await onAdd({ ...form, price: Number(form.price) });
      navigate('/prices');
    } catch (err) {
      setApiError(err.message || 'Could not save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page">
      <h1>Report Today's Price</h1>

      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="fish">Fish type</label>
        <select id="fish" value={form.fish}
                onChange={e => handleChange('fish', e.target.value)}>
          <option value="">-- Select --</option>
          {FISH.map(f => <option key={f} value={f}>{f}</option>)}
        </select>
        {errors.fish && <p className="error">{errors.fish}</p>}

        <label htmlFor="market">Landing site</label>
        <select id="market" value={form.market}
                onChange={e => handleChange('market', e.target.value)}>
          <option value="">-- Select --</option>
          {MARKETS.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
        {errors.market && <p className="error">{errors.market}</p>}

        <label htmlFor="price">Price per kg (Rs.)</label>
        <input id="price" inputMode="decimal" value={form.price}
               onChange={e => handleChange('price', e.target.value)}
               placeholder="e.g. 950" />
        {errors.price && <p className="error">{errors.price}</p>}

        <label htmlFor="seller">Reporter name</label>
        <input id="seller" value={form.seller}
               onChange={e => handleChange('seller', e.target.value)}
               placeholder="e.g. Nimal" />
        {errors.seller && <p className="error">{errors.seller}</p>}

        {apiError && <p className="error">{apiError}</p>}

        <button type="submit" disabled={saving}>
          {saving ? 'Saving...' : 'Submit Price'}
        </button>
      </form>
    </div>
  );
}
```

> `event.preventDefault()` prevents the browser reload while preserving correct form semantics, Enter-key submission and better accessibility.

**`client/src/pages/PriceList.jsx`** (C)
```jsx
import { useState } from 'react';

export default function PriceList({ prices, loading }) {
  const [search, setSearch] = useState('');
  const [market, setMarket] = useState('All');

  const markets = ['All', ...new Set(prices.map(p => p.market))];

  const filtered = prices.filter(p =>
    p.fish.toLowerCase().includes(search.toLowerCase()) &&
    (market === 'All' || p.market === market)
  );

  const avg = filtered.length
    ? Math.round(filtered.reduce((sum, p) => sum + p.price, 0) / filtered.length)
    : 0;

  if (loading) return <div className="page"><p>Loading prices...</p></div>;

  return (
    <div className="page">
      <h1>Today's Prices</h1>

      <div className="filters">
        <input placeholder="Search fish type..." value={search}
               onChange={e => setSearch(e.target.value)} />
        <select value={market} onChange={e => setMarket(e.target.value)}>
          {markets.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>

      <p className="summary">
        Showing <b>{filtered.length}</b> {filtered.length === 1 ? 'entry' : 'entries'}
        {' · '}Average price <b>Rs. {avg}</b> /kg
      </p>

      {filtered.length === 0 && <p className="muted">No prices found for that search.</p>}

      <div className="grid">
        {filtered.map(p => (
          <div className="card" key={p._id}>
            <h3>{p.fish}</h3>
            <p className="price">Rs. {p.price} /kg</p>
            <p>{p.market} · {p.date}</p>
            <p className="muted">Reported by {p.seller}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

**`client/src/pages/NotFound.jsx`** (C)
```jsx
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="page">
      <h1>404</h1>
      <p>That page does not exist.</p>
      <Link to="/">Back to home</Link>
    </div>
  );
}
```

**`client/src/index.css`** (D)
```css
* { box-sizing: border-box; font-family: system-ui, -apple-system, sans-serif; }
body { margin: 0; background: #f4f7fa; color: #12263f; }

.page { max-width: 900px; margin: 0 auto; padding: 20px; }

.nav { display: flex; flex-wrap: wrap; gap: 12px;
       justify-content: space-between; align-items: center;
       background: #0d2b6b; color: #fff; padding: 14px 20px; }
.nav a { color: #fff; margin-left: 16px; text-decoration: none; }
.nav a:hover { text-decoration: underline; }
.brand { font-weight: 700; }

.card { background: #fff; border-radius: 10px; padding: 16px;
        box-shadow: 0 1px 4px rgba(0,0,0,.08); margin-bottom: 16px; }
.grid { display: grid; gap: 14px;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }

.filters { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 12px; }
.filters input { flex: 2; min-width: 200px; }
.filters select { flex: 1; min-width: 150px; }

label { display: block; margin-top: 12px; font-weight: 600; font-size: 14px; }
input, select { width: 100%; padding: 10px; margin: 6px 0 4px;
                border: 1px solid #cbd5e1; border-radius: 8px; font-size: 16px; }
button { background: #0d2b6b; color: #fff; border: 0; padding: 12px 22px;
         border-radius: 8px; font-size: 16px; margin-top: 16px; cursor: pointer; }
button:disabled { opacity: .6; }

.error   { color: #c0392b; font-size: 14px; margin: 0 0 8px; }
.price   { color: #0d2b6b; font-size: 20px; font-weight: 700; margin: 6px 0; }
.muted   { color: #6b7a90; font-size: 14px; }
.summary { background: #e8eefc; padding: 10px 14px; border-radius: 8px; }
.notice { background: #fff7dc; border: 1px solid #eed27a; border-radius: 8px; padding: 12px 14px; margin-bottom: 16px; }
.offline-banner { background: #fff3cd; border-bottom: 1px solid #e6c55a; padding: 10px 20px; text-align: center; font-weight: 600; }

@media (max-width: 600px) {
  .nav { flex-direction: column; align-items: flex-start; }
  .nav a { margin: 0 16px 0 0; }
}
```
> `repeat(auto-fit, minmax(240px, 1fr))` is the responsive answer in the viva —
> the grid reflows with no extra media query.

---

### PHASE 4 — Deploy (Member A, 11:55 – 12:25)

**Railway (backend) — do this FIRST**
1. railway.app → New Project → Deploy from GitHub → your repo
2. Settings → **Root Directory: `server`**
3. Variables → add `MONGO_URI` (the Atlas string)
4. Deploy → Settings → Networking → **Generate Domain**
5. Open `https://your-app.up.railway.app/health` — must show `status: ok` and `database: connected`
6. Open `https://your-app.up.railway.app/api/prices` — **must return JSON**

**Vercel (frontend)**
1. vercel.com → Import the same repo
2. **Root Directory: `client`** · Framework: Vite
3. Environment Variables → `VITE_API_URL` = your Railway domain (no trailing slash)
4. Deploy

⚠ If you set `VITE_API_URL` **after** the first deploy, you must **redeploy** —
Vite bakes env vars in at build time.

**Verification — all four must pass:**
- [ ] Railway `/health` reports API OK + database connected
- [ ] Railway `/api/prices` returns JSON in the browser
- [ ] Vercel link opens in an **incognito window**
- [ ] Vercel link opens on a **phone using mobile data**, not campus wifi
- [ ] Submitting the form on the deployed site adds a record that survives refresh
- [ ] The same new record is visible in **MongoDB Atlas → Browse Collections**

---

## 6. Master TODO — tick as you go

### Setup — 09:20 to 09:45 (A)
- [ ] Repo created, 3 collaborators added
- [ ] Atlas cluster + user + **0.0.0.0/0 network access**
- [ ] `server/` npm init + deps installed
- [ ] `client/` Vite created + react-router-dom
- [ ] `.gitignore` at root (node_modules, dist, .env, .DS_Store)
- [ ] First commit pushed; B, C, D have cloned
- [ ] `AI-PROMPT-LOG.md` created and **logging started**

### Server — 09:45 to 10:15 (A)
- [ ] `models/Price.js`
- [ ] `routes/priceRoutes.js` (only the UI-required **GET + POST**)
- [ ] `server.js` with CORS + JSON + `/health` + 404 handler
- [ ] `seed.js` run → 8 records
- [ ] `localhost:5000/api/prices` returns JSON
- [ ] Commit: `feat(api): add price read/create endpoints with validation`

### Client — 09:45 to 11:15 (parallel)
- [ ] A: `api/priceApi.js` + `App.jsx` with fallback
- [ ] B: `AddPrice.jsx` — 4 fields, per-field validation, errors clear on type
- [ ] C: `PriceList.jsx` — search + filter + average + empty state
- [ ] C: `NotFound.jsx`
- [ ] D: `sampleData.js` — 8 records
- [ ] D: `Home.jsx` — problem + solution + who it helps
- [ ] D: `Navbar.jsx`
- [ ] D: `index.css` — full stylesheet + mobile breakpoint
- [ ] **Everyone makes meaningful commits for finished features** — avoid `update`, `fix2`, `final-final`

### Integrate — 11:15 to 11:55 (all)
- [ ] All branches merged, `npm run dev` works end to end
- [ ] Submit empty form → 4 friendly errors
- [ ] Enter `abc` in price → number error
- [ ] Enter `50000` → range error
- [ ] Valid submit → appears at top of list
- [ ] Search + filter combined → correct results
- [ ] `/random-url` → 404 page
- [ ] Phone-width layout has no horizontal scroll
- [ ] **⛔ 11:55 BUILD STOP — no new features after this**

### Ship — 11:55 to 12:25 (A)
- [ ] Railway deployed, root dir `server`, `MONGO_URI` set, domain generated
- [ ] Railway `/health` shows DB connected
- [ ] Railway `/api/prices` returns JSON
- [ ] Vercel deployed, root dir `client`, `VITE_API_URL` set, **redeployed after**
- [ ] Incognito test passes
- [ ] Phone-on-4G test passes
- [ ] README complete — all 10 items
- [ ] Submit one test record from Vercel and show it in MongoDB Atlas
- [ ] Final push; check every member appears in `git log --oneline --all --author="..."` or GitHub Contributors

### Submit — 12:25 to 12:55
- [ ] 2-minute video recorded (script in §8)
- [ ] Video uploaded to OneDrive, **link sharing set to anyone**
- [ ] Submission PDF built (§7), renamed to Group ID
- [ ] AI Prompt Log inside the PDF **and** in the repo
- [ ] Uploaded to CourseWeb by **12:55**
- [ ] Each member rehearses explaining their own file + one live edit

---

## 7. README.md — all 10 required items

```markdown
# Negombo Fish Price Board

**SE3090 Mini Hackathon · Group SE_016**

Live app: <vercel-url>
API: <railway-url>/api/prices
Demo video: <onedrive-link>

## The Problem
[paste the evidence-conscious problem statement from §1; add verified evidence if the team has it]

## Our Solution
[paste the solution from §1]

> Prototype notice: sample prices are illustrative and are not official market quotations.

## Main Features
- Report today's price for a fish type at a landing site (validated form)
- Browse all reported prices with live search by fish and filter by landing site
- Live average price for the current filtered set
- Responsive layout for desktop and mobile
- 404 page for unknown routes

## Technologies Used
React 18, Vite, React Router v6, plain CSS · Node.js, Express, Mongoose ·
MongoDB Atlas · Vercel (frontend), Railway (backend)

## AI Tools Used
Declare **only tools actually used**. Example:
- Codex — generated/refactored application code; the team reviewed the diff, ran the app, tested validation/API behaviour and modified the output where needed.
- ChatGPT — reviewed the build plan against the marking scheme; the team selected the recommendations it understood and implemented.
- Claude — include only if actually used.

Full exact prompt log: `AI-PROMPT-LOG.md`.

## Architecture
```text
Browser → Vercel (React + Vite) → Railway (Express API) → MongoDB Atlas
                    HTTPS/JSON               Mongoose
```

## Deployment Verification
- API health: `<railway-url>/health`
- API data: `<railway-url>/api/prices`
- Frontend tested in incognito
- Frontend tested on mobile width / phone
- A submitted price was verified in MongoDB Atlas

## Team & Contributions
| Name | Student ID | Contribution |
|---|---|---|
| ... | IT2410xxxx | Integration, API layer, Express server, deployment, README |
| ... | IT2410xxxx | Add Price form and input validation |
| ... | IT2410xxxx | Price list, search, filter, average calculation, 404 page |
| ... | IT2410xxxx | Landing page, problem content, navigation, responsive styling, sample data |

## Installation & Execution
### Backend
cd server && npm install
# create .env with MONGO_URI and PORT
npm run seed
npm run dev

### Frontend
cd client && npm install
# create .env with VITE_API_URL=http://localhost:5000
npm run dev
```

---

## 8. Two-Minute Video Script

| Time | Say / Show |
|---|---|
| 0:00–0:15 | Group ID + four names. "Negombo Fish Price Board." |
| 0:15–0:35 | The problem — small-scale fishermen and buyers need a quicker shared reference for reported prices across Negombo Main, Duwa and Pitipana. Do not claim sample prices are verified market facts. |
| 0:35–0:50 | The solution in one sentence. Show the home page. |
| 0:50–1:20 | **Live:** open Report Price → submit empty → show the four errors → type `abc` → number error → fill correctly → submit → new record appears at the top. |
| 1:20–1:40 | **Live:** search "Bala" → list narrows → filter to Pitipana → average recalculates. |
| 1:40–1:50 | Show the Vercel URL in the address bar. Resize or show it on a phone. |
| 1:50–2:00 | Impact: a fisherman quoting the going rate at the next site is negotiating with information instead of guessing. |

Aim for 1:50–1:58. The rubric gives full marks when the demonstration is within time; going noticeably over or under can drop the demonstration band.

---

## 9. Submission PDF — build the skeleton now, fill in at 12:45

```
GROUP ID · Negombo Fish Price Board

1. Git repository link:      https://github.com/.../negombo-fish-price-board
2. Deployed application:     https://....vercel.app
3. Demonstration video:      https://onedrive...
4. Team members:             Name + IT number ×4, with contribution line each
5. Problem & solution:       [4–6 sentences from §1]
6. Technologies & AI tools:  [list from README]
7. AI Prompt Log:            tool | exact prompt | purpose | how output was checked
```
Rename the file to your **Group ID**. Upload by **12:55**, not 12:59.

---

## 10. Viva Answer Sheet — one per member, memorise yours

**Everyone, the stack question:**
> We used React with Vite on Vercel, and an Express API with MongoDB Atlas on
> Railway. **Because** the data is a flat set of price records with no relational
> joins, a document store fit the shape directly and let us skip schema migration
> in a four-hour build. **Consequence** → we finished all ten functional
> requirements with less setup risk and could focus the limited session on a working public prototype.

| Member | Likely question | Answer |
|---|---|---|
| A | Where does state live? | In `App.jsx`. It fetches once on mount and passes the array down as props — one-way data flow, single source of truth. New records are added to state optimistically after the API confirms, so the list updates without a refetch. |
| A | What happens if the API is down? | The fetch falls back to clearly labelled demonstration data, so the UI remains explorable. The banner states that fallback entries are not persisted, so we do not misrepresent demo data as live database data. |
| A | Why MongoDB over SQL? | The records are flat and independent with no joins. A document store meant no schema migration step, which mattered given the four-hour limit. With relational data we would have chosen PostgreSQL. |
| B | Show me your validation | Live: empty submit → four messages; `abc` → number error; `50000` → range error; errors clear as you type. Client-side for instant feedback, **and** Mongoose schema rules server-side so the API cannot be bypassed. |
| B | Why validate twice? | Client validation is for user experience; server validation is for correctness, because anyone can POST directly to the API. |
| C | How does the search work? | `search` and `market` are React state. On every render the array is filtered against both, so the list is derived state — no separate copy to keep in sync. |
| C | Why `key={p._id}`? | React uses the key to match elements between renders. Using the array index breaks when the list reorders or an item is inserted at the top, which ours does. `_id` is stable. |
| D | Is it responsive? | Open the deployed link on a phone. The card grid uses `auto-fit` with `minmax`, so columns reflow automatically, and the nav stacks below 600px. |
| D | Where is the problem explained? | On the landing page — three sections covering the problem, the solution and who it helps, so a first-time visitor understands the context before using the tool. |

**Every member must be able to open their own file and make a live edit** — change
an error message, change a colour, add a fish to the dropdown. The evaluator can
ask for this (spec §2.4). Practise once at 12:50.

---

## 11. Failure Points — check these before they bite

| Symptom | Cause | Fix |
|---|---|---|
| Atlas connection times out from Railway | IP whitelist | Network Access → `0.0.0.0/0` |
| `fetch` fails on deployed site, works locally | `VITE_API_URL` set after build | Set the variable, then **redeploy** |
| CORS error in console | `app.use(cors())` after routes | Must be before `app.use('/api/prices', ...)` |
| Vercel build fails | wrong root directory | Root Directory = `client` |
| Railway crash on start | wrong root directory or missing `MONGO_URI` | Root = `server`, add the variable |
| `require is not defined` | missing `"type": "module"` | Add it to `server/package.json` |
| Page reloads on form submit | submit handler does not call `preventDefault()` | Use `<form onSubmit={handleSubmit}>` and call `event.preventDefault()` |
| One member has no commits | work happened only on another member’s branch/laptop | Give each member owned files and require meaningful feature commits under their own Git identity |

---

## 12. Wall Card — write this on paper

```
┌──────────────────────────────────────────────┐
│  SCOPE LOCKED 09:20  ·  BUILD STOP 11:55     │
│  Railway 11:55 · Vercel 12:10 · Video 12:45  │
│  CourseWeb 12:55  (not 12:59)                │
│                                              │
│  API down at 12:20 → fallback already coded  │
│  Test: INCOGNITO + PHONE ON 4G               │
│  Prove DB: submit → Atlas → refresh             │
│  Meaningful feature commits, ALL FOUR         │
│  AI PROMPT LOG = mandatory                   │
│  Between two bands → marker gives the LOWER  │
└──────────────────────────────────────────────┘
   PROBLEM → SHIP → PROVE
   ප්‍රශ්නය කියන්න · deploy කරන්න · commit වලින් ඔප්පු කරන්න
```

---

## 13. Rubric-to-Evidence Matrix — this is the actual scoring checklist

Use this table during the final 45 minutes. Do not assume a feature earns marks merely because the code exists; the evaluator must be able to **see evidence** quickly.

| Rubric criterion | Marks | Evidence you should show |
|---|---:|---|
| Relevance of Sri Lankan problem | 10 | Home page names Negombo, selected landing sites and affected users; explain the specific price-information problem clearly |
| Practicality & creativity | 15 | One focused workflow: report a price → compare/search/filter → use average as a reference; explain why scope fits four hours |
| Minimum functional requirements | 20 | Tick all 10 items in §14 below and live-test them |
| Quality & usability | 15 | Clean responsive layout, loading/empty/error states, semantic form, friendly client validation, server validation |
| Effective use of technology & AI | 10 | Justify React/Express/MongoDB/Vercel/Railway; show AI prompt log; every member can explain own code |
| Git repository & documentation | 10 | Meaningful commits from all members; complete README; deployed link + video link + contribution table |
| Successful deployment | 10 | Public Vercel link works in incognito; Railway `/health`; API returns JSON; new record persists in Atlas |
| 2-minute demonstration | 5 | Problem → solution → validation → working feature → deployed URL → impact, all under two minutes |
| Contribution from all members | 5 | Git commits + README contribution lines + each member prepared for a live edit/question |

> **Rubric rule:** if the work sits between two bands, the specification says the lower band is awarded. Remove ambiguity by making evidence explicit.

---

## 14. Ten Minimum Requirements — final definition of done

- [ ] **1. Landing/main UI** — Home page loads cleanly
- [ ] **2. Problem explained inside app** — not only README/PDF
- [ ] **3. At least two functional features** — report price + search/filter/average comparison
- [ ] **4. User-input form** — Report Price
- [ ] **5. Input validation** — empty, non-number, out-of-range, short name; friendly errors
- [ ] **6. Display/search/filter/calculate/update/process** — search + landing-site filter + average
- [ ] **7. Responsive desktop + mobile** — test narrow width and phone
- [ ] **8. Basic navigation** — Home / Prices / Report Price + 404
- [ ] **9. Relevant sample data** — clearly labelled as illustrative
- [ ] **10. Value to Sri Lankan users** — Home page + demo impact sentence

**Do not build new features until all ten boxes are checked.**

---

## 15. Database Demonstration Runbook — if the evaluator says “show the database”

### Before evaluation
1. Open **MongoDB Atlas** in a browser tab.
2. Open the project → **Browse Collections**.
3. Open the database used in the connection string and the `prices` collection.
4. Keep the deployed Vercel app open in another tab.
5. Keep `<railway-url>/health` open in another tab.

### Live proof
1. Show `/health` → API is running and database reports `connected`.
2. In the deployed app, submit a unique test record, for example:
   - Fish: `Balaya (Skipjack)`
   - Market: `Duwa Landing`
   - Price: `975`
   - Reporter: `Demo Team`
3. Show the new record at the top of the Prices page.
4. Refresh MongoDB Atlas → `prices` collection.
5. Point to the same `fish`, `market`, `price`, `seller`, date/timestamps.
6. Refresh the Vercel page and show the record remains — this proves persistence.

### One-line viva answer
> React sends a JSON POST request to the Express API. Express passes the validated object to Mongoose, and Mongoose persists it as a MongoDB Atlas document. We verify persistence by refreshing both the public app and the Atlas collection.

### If the API is down
Show the visible **demo-data banner**. Do not claim those records are live. Fix deployment if time permits; fallback mode is only insurance for demonstrating UI behaviour.

---

## 16. Meaningful Git Commit Plan — quality beats commit spam

Each member should have identifiable commits tied to owned work. Suggested examples:

### Member A
```bash
git commit -m "chore: scaffold React and Express applications"
git commit -m "feat(api): add MongoDB price read/create endpoints"
git commit -m "feat(integration): connect React client to deployed API"
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

Avoid meaningless history such as `update`, `fix`, `final`, `final2`, or one giant dump commit.

---

## 17. AI Prompt Log — mandatory template

Create `AI-PROMPT-LOG.md` **at the beginning**, not at submission time.

```markdown
# AI Prompt Log — Group SE_016

| # | Tool | Exact prompt | Purpose | How output was checked / modified |
|---|---|---|---|---|
| 1 | Codex | [paste exact significant prompt] | Build/refactor feature | Reviewed diff, ran app, tested behaviour, changed X |
| 2 | ChatGPT | [paste exact significant prompt] | Review plan against marking scheme | Compared recommendations with spec; team chose and implemented Y |
| 3 | ... | ... | ... | ... |
```

Rules:
- Record **exact significant prompts**, not summaries.
- Redact passwords, API keys, connection strings and personal data.
- Declare AI use in **README + submission PDF**.
- Contribution statements must be written in the team’s own words.
- Every member must understand any AI-generated code they present.

---

## 18. Final 2-Minute Evaluation Flow — separate from the recorded video if needed

If the panel gives you a live evaluation window, use this order:

1. **10 sec — Problem:** specific Negombo users + price-information gap.
2. **10 sec — Architecture:** React/Vercel → Express/Railway → MongoDB Atlas.
3. **25 sec — Validation:** empty submit, bad price, friendly errors.
4. **25 sec — Core flow:** valid report → appears in Prices.
5. **20 sec — Search/filter/average:** combine search + landing-site filter.
6. **20 sec — Database proof:** refresh Atlas and show persisted record.
7. **10 sec — Responsive/deployment:** public URL + narrow/mobile view.
8. **10 sec — Impact:** one sentence on better price visibility for users.

Keep Git/README/AI log ready for questions rather than spending demo time scrolling through them.

---

## 19. Things to SKIP unless everything above is finished

Do **not** add these just because they sound impressive:

- Authentication / login
- Admin panel
- Maps
- Notifications
- AI agent / chatbot
- Extra CRUD screens
- Complex charts
- Multiple databases
- Docker unless the chosen deployment actually requires it
- UI redesign after the current interface is already clean and responsive

The specification explicitly allows optional extras, but the scoring bands heavily reward a **complete, reliable, well-explained core**. Extra features that introduce deployment or integration bugs are negative value in a four-hour assessment.

---

## 20. Final 10-Minute Pre-Submission Checklist

- [ ] Vercel URL works in incognito
- [ ] Vercel URL works on phone/mobile width
- [ ] Railway `/health` → database connected
- [ ] Railway `/api/prices` → JSON
- [ ] Submit a fresh record → visible in app → survives refresh → visible in Atlas
- [ ] Empty/bad form inputs show friendly errors
- [ ] Search + filter + average work together
- [ ] Home page clearly states problem, solution, affected users and prototype notice
- [ ] All 10 minimum requirements checked
- [ ] README contains every required item
- [ ] AI Prompt Log contains exact significant prompts
- [ ] README and PDF both declare AI usage
- [ ] Every registered member has meaningful Git evidence
- [ ] Demo video link sharing is accessible without team login
- [ ] Submission PDF contains repo link, deployed link, video link, members/IDs, problem/solution, technologies/AI tools, prompt log
- [ ] PDF renamed with Group ID
- [ ] CourseWeb upload completed before the deadline

**Final rule:** after this checklist passes, stop touching the code.
