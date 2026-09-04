# Design System — Negombo Fish Price Board

**Owner: Member D (Samaranayaka S.G.V.S).** Nobody else edits
`client/src/index.css`.

## Design rule

Civic utility with a dockside-terminal character. The users are fishermen and
small buyers deciding whether to accept a price in the next thirty seconds, often
outdoors, on cheap Android phones, on mobile data.

The theme is dark, high contrast and monospaced — closer to a harbour information
board or a trading terminal than a startup landing page. Decoration is still
rejected: no gradients on text, no animation, no parallax, nothing that costs
load time or delays the price appearing on screen.

Screen layouts were designed in Google Stitch and then rewritten by hand as plain
CSS. No Tailwind, no CSS framework, no build step beyond Vite.

## Brand

- **Product name:** Negombo Fish Price Board
- **Audience:** small-scale fishermen, small buyers, retail sellers
- **Visual tone:** dark, technical, legible, trustworthy
- **Trust level:** high — it must not look like it is selling something
- **References:** a harbour price ticker, not a marketplace app

## Colors

Dark theme only. Tokens are declared once as CSS custom properties on `:root`.

| Token | Value | Usage |
|---|---|---|
| `--surface` | `#0c1321` | page background |
| `--surface-lowest` | `#070e1c` | top strip, footer, input fields |
| `--surface-low` | `#151b2a` | cards, panels, nav bar |
| `--surface-container` | `#19202e` | image wells |
| `--surface-high` | `#232a39` | nav link hover |
| `--on-surface` | `#dce2f7` | headings, primary text |
| `--on-surface-variant` | `#bec8d2` | body text |
| `--outline` | `#88929b` | muted text, placeholders |
| `--outline-variant` | `#3e4850` | borders, dividers |
| `--primary` | `#89ceff` | links, price figures |
| `--accent` | `#0ea5e9` | primary buttons, active nav, eyebrows, focus ring |
| `--on-accent` | `#00243a` | text on an accent button |
| `--secondary` / `--secondary-container` | `#b4c7ed` / `#344767` | chips |
| `--tertiary` / `--tertiary-container` | `#ffb95f` / `#d88a00` | notices, offline banner, average price |
| `--error` | `#ffb4ab` | validation errors |

`#dce2f7` on `#0c1321` is roughly 14:1 — far above WCAG AA. `#88929b`, the
dimmest text on the page, is still above 4.5:1. There is no success green: a
successful submit navigates to the list where the new record sits at the top,
which is stronger feedback than a toast.

## Typography

- **Display / headings:** `Space Grotesk` 600–700
- **Body, data, labels:** `JetBrains Mono` 400/700
- Both load from Google Fonts with `display=swap` and a real fallback stack
  (`system-ui` and `ui-monospace`). If the network is slow or blocked the page
  still renders in system fonts with no layout break.
- **Headings:** `h1` 40px (48px in the hero), `h2` 26px, `h3` 18px, all with
  tight negative letter-spacing.
- **Body:** 15px, line-height 1.6.
- **Eyebrow / label:** 10–11px, uppercase, `0.14–0.18em` letter-spacing.
- **Price figures:** 20px weight 700, `--primary`, on a dark plate over the photo.
- **Inputs:** exactly **16px**. Below 16px, iOS Safari zooms the page when a
  field is focused, which breaks the layout mid-form.

## Layout

- **Max width:** 1200px, centred (`.shell`, `.page`)
- **Card grid:** `repeat(auto-fit, minmax(280px, 1fr))` — reflows at every width
  with no breakpoint. This is the responsiveness answer in the viva.
- **Hero and form:** two columns that collapse to one at 860px
- **Spacing scale:** 4 / 8 / 16 / 24 / 32 / 48px as `--gap-*` tokens
- **Radius:** 4px base, 8px large, 12px panels
- **Mobile:** single column; nav stacks below 600px; no horizontal scroll at 320px

Two media queries exist in the entire stylesheet: 860px collapses the two-column
layouts, 600px stacks the navigation and tightens page padding. Everything else
reflows on its own.

## Components

