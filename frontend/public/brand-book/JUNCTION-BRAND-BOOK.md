# Junction Brand Book & Design Guide

Version 1.0 · 21 September 2026  
Status: Canonical — values taken from production CSS, not placeholders.

Sources: `jtoday` (junction.today), `junction-frontweb` (junction.website), `jMonster`, `junctionblog`, `jEarth`.

---

## 1. Introduction

**Mission.** Junction connects commerce, community, pledges, and sustainability into one ecosystem.

**Vision.** A unified platform where trust, responsibility, and innovation drive user experience.

**Design philosophy.** Xerox clarity, IBM modularity, Google accessibility. Junction UI is simple, consistent, and human-centered. One job per control. No decoration for its own sake.

**What this book is.** The shared visual language for every Junction surface. Platforms differ in **voice and job**, not in palette. Do not invent a second brand.

---

## 2. Brand identity

**Core values.** Trust, responsibility, community, sustainability.

**Tone of voice.** Clear, approachable, inclusive, slightly technical. Short sentences. Active verbs.

**Primary mark.** Gold rounded square (`#f3d782`) with a forest `J` (`#194b31`), DM Sans ExtraBold. Source: `branding/logo.svg` in junction-frontweb and jtoday. 64×64 canvas, corner radius 18.

**Wordmark.**

- Primary: “Junction” — DM Sans 700, `--text-lg`, `--ink`
- Secondary: platform name, uppercase, letter-spacing `0.1em`, `--mute`
- Prompt / kicker: uppercase, `--forest-mid`

**Do**

- Keep the gold field and forest J together.
- Give the mark clear space equal to the width of the J stem (about 12px on the 64 canvas).
- Use the mark on paper or forest. On maps, the gold FAB sits bottom-left.

**Don’t**

- Recolor the J to white, blue, or crimson.
- Stretch, rotate, add drop shadows, or place the mark on a busy photograph.
- Swap in Inter, Helvetica, or emoji as the letterform.
- Ship the Angular default favicon (~15KB). Junction icon is ~0.5KB from `branding/`.

**Theme color / PWA.** `#194b31`

---

## 3. Color system

Every live site already uses this palette. A draft table of “deep blue / crimson / teal per platform” is **rejected**. Identity is voice, not a second hue set.

| Token | HEX | RGB | Use |
| --- | --- | --- | --- |
| `--forest` | `#194b31` | 25, 75, 49 | Primary actions, theme-color, J on gold |
| `--forest-mid` | `#17633e` | 23, 99, 62 | Links, hover, kickers |
| `--forest-bright` | `#1f7a4c` | 31, 122, 76 | Bright / active forest |
| `--forest-deep` | `#103d29` | 16, 61, 41 | Deep forest (website, monster) |
| `--gold` | `#f3d782` | 243, 215, 130 | Brand mark, FAB, accents |
| `--gold-soft` | `#f7e9b8` | 247, 233, 184 | Soft gold fill |
| `--gold-deep` | `#d4b75e` | 212, 183, 94 | Gold depth (website) |
| `--gold-ink` | `#8a6f1f` | 138, 111, 31 | Gold-on-paper text (monster) |
| `--paper` | `#f4f0e6` | 244, 240, 230 | Page ground |
| `--paper` (website) | `#f5f3ee` | 245, 243, 238 | Shell-only paper variant — allowed |
| `--paper-deep` | `#ebe4d4` | 235, 228, 212 | Gradient end |
| `--surface` | `#fffdf8` | 255, 253, 248 | Cards / cream |
| `--ink` | `#0f1f17` | 15, 31, 23 | Body text |
| `--ink-soft` | `#3d5248` | 61, 82, 72 | Lede / secondary body |
| `--mute` | `#6b7c72` | 107, 124, 114 | Captions, labels |
| `--line` | `rgba(25, 75, 49, 0.14)` | — | Hairlines |
| `--line-strong` | `rgba(25, 75, 49, 0.22)` | — | Inputs |
| `--line` solid (website) | `#dedbd2` | 222, 219, 210 | Solid hairline |
| `--danger` | `#92400e` | 146, 64, 14 | Errors (earth, blog) |
| `--danger-bg` | `rgba(254, 243, 199, 0.92)` | — | Error surface |

