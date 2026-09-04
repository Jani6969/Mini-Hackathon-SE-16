# Design System — Negombo Fish Price Board

**Owner: Member D (Samaranayaka S.G.V.S).** Nobody else edits
`client/src/index.css`.

## Design rule

Civic utility, not a startup landing page. The users are fishermen and small
buyers standing outdoors in bright sunlight, on cheap Android phones, on mobile
data, deciding whether to accept a price in the next thirty seconds.

Every decision follows from that: high contrast, large targets, no web fonts, no
decoration that costs load time. Glassmorphism, gradients and animation are
**explicitly rejected** here — not because they are bad, but because they are
wrong for this audience.

## Brand

- **Product name:** Negombo Fish Price Board
- **Audience:** small-scale fishermen, small buyers, retail sellers
- **Visual tone:** plain, legible, trustworthy, unfussy
- **Trust level:** high — it must not look like it is selling something
- **References:** a public noticeboard, not a marketplace app

## Colors

| Token | Value | Usage |
|---|---|---|
| primary | `#0d2b6b` | nav bar, buttons, price figures |
| background | `#f4f7fa` | page background |
| surface | `#ffffff` | cards, panels |
| text | `#12263f` | main text |
| muted | `#6b7a90` | secondary text, reporter name, dates |
| border | `#cbd5e1` | input borders |
| danger | `#c0392b` | validation errors |
| summary | `#e8eefc` | the count + average bar |
| notice | `#fff7dc` / border `#eed27a` | prototype notice |
| offline | `#fff3cd` / border `#e6c55a` | offline banner |

Deep navy on near-white is legible in sunlight. There is no success green — a
successful submit is signalled by navigating to the list and seeing the record at
the top, which is stronger feedback than a toast.

## Typography

- **Font:** `system-ui, -apple-system, sans-serif` — no web font, no network
  request, no layout shift, and it renders in the user's own system language
  settings.
- **Headings:** default weight hierarchy, no custom scale.
- **Body:** browser default size. Not reduced.
- **Numbers / price:** 20px, weight 700, primary navy — the price is the single
  most important element on a card and should be readable at arm's length.
- **Inputs:** exactly **16px**. Below 16px, iOS Safari zooms the page when a
  field is focused, which breaks the layout mid-form.

## Layout

- **Max width:** 900px, centred (`.page`)
- **Grid:** `repeat(auto-fit, minmax(240px, 1fr))` — the card grid reflows at
  every width with **no breakpoint**. This is the responsiveness answer in the viva.
- **Spacing:** 20px page padding, 16px card padding, 14px grid gap
- **Mobile:** single column; nav stacks below 600px; no horizontal scroll at 320px
- **Desktop:** two to three cards per row inside the 900px column

One media query exists in the entire stylesheet, and only to stack the nav.

## Components

| Component | Spec |
|---|---|
| **Nav** | Flex, navy background, white links, brand on the left, links on the right; stacks below 600px |
| **Card** | White, 10px radius, 16px padding, soft shadow `0 1px 4px rgba(0,0,0,.08)`, 16px bottom margin |
| **Grid** | `auto-fit` + `minmax(240px, 1fr)`, 14px gap |
| **Filters** | Flex row, wraps; search input `flex: 2` (min 200px), select `flex: 1` (min 150px) |
| **Form** | Block labels above full-width controls; 10px padding; 8px radius; 1px `#cbd5e1` border |
| **Button** | Navy, white text, no border, 12px/22px padding, 8px radius, 16px text; `opacity: .6` when disabled |
| **Error** | `#c0392b`, 14px, sits directly under its field |
| **Summary bar** | Light blue block showing the filtered count and the average |
| **Notice** | Warm yellow block — the prototype disclaimer on the Home page |
| **Offline banner** | Full-width yellow strip below the nav, `role="status"` |

No modals. No toasts. No tables. Nothing that needs JavaScript to be legible.

## States

Every UI must handle these. They are the difference between the top usability
band and the one below it — most teams ship the happy path only.

| State | Where | What the user sees |
|---|---|---|
| **loading** | `/prices` | "Loading prices..." |
| **empty** | `/prices` | "No prices found for that search." |
| **error** | `/add` | the server's rejection message, in red, in the form |
| **validation** | `/add` | a friendly message under each bad field |
| **saving** | `/add` | button disabled, text reads "Saving..." |
| **offline** | everywhere | persistent banner: sample data, not persisted |
| **success** | `/add` → `/prices` | navigates to the list, new record at the top |
| **disabled** | button | `opacity: .6` |
| **hover** | nav links | underline |
| **focus** | all controls | browser default focus ring — **never removed** |
| **mobile** | everywhere | single column, no horizontal scroll |

## Accessibility

- Every input has a `<label htmlFor>` matching its `id`
- A real `<form>` element with `onSubmit`, so the Enter key submits
- `noValidate` on the form so our friendly messages are shown instead of the
  browser's default bubbles — validation still runs, ours just replaces it
- The offline banner carries `role="status"` so it is announced
- Focus outlines are never removed
- Touch targets: buttons and inputs are 40px+ tall by padding
- Navy `#0d2b6b` on white and on `#f4f7fa` exceeds WCAG AA contrast for body text
- No animation, so no reduced-motion handling is required — the honest reason is
  that there is no motion to reduce

## Explicitly out of scope

Dark mode · icon library · web fonts · CSS framework · animation · toasts ·
skeleton loaders · charts · a component library · theming tokens beyond the table
above.

Adding any of these after the interface is clean and responsive is on the "do not
build" list in `agent/BRIEF.md`.
