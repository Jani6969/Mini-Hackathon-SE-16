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
| 2 | | | | | |
| 3 | | | | | |
| 4 | | | | | |
| 5 | | | | | |
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
| Claude | ☐ | |
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