**Page wash (today, blog, earth, monster).**

```
radial-gradient(ellipse 90% 55% at 8% -10%, rgba(243, 215, 130, 0.35), transparent 55%),
radial-gradient(ellipse 70% 45% at 100% 0%, rgba(25, 75, 49, 0.1), transparent 50%),
linear-gradient(180deg, var(--paper) 0%, var(--paper-deep) 100%);
```

junction.today map shell uses `--ink` (`#0f1f17`) behind the map; chrome on top stays paper/gold/forest.

**Forbidden.** Purple gradients, glow stacks, generic SaaS blues, dark-mode-first shells, emoji chrome.

---

## 4. Typography

**Primary (UI).** DM Sans — `'DM Sans', 'Segoe UI', sans-serif`  
Load: Google Fonts opsz 9..40, weights 400–800.

**Display (editorial / titles).** Georgia — `Georgia, 'Times New Roman', serif`  
Weight 500 on h1–h3. Letter-spacing `-0.03em` (login display uses `-0.045em`).

**Not brand fonts.** Inter, Helvetica Neue, Merriweather. Georgia already covers editorial.

| Role | Token | Default | Notes |
| --- | --- | --- | --- |
| Caption | `--text-xs` | 0.6875rem (11px) | Light/regular; mute color |
| Small | `--text-sm` | 0.75rem (12px) | |
| Meta | `--text-md` | 0.875rem (14px) | |
| Body | `--text-base` | 0.9375rem (15px) | Regular; leading 1.5 |
| H2 / wordmark | `--text-lg` | 1.0625rem (17px) | Semi/bold in UI; Georgia for page titles |
| H1 UI | `--text-xl` | 1.25rem (20px) | |
| Section | `--text-2xl` | clamp 1.35–1.75rem | |
| Display | `--text-display` | clamp 1.5–2.25rem | Georgia |
| Login display | — | clamp(48px, 5.4vw, 76px) | Georgia 500, website only |

**Line height.** Tight 1.2 · Snug 1.35 · Body 1.5.

**Kicker.** 0.72rem, weight 700, letter-spacing 0.12em, uppercase, forest-mid.

**Map chrome.** 0.68rem, weight 600, letter-spacing 0.02em. Exception to the page scale — do not enlarge it to “marketing CTA”.

---

## 5. Components

### Buttons

| Variant | Fill | Text | Border |
| --- | --- | --- | --- |
| Primary | `--forest` | `--surface` (`#fffdf8`) | none; shadow `0 8px 18px rgba(25, 75, 49, 0.22)` |
| Primary hover | `--forest-mid` | cream | — |
| Secondary | cream / glass | `--forest` | hairline `--line-strong` |
| Ghost | `rgba(243, 215, 130, 0.35)` | `--forest` | `rgba(243, 215, 130, 0.65)` |
| Disabled | same | same | opacity 0.55; no translate |
| Map | cream or forest | forest or gold | radius 0.55rem; height 1.85rem |

Shape: pill `border-radius: 999px` for page CTAs. Padding `0.72rem 1.2rem`. Weight 700. Hover: `translateY(-1px)`. Focus: 2px gold outline, 2px offset.

### Forms

- Label: uppercase 0.72rem, mute, tracking 0.06em.
- Control: radius 0.75rem, padding 0.75rem 0.85rem, surface fill, strong line.
- Focus: gold outline 2px + forest-mid border.
- Invalid: danger border + `--danger-bg`. Message in `--danger`, plain language.

### Navigation

- Shared top bar: paper/cream, forest links, gold mark.
- Platform side nav: same tokens; Georgia for section titles on website back office.
- Get drawer (phone software): gold J, bottom-left, closed by default, cream drawer, safety line only (“Your phone scans us for safety”), equal Get | Send (Send first on iOS Safari), auto-close ~10s, outside pointer dismiss, **≤720px only**.

### Cards / modals

- Surface solid, line hairline, radius 0.9rem.
- Shadow `--shadow` `0 10px 28px rgba(15, 31, 23, 0.07)` or elevated `0 16px 40px rgba(15, 31, 23, 0.1)`.
- Map control shadow `0 8px 18px rgba(15, 23, 42, 0.16)`.

### Accessibility

