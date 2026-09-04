# Troubleshooting

Every known failure point for this stack, with the symptom you will actually see
first. Find the symptom, apply the fix, then **re-run the affected suite in
`docs/TESTING.md`** — not just the one step that failed.

---

## Fast triage

Work outwards from the database. Two minutes, and it tells you which layer is broken.

```
1. <railway>/health          → database "connected"?   no → §A (Atlas)
2. <railway>/api/prices      → JSON in the browser?    no → §B (Railway)
3. Vercel link opens?                                  no → §C (Vercel build)
4. Site loads but no data → browser console            → §D (API URL / CORS)
5. Data loads but a feature is wrong                   → §E (application)
```

---

## §A — MongoDB Atlas

### `/health` reports `database: "disconnected"`

**Cause 1 — Network Access is not open.** The most common failure in this stack.
Railway's free tier has no stable outbound IP, so an allow-list silently blocks it.

**Fix:** Atlas → Network Access → Add IP Address → **Allow access from anywhere
(`0.0.0.0/0`)**. Wait for the entry to go **Active**, then redeploy on Railway.

**Cause 2 — wrong password in the string.** Special characters in the password
must be percent-encoded (`@` → `%40`, `#` → `%23`, `/` → `%2F`).
**Fix:** regenerate a password with letters and digits only. Update `server/.env`
**and** the Railway variable.

**Cause 3 — `<password>` placeholder never replaced.**
**Fix:** read the string. If it contains `<` or `>`, that is the bug.

**Cause 4 — the cluster is paused.** Free M0 clusters pause after inactivity.
**Fix:** Atlas dashboard → Resume. It takes a minute or two.

### `MongoServerError: bad auth : authentication failed`

The database user does not exist, or the password is wrong.
**Fix:** Atlas → Database Access → confirm the `hackathon` user exists → Edit →
Edit Password → generate a new one → update both places.

### Local connects but Railway does not

Almost always `0.0.0.0/0` (your home IP happens to be allow-listed) or the
Railway variable was never saved. Check Railway → Variables and confirm
`MONGO_URI` is actually there and has no stray whitespace or quotes.

### The data disappeared

Someone ran `npm run seed`. `seed.js` calls `deleteMany({})` before inserting.
**Fix:** re-seed to restore the 8 samples — but the demo record you proved in
Atlas is gone. **Never run seed after Phase 6.**

---

## §B — Railway

### The build fails immediately, or "no start command found"

**Root Directory is not `server`.** Railway is trying to build the repository
root, which has no `package.json`.
**Fix:** Service → Settings → **Root Directory: `server`** → redeploy.

### `ReferenceError: require is not defined`

`server/package.json` is missing `"type": "module"` while the code uses ESM
`import`.
**Fix:** add `"type": "module"` to `server/package.json`, commit, push.

### `Error: Cannot find module 'express'`

Dependencies are not in `server/package.json` — they were installed in the wrong
directory.
**Fix:** `cd server && npm i express mongoose cors dotenv`, commit the updated
`package.json` and `package-lock.json`.

### It deploys, the logs look fine, but the domain returns nothing

`PORT` is hardcoded. Railway injects its own port and routes to that.
**Fix:** `const PORT = process.env.PORT || 5000;` — never a literal. Remove any
`PORT` variable from the Railway dashboard.

### The service crashes on start with no obvious error

The `mongoose.connect()` promise rejected, so `app.listen()` never ran. Scroll up
in the deploy log for `DB connection failed:` and go to §A.

### No public URL

**Fix:** Settings → Networking → **Generate Domain**.

---

## §C — Vercel

### The build fails

**Root Directory is not `client`.**
**Fix:** Project → Settings → General → **Root Directory: `client`** → redeploy.

### The build fails with a real compile error

If `npm run build` fails locally it will fail on Vercel. Run it locally first
(test G4 in `docs/TESTING.md`). Common causes: an unused import that ESLint
rejects, a missing file after a bad merge, or a leftover `<<<<<<<` conflict marker.

### A hard refresh on `/prices` returns a Vercel 404

The SPA rewrite is missing. Vercel is looking for a real file at that path.
**Fix:** create `client/vercel.json`:

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

Commit and push. Navigating with the navbar works without this — a direct load or
refresh does not, and the marker will refresh.

### The site loads with Vite's default page

