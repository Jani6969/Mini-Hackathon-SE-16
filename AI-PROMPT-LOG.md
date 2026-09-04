# AI Prompt Log — Group SE_016

**Mandatory (spec §2.2).** Fill this in **as you work**, not at submission time.
A log reconstructed at 12:40 reads as one, and the criterion is about honest
disclosure.

---

## Rules

1. Record **exact significant prompts**, not summaries. A significant prompt is
   one that produced code, structure, or a decision that ended up in the project.
2. **Redact** passwords, API keys, connection strings, and personal data before
   pasting. Replace with `<REDACTED>`.
3. The **"how output was checked"** column is what earns the mark. "Reviewed the
   diff, ran the app, tested the validation, changed X" is an answer. "Used it" is not.
4. Declare AI use in **both** the README and the submission PDF.
5. Contribution statements must be written in the team's **own words**.
6. **Every member must understand any AI-generated code they present.** If you
   cannot explain a line in your own file, rewrite it until you can.

---

## Log

| # | Member | Tool | Exact prompt | Purpose | How output was checked / modified |
|---|---|---|---|---|---|
| 1 | A | Codex | "Read all project files, add the provided `<REDACTED>` MongoDB URI to `.env`, build the project, seed data, push all code to the `main` branch of `Jani6969/Mini-Hackathon-SE-16`, then deploy a fully working project to Vercel and Railway." | Build, integrate and deploy the scoped MVP. | Followed the approved reference code; reviewed the diff; ran API, validation, build, secret-history and production persistence checks. |
| 2 | D, B, C | Codex | "Make the UI look advanced, professional and elegant using the supplied screenshots and Stitch project. Generate higher-quality images if needed and add a dashboard." | Redesign public pages and add a market dashboard without expanding the approved feature scope. | Compared the supplied references and Stitch export, generated and compressed an original 1800×1013 hero image, reviewed responsive CSS and component diffs, completed a Vercel preview build, and visually checked the homepage and live-data dashboard. Kept sample/community-data disclosure visible and chose a public dashboard instead of an unsupported admin panel. |
| 3 | _(fill in — see note below)_ | Claude Code | "Add the Google Stitch MCP server, read the Stitch project `Website Homepage Design`, and rebuild the client UI to match those mockups." | Replace the plain starter CSS with a coherent dark "dockside terminal" visual system across Home, Prices, Report and 404. | Read the Stitch HTML export but did **not** adopt it — it ships Tailwind via CDN, which would have broken the plain-CSS stack recorded in `CLAUDE.md`, so every screen was rewritten as plain CSS by hand. Verified the production build, checked for console errors, confirmed no horizontal scroll at 320px and that focus rings survived. Deliberately dropped the mockup's live ticker, market-spread chart, boat names and grade chips: no field in the `Price` schema backs them, and inventing figures would have breached the prototype-notice rule. Recorded in `agent/DECISIONS.md`. |
| 4 | _(fill in — see note below)_ | Claude Code | Long structured specification — reproduced in full in **Appendix A** below. Opens: "ROLE — You are a senior full-stack engineer working inside my existing SE3090 Mini Hackathon project: Negombo Fish Price Board ... TASK — Add secure per-report ownership using a 4-digit Edit PIN and implement: 1. CREATE report with PIN 2. EDIT / UPDATE report using PIN verification 3. DELETE report using PIN verification 4. Automatic deletion after 24 hours using MongoDB TTL ..." | Let a reporter edit or delete their own price report without adding accounts or login, and expire stale reports automatically. | Wrote a throwaway end-to-end script and ran **50 assertions against a real MongoDB** (an in-memory `mongod`, installed with `--no-save` so it never entered `package.json`, and removed afterwards): create, edit, delete, wrong-PIN 403s, TTL index presence, and that editing does not reset the expiry. Deliberately tried to overwrite `_id`, `editPinHash`, `createdAt` and `expiresAt` through the request body — the field whitelist held. Rejected the spec's own `expires: 0` shorthand for the TTL index (0 is falsy on that path) in favour of an explicit `index({ expiresAt: 1 }, { expireAfterSeconds: 0 })`. Caught a real bug the spec did not anticipate: a rejected character stayed in the DOM input, consumed the `maxLength` budget and silently blocked the next digit — fixed in `client/src/utils/pin.js`. Added a case the spec missed: records predating the feature have no hash, so `bcrypt.compare` would have thrown a 500; they now return an explanatory 403. Did **not** run `npm run seed`, which still wipes the collection. The Edit/Delete modals were **not** driven in a browser — no local `.env` existed — and that gap is recorded in `agent/TODO.md` and `docs/TESTING.md` Suite J. |
| 5 | B, D | Codex | "so do this first create 10 fish categories. so then we need to make 10 images for those categories. then here fish phot we option we need to remove. when user select fish type from here that fish image need to automaically attach to that todays price card that fish type" | Add 10 fish categories with automatic category images and no photo upload field. | Generated and visually inspected 10 distinct fish photos, compressed each to 1200×900 JPEG, centralized category/image mapping, ran mapping assertions and production build. |
| 6 | | | | | |
| 7 | | | | | |
| 8 | | | | | |