- Keyboard: visible `:focus-visible`.
- Labels: never placeholder-only.
- Tap target: `--tap-min` 2.75rem except map chrome.
- reCAPTCHA: keep Google badge tiny but present (scale ~0.38, bottom-right, opacity ~0.45). Do not fully hide.
- Color is not the only error signal.

---

## 6. Layout & spacing

**Grid.** Fluid 12-column mental model. Production pages use flex/grid with `--page-pad-x`, not a rigid 12-col CSS framework.

**Breakpoints (production).**

| Name | Query |
| --- | --- |
| Phone narrow | `max-width: 480px` |
| Phone | `481px–720px` |
| Tablet | `721px–1023px` |
| Desktop | `min-width: 1024px` |

Do not introduce a 768px system.

**Spacing.** 4px/8px base: `--space-1` 0.25rem through `--space-6` 1.5rem. Page pad `clamp(0.75rem, 2.5vw, 1.5rem)`.

**Example flows.** Shop / map (today), login + back office (website), feed + entry (blog), pledge / share (monster), waste guidebook (earth).

---

## 7. Content guidelines

**Writing.** Short, active, inclusive. Prefer verbs: Get, Send, Open, Pledge.

**Errors.** Clear, non-technical. “We could not save that. Try again.” not stack traces.

**Tone by platform (same colors).**

| Platform | Tone |
| --- | --- |
| junction.today | Trustworthy, transactional, map-first |
| junction.website | Professional, precise |
| junction.blog | Empathetic, conversational |
| junction.monster | Bold, activist |
| junction.earth | Calm, eco-centric |

Never say APK/IPA in consumer copy unless the user asked for file format.

---

## 8. Platform identity mapping

| Platform | Theme | Visual cue (same system) |
| --- | --- | --- |
| junction.today | Commerce & trust | Map + gold FAB + forest CTAs |
| junction.website | Professional | Georgia display login, paper `#f5f3ee` |
| junction.blog | Empathy & voice | Georgia titles, editorial measure |
| junction.monster | Bold pledges | Same palette; `--gold-ink` for emphasis |
| junction.earth | Sustainability | Paper wash, guidebook cards; hosts `/style` |

---

## 9. Code standards

**CSS variables.** See `tokens/junction-tokens.css`.

**Naming.** BEM: `.button--primary`, `.card__title`, `.field__error`. Existing `.btn` / `.btn-primary` on earth/blog may remain; new shared code should use BEM.

**Framework.** Angular (not Tailwind-first). Tokens on `:root`. React/Tailwind theme maps must alias to these hex values if used later.

**Dark mode.** `color-scheme: light` today. If dark mode is added later: invert paper/ink only; gold and forest stay brand. Do not ship a navy dashboard.

**Localization.** junction.today is India-first (`lang="hi"`, hreflang en/hi). UI strings stay short. Do not bake English width into buttons.

---

## 10. Governance

**Contribution.** New components start as a reference on the brand book page, then land in the host app, then (later) a shared package.

**Approval.** Visual changes to forest/gold/paper, the J mark, or Get-drawer behavior need product sign-off. Token tweaks without hex change can ship in the same PR as the feature.

**Versioning.** This book is 1.0. Update the changelog when hex, type, or breakpoints change. Quarterly review is enough unless a ship regresses the mark.

**Case studies already in production.**

- Get / Send drawer on today and website
- Login display type on junction.website
- jEarth `/style` living manual

---

## 11. Agents & AI integration

**Role.** Help navigation, pledges, sustainability portfolios, complaints, back-office workflows. Connect through Junction MCP for live guidance.

**Agent UI.** Minimal. Same palette. No purple copilot chrome. Always label AI-generated text.

**Tone.** Helpful, clear, non-biased. Voice + text. Multilingual-ready.

**Before merge (checklist).**

- [ ] Tokens match forest / gold / paper / DM Sans
- [ ] Phone-install UI hidden above 720px
- [ ] No APK jargon in UI copy
- [ ] Favicons from `branding/` sync
- [ ] Drawers: closed default + dismiss rules
- [ ] Prefer existing map/Get patterns over a new card stack

**Canonical URLs (after the web PR).** `/style` on jEarth · `/style.md` for fetchable agent context.

**Future.** Pledge tracking (monster), sustainability insights (earth), commerce recommendations (today) — all in this visual system.
