# Junction style guide

Canonical visual brand book (11 sections, same as local preview):

- **Live:** `/style` embeds the full brand book under the jEarth Style nav (site header stays; Color / Type / Components / Agents quick links)
- **Color:** `/style#color` — 16 swatches + token table (HEX / RGB / Use) + page wash + forbidden list
- **Typography:** `/style#type` — specimens + full type-scale table (Caption → Login display)
- **Agents:** `/style#agents`
- **Standalone:** `/brand-book/index.html`
- **Prose book:** `/brand-book/JUNCTION-BRAND-BOOK.md`
- **Machine mirror:** `/style.md` (this file)

## Nav (must match preview)

1. Introduction `#intro`
2. Identity `#identity`
3. Color `#color`
4. Typography `#type`
5. Components `#components`
6. Layout `#layout`
7. Content `#content`
8. Platforms `#platforms`
9. Code `#code`
10. Governance `#gov`
11. Agents `#agents`

## Color tokens (canonical)

| Token | HEX | Use |
| --- | --- | --- |
| `--forest` | `#194b31` | Primary actions, theme-color |
| `--forest-mid` | `#17633e` | Links, hover, kickers |
| `--forest-bright` | `#1f7a4c` | Bright / active |
| `--forest-deep` | `#103d29` | Deep forest |
| `--gold` | `#f3d782` | Brand mark, FAB |
| `--gold-soft` | `#f7e9b8` | Soft gold fill |
| `--gold-deep` | `#d4b75e` | Gold depth |
| `--gold-ink` | `#8a6f1f` | Gold-on-paper text |
| `--paper` | `#f4f0e6` | Page ground |
| `--paper` (website) | `#f5f3ee` | Shell-only variant |
| `--paper-deep` | `#ebe4d4` | Gradient end |
| `--surface` | `#fffdf8` | Cards |
| `--ink` | `#0f1f17` | Body |
| `--ink-soft` | `#3d5248` | Lede |
| `--mute` | `#6b7c72` | Captions |
| `--danger` | `#92400e` | Errors |

**Forbidden:** purple gradients, glow stacks, SaaS blues, dark-mode-first shells, emoji chrome.

## Typography scale

| Role | Token | Default |
| --- | --- | --- |
| Caption | `--text-xs` | 0.6875rem · mute |
| Small | `--text-sm` | 0.75rem |
| Meta | `--text-md` | 0.875rem |
| Body | `--text-base` | 0.9375rem · leading 1.5 |
| H2 / wordmark | `--text-lg` | 1.0625rem |
| H1 UI | `--text-xl` | 1.25rem |
| Section | `--text-2xl` | clamp 1.35–1.75rem |
| Display | `--text-display` | clamp 1.5–2.25rem · Georgia |
| Login display | — | clamp(48px, 5.4vw, 76px) · website |

Fonts: DM Sans (UI) + Georgia (display). Not Inter / Helvetica Neue.

Map chrome: 0.68rem / 1.85rem / FAB 2rem / radius 0.55rem. Phone-install UI ≤720px.

## Components

`/style#components` — Primary, Secondary, Ghost, Disabled, Get, J FAB, form, card, Caption footer.

## Written chapters (optional depth)

- `/style/principles`
- `/style/color-type`
- `/style/controls`
- `/style/branding-build`
- `/style/agent-checklist`
- `/style/copyright`

## Agent checklist

- [ ] `/style` shows all 11 nav items
- [ ] `#color` has swatches + token table
- [ ] `#type` has specimens + type-scale table
- [ ] `#components` matches local preview buttons/form/card
- [ ] `#agents` checklist present
- [ ] No purple / Inter / 768 breakpoint