| Component | Spec |
|---|---|
| **Top strip** | Thin uppercase status bar above the nav — report count and landing-site count |
| **Nav** | Sticky, `--surface-low`, logo + wordmark left, uppercase links right; active link is a solid accent pill; stacks below 600px |
| **Hero** | Two columns — headline with an accent phrase, lede, two buttons, and a photo panel |
| **Stats strip** | `auto-fit` grid of label/value cells separated by 1px rules; values are real (count, average, lowest, highest) |
| **Fish card** | Photo with a 4:3 aspect ratio, price plate over the bottom-right corner, fish name, chips for landing site and date, reporter on a divided footer row |
| **Chip** | 11px uppercase, `--secondary` on `--secondary-container` |
| **Panel** | `--surface-low`, 1px `--outline-variant` border, 12px radius, 24px padding |
| **Info card** | Panel variant used for problem/solution/steps blocks |
| **Filters** | Flex row, wraps; search input `flex: 2` (min 200px), select `flex: 1` (min 160px) |
| **Form** | Uppercase labels above full-width controls; custom CSS select arrow; live preview panel beside it on desktop |
| **Button** | `.btn-primary` accent fill, `.btn-ghost` outlined; 44px min height; `opacity: .6` when disabled |
| **Error** | `--error`, 13px, sits directly under its field, wired with `aria-describedby` |
| **Notice** | Amber-tinted block with a thick left border — the prototype disclaimer |
| **Offline banner** | Full-width amber strip below the nav, `role="status"` |
| **Footer** | Four-column `auto-fit` grid plus a copyright base line |

No modals. No toasts. No charts. Nothing that needs JavaScript to be legible.

## Images

Photos live in `client/public/fish/` and are mapped by fish name in
`client/src/data/fishImages.js`.

- Real photos: `balaya`, `isso`, `thalapath`, `paraw`
- Generated placeholders awaiting real photos: `kelawalla`, `hurulla`, `koduwa`,
  and the `default` fallback
- To replace one, overwrite the file at the same path — no code change needed
- Every `<img>` carries `width`, `height` and `loading="lazy"` so the grid does
  not shift as photos arrive

## States

Every UI must handle these. They are the difference between the top usability
band and the one below it — most teams ship the happy path only.

| State | Where | What the user sees |
|---|---|---|
| **loading** | `/prices` | "Loading prices..." under the page heading |
| **empty** | `/prices` | A panel: "No prices found for that search." |
| **error** | `/add` | the server's rejection message, in red, in the form |
| **validation** | `/add` | a friendly message under each bad field |
| **saving** | `/add` | button disabled, text reads "Saving..." |
| **offline** | everywhere | persistent banner: sample data, not persisted |
| **success** | `/add` → `/prices` | navigates to the list, new record at the top |
| **preview** | `/add` | the report panel fills in live as the form is typed |
| **disabled** | button | `opacity: .6` |
| **hover** | nav links, cards | background lift; card border turns accent |
| **focus** | all controls | 2px accent outline — **never removed** |
| **404** | `*` | themed page with links back to home and prices |
| **mobile** | everywhere | single column, no horizontal scroll |

## Accessibility

- Every input has a `<label htmlFor>` matching its `id`
- Invalid fields carry `aria-invalid` and `aria-describedby` pointing at the
  error message
- A real `<form>` element with `onSubmit`, so the Enter key submits
- `noValidate` on the form so our friendly messages are shown instead of the
  browser's default bubbles — validation still runs, ours just replaces it
- The offline banner carries `role="status"` so it is announced
- Focus outlines are never removed; `:focus-visible` draws a 2px accent ring
- Touch targets: nav links, inputs and buttons are 44px+ tall
- Body and heading text exceed WCAG AA contrast on the dark surface
- The logo image in the nav has an empty `alt` because the wordmark beside it
  carries the name
- No animation, so no reduced-motion handling is required — the honest reason is
  that there is no motion to reduce

## Explicitly out of scope

Light mode · icon font · CSS framework · animation · toasts · skeleton loaders ·
charts · a component library.

Adding any of these is on the "do not build" list in `agent/BRIEF.md`.

## Change log

- **2026-09-04** — Rebuilt from the light navy theme to the current dark
  dockside-terminal theme. Screens were designed in Google Stitch (project
  `Website Homepage Design`) and rewritten by hand as plain CSS; the Stitch
  export's Tailwind CDN build was deliberately not adopted, so the stack table in
  `CLAUDE.md` still holds. All accessibility rules and UI states from the
  previous revision were carried over unchanged.
