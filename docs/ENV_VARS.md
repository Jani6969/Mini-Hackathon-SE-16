# Environment Variables

Three variables total. Two packages. Nothing is read from the repository root.

| Variable | Package | Local value | Production value | Set where |
|---|---|---|---|---|
| `MONGO_URI` | `server/` | Atlas connection string | same string | `server/.env` + Railway → Variables |
| `PORT` | `server/` | `5000` | **do not set** | `server/.env` only |
| `VITE_API_URL` | `client/` | `http://localhost:5000` | `https://<app>.up.railway.app` | `client/.env` + Vercel → Environment Variables |

Files already in the repo:

```
server/.env.example   template, committed
server/.env           real values, GITIGNORED
client/.env.example   template, committed
client/.env           real values, GITIGNORED
```

---

## `MONGO_URI`

The MongoDB Atlas connection string. **The only secret in this project.**

```
mongodb+srv://hackathon:<db_password>@cluster0.xxxxx.mongodb.net/fishprice?retryWrites=true&w=majority
```

Get it from Atlas → **Connect → Drivers**, then:

1. replace `<db_password>` with the real password
2. insert the database name `fishprice` before the `?`

Read by `server/server.js` and `server/seed.js` via `dotenv.config()`.

**Handling rules**

- Lives in exactly two places: `server/.env` and the Railway Variables dashboard.
- Never in a commit, never in Markdown, never pasted into chat, never logged.
- If it is ever committed: **rotate the Atlas password immediately**, then update
  `server/.env` and Railway. Deleting the commit is not enough — git history keeps it.
- Audit before submitting: `git log -p | grep -i "mongodb+srv"` must return nothing.

## `PORT`

Local Express port. `server.js` reads `process.env.PORT || 5000`.

**Do not set this on Railway.** Railway injects its own port and binds to it; a
hardcoded value makes the service unreachable even though the logs look healthy.

## `VITE_API_URL`

Base URL of the API, read by `client/src/api/priceApi.js` as
`import.meta.env.VITE_API_URL`.

Two rules that break deployments when ignored:

1. **No trailing slash.** `https://host/` produces `https://host//api/prices`.
2. **Vite bakes it in at build time.** It is not read at runtime. If you add or
   change it on Vercel *after* a deploy, the built bundle keeps the old value —
   you must **redeploy**. This is the single most common "works locally, broken in
   production" failure in this stack.

Only variables prefixed `VITE_` are exposed to client code. Anything in
`client/.env` is **shipped to the browser** — never put a secret there.

---

## Quick setup

```bash
# server
cp server/.env.example server/.env    # then paste MONGO_URI

# client
cp client/.env.example client/.env    # localhost default is already correct
```

Both `.env` files already exist in this repo with placeholders — fill
`MONGO_URI` and you can run the project.

## Verify

```bash
# both .env files are ignored — each should print a .gitignore match
git check-ignore -v server/.env client/.env

# nothing secret is tracked — should print nothing
git ls-files | grep -E "\.env$"

# API sees the database
curl -s http://localhost:5000/health      # {"status":"ok","database":"connected"}
```

If `/health` reports `database: disconnected`, the string is wrong or Atlas
Network Access is not set to `0.0.0.0/0`. See `docs/TROUBLESHOOTING.md`.

---

## Platform settings

**Railway** (service root directory `server`)

| Key | Value |
|---|---|
| `MONGO_URI` | the Atlas string |

Nothing else. No `PORT`, no `NODE_ENV`.

**Vercel** (project root directory `client`)

| Key | Value |
|---|---|
| `VITE_API_URL` | `https://<app>.up.railway.app` — no trailing slash |

Set it, then **redeploy**.