---

## Worked example of a good row

| # | Member | Tool | Exact prompt | Purpose | How output was checked / modified |
|---|---|---|---|---|---|
| 0 | B | Codex | "Write a React controlled form with four fields (select fish, select market, number price, text seller). Validate on submit: all required, price numeric and between 1 and 10000, seller at least 3 characters. Show a friendly message under each field and clear that field's error when the user types." | Generate the first draft of `AddPrice.jsx` | Read the whole diff. Ran it locally and tested all six failure cases plus the boundary at 10000. It used `onBlur` validation, which meant errors appeared before the user finished typing — changed it to validate on submit and clear on change. Also added the `saving` state and the `apiError` display, which were not in the output. |

Note what makes it good: the prompt is exact and reproducible, the purpose is
specific, and the check column names **what was tested and what was changed**.

---

## Tools actually used

Delete any row the team did not use. Do not list a tool for completeness.

| Tool | Used? | Used for |
|---|---|---|
| Codex | ☑ | Application implementation, verification and deployment |
| ChatGPT | ☐ | |
| Claude | ☑ | UI rebuild from the Stitch mockups (row 3); Edit PIN ownership and 24-hour expiry (row 4) |
| GitHub Copilot | ☐ | |
| Other | ☐ | |

---

## Declaration

The team used the AI tools listed above during this hackathon. All generated
output was reviewed, executed and tested by the team before being committed. Each
member can explain the code in the files they own, and the contribution statements
in the README and the submission PDF are written in the team's own words.

No credentials, connection strings or personal data appear in the prompts recorded
above.

**Two fields still need the team's input before submission:**

1. The **Member** column for rows 3 and 4 — whoever ran those Claude Code
   sessions must put their own initial there. It is left blank rather than
   guessed, because attributing work to the wrong member is exactly the kind of
   thing this log exists to prevent.
2. Rows 3 and 4 touch files owned by more than one member (`index.css`,
   `AddPrice.jsx`, `PriceList.jsx`, the API layer). Under rule 6, each owner
   needs to read their own file and be able to explain it before the viva.

---

## Appendix A — full prompt for row 4

Reproduced exactly as issued, because rule 1 asks for exact prompts and this one
is far too long for a table cell. Nothing has been added or paraphrased; only
the surrounding chat formatting is gone.

