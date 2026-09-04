# Deployment Runbook — Atlas → Railway → Vercel

**Window: 11:55 – 12:25. Owner: Member A.** Worth 10 marks on its own, and
requirement 3 and 7 depend on it working.

> **Order matters. Deploy the backend first.** Vite bakes `VITE_API_URL` into the
> bundle at *build* time, so the API must already have a public domain before the
> frontend is built.

---

## Stage 0 — MongoDB Atlas (done in Phase 1, verify again here)

1. `atlas.mongodb.com` → free **M0** cluster, status **Active**.
2. **Database Access** → user `hackathon` with a generated password.
   The password lives in a password manager or an offline note — **never in the
   repo, never in Markdown, never in chat.**
3. ⚠ **Network Access** → Add IP Address → **Allow access from anywhere
   (`0.0.0.0/0`)**.
   Railway's free tier has no stable outbound IP, so an allow-list cannot be
   written. Skipping this is the **single most common reason** the API deploys
   successfully and then times out on every query.
4. **Connect → Drivers** → copy the connection string. Replace `<password>` and
   add the database name:

   ```
   mongodb+srv://hackathon:<PASSWORD>@cluster0.xxxxx.mongodb.net/fishprice?retryWrites=true&w=majority
   ```

5. Verify: `Browse Collections` → `fishprice` → `prices` shows the 8 seeded
   records.

---

## Stage 1 — Railway (backend API)

| Setting | Value |
|---|---|
| Source | Deploy from GitHub repo → `negombo-fish-price-board` |
| **Root Directory** | **`server`** ⚠ |
| Start command | `npm start` (resolved from `server/package.json`) |
| Variables | `MONGO_URI` = the Atlas string |
| `PORT` | **do not set** — Railway injects it; `server.js` reads `process.env.PORT` |

### Steps

1. `railway.app` → **New Project** → **Deploy from GitHub repo** → select the repo.
2. Service → **Settings** → **Root Directory: `server`**.
   Wrong root directory is the most common Railway failure — it tries to build the
   repository root, finds no `package.json` with a start script, and crashes.
3. **Variables** → add `MONGO_URI`. Paste the Atlas string. Nothing else goes here.
4. Deploy. Watch the build log until it prints `MongoDB connected` and `API on <port>`.
5. **Settings → Networking → Generate Domain.** Record the URL.

### Verify — all three must pass before touching Vercel

```
✅ https://<railway-domain>/health
   → {"status":"ok","database":"connected"}

✅ https://<railway-domain>/api/prices
   → a JSON array of records, visible in the browser

✅ https://<railway-domain>/nonsense
   → {"success":false,"message":"Endpoint not found"}   (JSON, not an HTML error page)
```

If `database` reads `disconnected`, stop and go to `docs/TROUBLESHOOTING.md` →
Atlas. Do not continue — the frontend will have nothing to fetch.

---

## Stage 2 — Vercel (frontend SPA)

| Setting | Value |
|---|---|
| Source | Import the **same** GitHub repo |
| **Root Directory** | **`client`** ⚠ |
| Framework preset | **Vite** |
| Build command | `npm run build` |
| Output directory | `dist` |
| Environment variable | `VITE_API_URL` = the Railway domain, **no trailing slash** |

### Steps

1. `vercel.com` → **Add New → Project** → import the repo.
2. Set **Root Directory** to `client` and the framework preset to **Vite**. Accept
   Vercel's build/output defaults — do not fight them.
3. **Environment Variables** → add `VITE_API_URL` = `https://<railway-domain>`
   with **no trailing slash**. A trailing slash produces `https://host//api/prices`.
4. Deploy.
5. ⚠ **If you added `VITE_API_URL` after the first deploy, redeploy now.** Vite
   inlines environment variables at build time; the already-built bundle contains
   an empty API URL and will never work no matter how correct the variable looks
   in the dashboard.

### SPA routing fix — required

A client-routed SPA needs every path served `index.html`, or a hard refresh on
`/prices` returns a Vercel 404. Create `client/vercel.json`:

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

Commit and push. Vercel redeploys automatically.

---

## Stage 3 — Verification. Every box, no exceptions.

This block is the 10-mark deployment criterion. It is also what you show the
marker.

### Public reachability

- [ ] The Vercel link opens in a normal window and shows **live** data —
      the offline banner is **not** visible.
- [ ] The Vercel link opens in an **incognito window**. This proves it is public
      rather than cached to your logged-in session.
- [ ] The Vercel link opens **on a phone using mobile data**, not campus wifi.
      Campus networks hide real-world failures.
- [ ] A hard refresh directly on `/prices` and on `/add` loads correctly
      (proves the `vercel.json` rewrite works).
- [ ] `/some-random-url` on the deployed site shows the app's own 404 page.

### Live persistence proof — the one that matters

- [ ] Submit a **unique** record from the deployed site:
      `Balaya (Skipjack)` · `Duwa Landing` · `975` · `Demo Team`
- [ ] It appears at the top of the Prices list.
- [ ] **Refresh the page — it is still there.** This distinguishes real
      persistence from local React state.
- [ ] MongoDB Atlas → Browse Collections → `prices` → **the same record is there**.
      Point at the matching `fish`, `market`, `price`, `seller` and timestamp.
- [ ] Screenshot the Atlas view for the submission PDF.

### Behaviour on the deployed build

- [ ] Empty form submit → four friendly errors.
- [ ] `abc` in price → number error. `50000` → range error.
- [ ] Search + landing-site filter + average all work together.
- [ ] The browser console is clean — **no CORS error**. If CORS fails, see
      `docs/TROUBLESHOOTING.md`.

### ⛔ After verification

**Do not run `npm run seed` again.** `seed.js` calls `deleteMany({})` and would
delete the record you just proved persists.

---

## Record the URLs

Fill these in and copy them into `README.md`, `agent/MEMORY.md` and
`docs/SUBMISSION.md`:

| Thing | URL |
|---|---|
| GitHub repository | |
| Vercel (live app) | |
| Railway (API base) | |
| Health probe | `<railway>/health` |
| Data endpoint | `<railway>/api/prices` |

---

## Redeploy behaviour

Both platforms watch `main`. A push redeploys both automatically.

- **After 11:55, do not push code.** Documentation-only commits are safe, but each
  push triggers a rebuild, and a rebuild is a chance for something that currently
  works to stop working.
- If you must fix a broken requirement after the build stop, redeploy and then
  **re-run the whole of Stage 3**. A verified-then-changed deployment is an
  unverified deployment.

---

## Rollback

| Platform | How |
|---|---|
| Vercel | Deployments → pick the last good one → **Promote to Production** |
| Railway | Deployments → pick the last good one → **Redeploy** |
| Database | No rollback. `seed.js` is destructive — this is why it is forbidden after Phase 6. |

---

## Cost

Everything used is free tier: Atlas M0, Railway free plan, Vercel Hobby. No card
required. Railway's free tier sleeps or exhausts credits over time — irrelevant
inside the assessment window, but worth stating honestly if asked.
