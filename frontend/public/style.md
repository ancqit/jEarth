# Junction style guide

Canonical web UI: `/style` on jEarth.  
This file is the machine-readable mirror (`/style.md`) for agents.

## Principles

- Clear, simple, precise — map-chrome discipline.
- One job per control; no decoration for its own sake.
- Phone software chrome: ≤720px only; closed drawers by default; outside-tap + ~10s idle close.
- Prefer Get / Send verbs — do not say APK/IPA in user copy unless asked.

## Tokens

| Token | Value | Use |
| --- | --- | --- |
| `--forest` | `#194b31` | Primary actions |
| `--forest-mid` | `#17633e` | Links / hover |
| `--gold` | `#f3d782` | Brand mark / accents |
| `--paper` | `#f4f0e6` | Page ground |
| `--ink` | `#0f1f17` | Body text |
| `--font-ui` | DM Sans | Controls / UI |

Map-control scale: type ~0.68rem, height ~1.85rem, FAB ~2rem, radius ~0.55rem, shadow `0 8px 18px rgba(15,23,42,0.16)`, cream `rgba(255,252,245,0.96)`.

## Components

Live demos: `/style/components` (brand book `#components`).

- **Buttons:** Primary (forest), Secondary (glass), Ghost (gold wash), Disabled, map-scale Get, gold J FAB
- **Form:** label kicker + control; invalid uses danger border + plain-language error
- **Card:** kicker + Georgia title + mute body
- **Footer:** Caption mute (`--text-xs` / `#6b7c72`), page pad + safe-area; not a corner chip
- **Map chrome:** type 0.68rem · height 1.85rem · FAB 2rem · radius 0.55rem; phone-install UI ≤720px; drawers closed by default

## Get drawer

1. Gold J, bottom-left, under modals.
2. Safety line only: “Your phone scans us for safety”.
3. Equal Get | Send (Send primary on iOS Safari for WhatsApp share of Android).
4. Hide iOS app row until TestFlight URL exists.
5. Auto-close 10s; outside pointer dismiss; mobile width only.

## Branding / builds

- Source of truth: `branding/` in junctionFrontweb.
- `tools/sync-web-branding.mjs` on every web build — never ship Angular default favicon (~15KB).
- No APK/IPA under `public/downloads` during `cap sync`.

## Copyright

Canonical line on every Junction public site:

`© {year} Sunskriti Data Management Company`

- Caption: mute `#6b7c72` / `--mute`, `--text-xs` (~0.6875rem), regular weight
- Real footer chrome (fixed bottom or flex document footer) with `--page-pad-x` + safe-area — not a corner chip or hero-column orphan on phone
- Chapter: `/style/copyright`

## Agent checklist

- [ ] Forest / gold / paper / DM Sans
- [ ] Phone-install UI hidden >720px
- [ ] No APK jargon in UI copy
- [ ] Favicons from branding sync
- [ ] Drawers: closed default + dismiss rules
- [ ] Prefer existing map/Get patterns over new card stacks

## Chapters

1. `/style/components` — live component gallery
2. `/style/principles`
3. `/style/color-type`
4. `/style/controls`
5. `/style/branding-build`
6. `/style/agent-checklist`
7. `/style/copyright`