```text
ROLE

You are a senior full-stack engineer working inside my existing SE3090 Mini Hackathon project:

Project: Negombo Fish Price Board

Current stack:
- Frontend: React + Vite
- Routing: React Router
- Backend: Node.js + Express
- Database: MongoDB Atlas
- ODM: Mongoose
- Frontend deployment: Vercel
- Backend deployment: Railway

The existing application already supports:
- Viewing fish price reports
- Searching/filtering reports
- Calculating average price
- Adding a new price report
- MongoDB persistence

Do NOT rebuild the project or change the stack.
Modify the existing codebase carefully.


TASK

Add secure per-report ownership using a 4-digit Edit PIN and implement:

1. CREATE report with PIN
2. EDIT / UPDATE report using PIN verification
3. DELETE report using PIN verification
4. Automatic deletion after 24 hours using MongoDB TTL
5. Frontend UI for Edit/Delete/PIN verification
6. Friendly validation/error/success messages
7. Preserve existing search/filter/average functionality
8. Make everything work locally and after Vercel + Railway deployment


CONTEXT

This is a 4-hour university Mini Hackathon prototype.

We intentionally DO NOT want:
- Full user registration
- Login
- JWT authentication
- Email recovery
- Phone verification
- Admin dashboard

Instead, each individual report is protected by a private 4-digit PIN.

Example flow:

User creates:

Fish: Balaya (Skipjack)
Landing site: Pitipana
Price: 950
Reporter: Nimal
Edit PIN: 4826

The backend must hash the PIN.

MongoDB should store something conceptually like:

{
  fish: "Balaya (Skipjack)",
  market: "Pitipana",
  price: 950,
  seller: "Nimal",
  editPinHash: "<bcrypt hash>",
  createdAt: "...",
  updatedAt: "...",
  expiresAt: "24 hours after creation"
}

NEVER store the raw PIN.

NEVER return editPinHash to the frontend.

NEVER log the raw PIN or hash.


REASONING / IMPLEMENTATION REQUIREMENTS


A. DEPENDENCY

Use `bcryptjs`, not native `bcrypt`, because this needs to deploy reliably on Railway without native compilation problems.

Install if missing:

npm install bcryptjs


B. MONGOOSE MODEL

Update the existing Price schema.

Keep all existing fields.

Add:

editPinHash:
- String
- required
- hidden from normal queries/API output using `select: false`

expiresAt:
- Date
- default = current time + 24 hours
- MongoDB TTL index
- expire when expiresAt is reached

Use MongoDB TTL correctly.

Conceptually:

expiresAt: {
  type: Date,
  default: () => new Date(Date.now() + 24 * 60 * 60 * 1000),
  expires: 0
}

Important:
Updating a report MUST NOT reset its 24-hour expiry time.

A report created at 10:00 AM and edited at 4:00 PM must still expire at 10:00 AM the next day.

Remember that MongoDB TTL deletion is asynchronous and may happen shortly after the exact timestamp.


C. CREATE REPORT — POST /api/prices

Extend the existing POST endpoint.

Frontend request:

{
  "fish": "Balaya (Skipjack)",
  "market": "Pitipana",
  "price": 950,
  "seller": "Nimal",
  "editPin": "4826"
}

Validate editPin:

- Required
- Exactly 4 digits
- Numeric string only
- "0000" is technically valid unless there is a strong reason to reject it

Regex idea:

/^\d{4}$/

If invalid return HTTP 400 with a friendly message:

"Edit PIN must contain exactly 4 digits."

Hash using bcryptjs before storing.

Example concept:

const editPinHash = await bcrypt.hash(editPin, 10);

Never save `editPin`.

Create the report with editPinHash.

Return HTTP 201.

API response should contain the created price report but never editPinHash or editPin.

Example:

{
  "success": true,
  "message": "Price recorded successfully",
  "data": { ...safe report fields }
}


D. UPDATE / EDIT

Implement:

PUT /api/prices/:id

The request should contain:

{
  "fish": "...",
  "market": "...",
  "price": 980,
  "seller": "...",
  "editPin": "4826"
}

Flow MUST be:

request
-> validate MongoDB ID
-> find report including hidden editPinHash
-> if missing => 404
-> validate PIN format
-> bcrypt.compare()
-> wrong PIN => 403
-> validate edited data
-> update allowed fields
-> save
-> return updated safe report

Because editPinHash uses select:false, retrieve it deliberately, e.g. conceptually:

Price.findById(id).select('+editPinHash')

Do NOT use an insecure update that bypasses ownership verification.

Only these fields may be edited:

- fish
- market
- price
- seller

Do NOT allow the client to update:

- _id
- editPinHash
- createdAt
- updatedAt directly
- expiresAt

Updating a report must preserve the original expiresAt.

Wrong PIN response:

HTTP 403

{
  "success": false,
  "message": "Incorrect edit PIN."
}

Missing record:

HTTP 404

{
  "success": false,
  "message": "Price report not found."
}


E. DELETE REPORT

Implement:

DELETE /api/prices/:id

For the DELETE request, send the edit PIN safely in the JSON request body:

{
  "editPin": "4826"
}

Flow:

DELETE
-> find record including editPinHash
-> record missing => 404
-> validate PIN
-> compare PIN with hash
-> wrong PIN => 403
-> delete document
-> 200 success response

Do NOT delete before PIN verification.

Success:

{
  "success": true,
  "message": "Price report deleted successfully."
}


F. FRONTEND — ADD PRICE FORM

Extend the existing Report Price form with:

Edit PIN
[____]

Use:

type="password"
inputMode="numeric"
maxLength={4}

Allow digits only.

Show helper text:

"Create a 4-digit PIN. You will need it to edit or delete this report."

Also show:

"Reports automatically expire after 24 hours."

Validation:

- Empty => "Please create a 4-digit Edit PIN."
- Wrong format => "Edit PIN must contain exactly 4 digits."

Do not store the PIN in:
- localStorage
- sessionStorage
- React global state after submission
- browser URL
- logs

After successful submission, clear the PIN field.


G. PRICE CARD ACTIONS

Every live database price card should have:

[ Edit ] [ Delete ]

Design it cleanly and responsively.

Example:

+-----------------------------+
| Balaya (Skipjack)           |
| Rs. 950 /kg                 |
| Pitipana                    |
| Reported by Nimal           |
| Expires in: 18h             |
|                             |
| [ Edit ]       [ Delete ]   |
+-----------------------------+


H. EDIT UI

When Edit is clicked:

Open a modal/dialog.

Do NOT navigate to a complicated new page.

Prefill:

Fish
Landing site
Price
Reporter

Also ask:

Edit PIN
[____]

Buttons:

[Cancel] [Save Changes]

Validate the normal fields and PIN.

On Save:

PUT /api/prices/:id

If successful:

- Update the corresponding item in React state
- Close modal
- Show friendly success message
- Do NOT refresh the entire browser page
- Search/filter/average should continue working automatically

Wrong PIN should keep the modal open and show:

"Incorrect edit PIN."


I. DELETE UI

When Delete is clicked, DO NOT immediately delete.

Open a confirmation modal:

Delete this price report?

To protect this report, enter the 4-digit Edit PIN.

PIN: [____]

[Cancel] [Delete Report]

Delete button should visually look destructive.

On confirmation:

DELETE /api/prices/:id
body: { editPin }

Wrong PIN:
- Keep modal open
- Show "Incorrect edit PIN."

Successful deletion:
- Remove the record from React state
- Close modal
- Show "Price report deleted successfully."
- Search/filter/average must automatically recalculate


J. FORGOT PIN UX

Do NOT implement PIN recovery.

In Edit/Delete dialog include small text:

"Forgot your PIN? For privacy, Edit PINs cannot be recovered. This report will automatically expire within 24 hours."

This is deliberate prototype behaviour.

Do not add fake email/phone recovery.


K. EXPIRATION DISPLAY

If API returns expiresAt, display a simple useful indication.

Examples:

"Expires in 18h"
"Expires in 45m"
"Expiring soon"

Do not create a complicated timer system.

A simple calculation when rendering is enough.

The API should return expiresAt to the frontend.

editPinHash must remain hidden.


L. EXISTING DATABASE RECORDS

This is important.

The current MongoDB database may contain seed/sample records created before Edit PIN support.

Do NOT let required editPinHash/expiresAt changes silently break the app.

Inspect the existing seed script.

Update seed data so seeded DB records receive:
- a hashed demo PIN
- expiresAt

Use one simple documented demo PIN for seed records, such as:

1234

Only for SEED/DEMO records.

Mention clearly in README:

"Seed records use Edit PIN 1234 for demonstration."

Do NOT use 1234 automatically for real user-submitted reports.

If necessary, clean/reseed old hackathon records rather than writing a complicated migration.

Never delete production data automatically without first identifying exactly what the existing seed workflow does.


M. API CLIENT

Update the existing frontend API service.

Keep API calls centralized.

Implement functions conceptually similar to:

createPrice(entry)

updatePrice(id, entry)

deletePrice(id, editPin)

Do not scatter fetch() calls throughout UI components.

Handle:
- network errors
- non-JSON errors where practical
- HTTP error messages from backend

Existing fallback sample-data behavior must NOT pretend edits/deletes are persisted.

If the app is in fallback/offline sample mode:

Either disable Edit/Delete with a clear message:

"Editing is unavailable while demo data is being shown."

OR implement temporary UI-only changes but label them clearly as non-persistent.

Prefer disabling persistence actions during fallback mode.


N. SECURITY RULES

Must satisfy all:

[ ] Raw PIN never stored in MongoDB
[ ] Raw PIN never logged
[ ] editPinHash never returned by API
[ ] editPinHash uses select:false
[ ] PIN comparison happens server-side
[ ] Wrong PIN returns 403
[ ] Invalid input returns 400
[ ] Missing report returns 404
[ ] Database/server failures return 500 where appropriate
[ ] Client cannot overwrite expiresAt
[ ] Client cannot overwrite editPinHash
[ ] Edit preserves original expiration
[ ] Delete requires PIN verification
[ ] Server validation exists even if frontend validation exists


O. HEALTH ENDPOINT

If `/health` already exists, preserve it.

It should continue reporting API/database status.

Do not expose secrets.


P. RESPONSIVE DESIGN

The Edit and Delete controls and modal must work on:
- Desktop
- Mobile width

No horizontal overflow.

Do not redesign the entire existing UI.

Match the existing visual style.


Q. DEPLOYMENT

After implementation:

1. Run backend locally.
2. Verify MongoDB connection.
3. Run frontend locally.
4. Test full CRUD-related flow.
5. Ensure environment variables remain external.
6. Push changes.
7. Railway should redeploy backend.
8. Vercel should redeploy frontend.
9. Test production version in Incognito.

Do NOT put secrets into Git.


R. MANUAL TESTS

Perform or provide exact manual tests for:

TEST 1 — Create
- Empty PIN
- 3-digit PIN
- letters
- correct 4-digit PIN
- verify document appears in Atlas
- verify only hash exists, not raw PIN

TEST 2 — Edit wrong PIN
- Enter wrong PIN
- expect HTTP 403
- database must remain unchanged

TEST 3 — Edit correct PIN
- Change price 950 -> 980
- correct PIN
- expect success
- UI updates
- Atlas shows 980
- expiresAt remains unchanged

TEST 4 — Delete wrong PIN
- expect 403
- record remains

TEST 5 — Delete correct PIN
- record removed
- UI removes card
- Atlas confirms deletion

TEST 6 — TTL
- Confirm expiresAt is roughly creation time + 24 hours
- Confirm TTL index exists
- Do not wait 24 hours
- Explain that MongoDB TTL monitor removes expired documents asynchronously

TEST 7 — Existing seed data
- Seed records work
- Document demo PIN used for seed only

TEST 8 — Regression
- Search still works
- Market filter still works
- Average still recalculates
- Add still works
- Mobile layout still works
- Production deployment works


OUTPUT

Work directly in the existing repository.

Before editing:
1. Inspect the current project structure.
2. Identify the actual relevant files.
3. Briefly state which files need changing.
4. Reuse current architecture/components instead of duplicating them.

Then implement the complete feature.

At the end provide:

1. Files changed
2. New dependency added
3. API endpoints
4. MongoDB schema changes
5. Frontend behavior
6. Security decisions
7. How existing seed records were handled
8. Exact local test commands
9. Exact production verification steps
10. Any remaining risks

Also update README if appropriate with:

### Report Ownership & Expiry
- Each report has a user-created 4-digit Edit PIN.
- Only the bcrypt hash is stored.
- Correct PIN is required for Edit/Delete.
- PINs cannot be recovered.
- Reports automatically expire after 24 hours.
- MongoDB TTL performs the automatic cleanup.
- Seed/demo records use PIN 1234 only if the seed script was updated that way.


STOPPING

Do NOT:
- Add authentication/JWT
- Add registration/login
- Add email/SMS PIN recovery
- Replace MongoDB
- Replace Express
- Replace React
- Redesign unrelated pages
- Add admin features
- Add unnecessary libraries
- Expose secrets
- Store raw PINs
- Change existing working features unnecessarily

If a destructive database reset/reseed is required, STOP before doing it and tell me:
- exactly what will be deleted,
- why it is necessary,
- and the safer alternatives.

Wait for my approval before deleting/reseeding existing MongoDB data.


FINAL CHECKLIST

[ ] Add form has 4-digit Edit PIN
[ ] PIN validation works frontend + backend
[ ] PIN is bcryptjs hashed
[ ] Raw PIN is never stored
[ ] Hash is never returned to frontend
[ ] PUT /api/prices/:id verifies PIN
[ ] DELETE /api/prices/:id verifies PIN
[ ] Wrong PIN returns 403
[ ] Edit modal is prefilled
[ ] Delete confirmation asks for PIN
[ ] Successful Edit updates React state
[ ] Successful Delete removes React state item
[ ] Edit does NOT reset expiry
[ ] expiresAt = creation + 24 hours
[ ] MongoDB TTL index is configured
[ ] UI displays expiration information
[ ] Forgot-PIN message explains no recovery + auto expiry
[ ] Existing seed records are handled safely
[ ] Seed PIN is documented if used
[ ] Search still works
[ ] Filter still works
[ ] Average still works
[ ] Responsive layout still works
[ ] Fallback/demo mode does not pretend changes are persisted
[ ] Railway backend works
[ ] Vercel frontend works
[ ] MongoDB Atlas proves create/edit/delete persistence
[ ] No secrets committed
[ ] README updated
```

### Where the output was not accepted as given

Recorded here because the mark is for judgement, not for the size of the prompt.

| The prompt asked for | What was actually done, and why |
|---|---|
| `expires: 0` on the `expiresAt` field | Rejected. Used `priceSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })` instead — `0` is falsy on the shorthand path, so the index is not reliably created. The index was then confirmed present in a live database. |
| Nothing about pre-existing records without a PIN | `bcrypt.compare(pin, undefined)` throws, which would have surfaced as a 500. Those records now return a 403 that explains they predate Edit PINs. |
| "clean/reseed old hackathon records" if necessary | Not done. `npm run seed` already contained `deleteMany({})` before this session, so reseeding would wipe the collection. The prompt itself said to stop and ask first; no database was touched. |
| "Test production version in Incognito" | Not done in this session, and not claimed. The Edit/Delete modals have never been opened in a browser — there was no local `.env`, so no database to run against. Logged in `agent/TODO.md` and as Suite J in `docs/TESTING.md`. |

The digit-only PIN input also had a defect the prompt did not predict: a rejected
character stayed in the DOM while React state dropped it, so it counted against
`maxLength` and blocked the next real digit. Found by typing `48a2b6999` into the
field and reading back `482` instead of `4826`.