`App.jsx` was never replaced, or the wrong branch is deployed. Check the deployed
commit hash against `git log`.

---

## §D — Data does not load on the deployed site

Open the browser console first. The message tells you which of these it is.

### `Failed to fetch` / the request goes to `undefined/api/prices`

`VITE_API_URL` is missing from the build.
**Fix:** Vercel → Settings → Environment Variables → add `VITE_API_URL` →
**then redeploy**. Vite inlines env vars at build time, so the existing bundle
will never pick it up no matter how correct the dashboard looks.

### The request goes to `https://host//api/prices` (double slash)

Trailing slash on `VITE_API_URL`.
**Fix:** remove it, redeploy.

### `blocked by CORS policy: No 'Access-Control-Allow-Origin' header`

`app.use(cors())` is registered **after** the routes.
**Fix:** in `server/server.js`, `cors()` must come before
`app.use('/api/prices', priceRoutes)`. Push and let Railway redeploy.

Diagnostic: if `curl <railway>/api/prices` returns JSON but the browser cannot,
it is CORS, not the API.

### `Mixed Content: ... requested an insecure resource`

`VITE_API_URL` uses `http://` while the page is on `https://`.
**Fix:** use the `https://` Railway domain.

### The offline banner shows on the deployed site

The client cannot reach the API — work through §A, §B and §D above. The banner is
working correctly; something upstream is broken.

---

## §E — Application behaviour

### The page reloads when the form is submitted

`event.preventDefault()` is missing from `handleSubmit`.

### Console: "Each child in a list should have a unique key"

The map is using the array index, or `key` is missing entirely.
**Fix:** `key={p._id}`. Index keys break because new records are prepended.

### The average shows `NaN`

Dividing by zero on an empty filtered set, or `price` arrived as a string.
**Fix:** guard with `filtered.length ? ... : 0`, and send `Number(form.price)`
from the form.

### The new record does not appear at the top

Either the API sort is wrong (`sort({ createdAt: -1 })`) or state was appended
instead of prepended (`[saved, ...prev]`).

### Validation errors never clear

`handleChange` is not clearing that field's error.
**Fix:** `setErrors(prev => ({ ...prev, [field]: undefined }))`.

### A valid submit is rejected with a server message

Client and server rules have drifted. Check both against the table in
`docs/requirements.md` — the same seven rules must exist on both sides.

### Horizontal scroll on mobile

Something is wider than the viewport — usually a fixed pixel width or a long
unbroken string.
**Fix:** `max-width: 100%` on the offender. Find it by setting
`* { outline: 1px solid red; }` temporarily at 320px.

### iOS zooms in when a field is focused

Input `font-size` is below 16px. **Fix:** set it to exactly `16px`.

---

## §F — Git and submission

### A member has no commits

**Fix, honestly and now:** that member makes a real change in **their own file** —
a validation message, a CSS value, a Home page sentence, an added fish — and
commits under their own git identity. Never fabricate history, and never commit
"on behalf of" someone. Verify with `git shortlog -sn --all`.

### Commits are attributed to the wrong person

`git config user.name` / `user.email` was never set on that machine. Fix it for
future commits (`docs/TEAM.md` has the exact commands). **Do not rewrite history
under time pressure** — a rebase gone wrong at 12:30 is far worse than one
mislabelled commit. Explain it in the contribution table instead.

### `.env` was committed

1. **Rotate the Atlas password immediately** — Database Access → Edit Password.
2. Update `server/.env` and the Railway variable with the new one.
3. `git rm --cached server/.env`, confirm `.gitignore` covers it, commit.

Removing the file from the working tree does **not** remove it from history. The
rotation is the fix; the deletion is tidying.

### The OneDrive video link asks for a login

Sharing is restricted. **Fix:** set link sharing to **anyone with the link** and
test it in an incognito window. A login-walled video counts as no video.

---

## When you are out of time

Triage in this order — highest marks per minute first:

1. **The Vercel link must open.** Nothing else matters if the marker cannot open it.
2. **The API must return JSON.** If Railway is unrecoverable, the labelled offline
   fallback keeps the UI demonstrable — say so honestly, do not hide it.
3. **The README and the AI prompt log** are worth marks and cost no deployment risk.
4. **All four members must have commits.**
5. **The video must be under 2:00 and openable.**

Do not start debugging a new feature at 12:30. A working core with an honest gap
scores better than a broken everything.
