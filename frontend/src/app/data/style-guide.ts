import { GuideArticle } from '../models/guide.model';

/**
 * Junction / Sunskriti product style guide — living manual for humans and agents.
 * Hosted on jEarth at /style. Prefer this over re-narrating basics in chat.
 */
export const STYLE_ARTICLES: GuideArticle[] = [
  {
    slug: 'principles',
    title: 'Principles: clear, simple, precise',
    kicker: 'Style',
    chapter: '01 · Principles',
    minutes: 3,
    summary:
      'Design like map chrome: one job per control, no decoration for its own sake, phone software stays phone-scale.',
    blocks: [
      {
        type: 'callout',
        tone: 'gold',
        caption: 'For agents',
        text: 'Do not invent a new visual language. Match junction.today / junction.website / jEarth tokens and control scale. If unsure, open /style on jEarth.',
      },
      {
        type: 'h2',
        text: 'Non-negotiables',
      },
      {
        type: 'ul',
        items: [
          'Clear — one purpose per surface; no competing headlines in the first viewport.',
          'Simple — fewer words; prefer verbs (Get, Send) over file jargon (APK, IPA).',
          'Precise — map-control sizing (type ~0.68rem, control height ~1.85rem) unless the existing page already uses larger type.',
          'Phone software controls stay compact; hide phone-install chrome above 720px.',
          'Closed by default for surprise drawers; open on tap; dismiss on outside tap and after ~10s idle.',
        ],
      },
      {
        type: 'h2',
        text: 'Reference products',
      },
      {
        type: 'table',
        headers: ['Surface', 'Repo', 'Notes'],
        rows: [
          ['junction.today', 'ancqit/jtoday', 'Map, greet, Get J drawer'],
          ['junction.website', 'ancqit/junctionFrontweb', 'Login shell, back office'],
          ['jEarth', 'ancqit/jEarth', 'This style guide + earth desk'],
        ],
      },
    ],
  },
  {
    slug: 'color-type',
    title: 'Color, type, and paper',
    kicker: 'Style',
    chapter: '02 · Tokens',
    minutes: 4,
    summary: 'Forest, gold, paper, DM Sans — the Junction palette agents must reuse.',
    blocks: [
      {
        type: 'h2',
        text: 'CSS variables (canonical)',
      },
      {
        type: 'table',
        headers: ['Token', 'Value', 'Use'],
        rows: [
          ['--forest', '#194b31', 'Primary actions, text on gold'],
          ['--forest-mid', '#17633e', 'Links, hover'],
          ['--gold', '#f3d782', 'Brand mark, accents, FAB'],
          ['--paper', '#f4f0e6', 'Page ground'],
          ['--paper-deep', '#ebe4d4', 'Depth / gradient end'],
          ['--ink', '#0f1f17', 'Body text'],
          ['--mute', '#6b7c72', 'Secondary labels'],
          ['--font-ui', "DM Sans, system-ui", 'UI / controls'],
        ],
      },
      {
        type: 'callout',
        tone: 'warn',
        caption: 'Avoid',
        text: 'Purple gradients, generic Inter-only stacks as brand, dark-mode-first shells, glow stacks, and emoji chrome — unless an existing screen already has them.',
      },
      {
        type: 'h2',
        text: 'Map-control type scale',
      },
      {
        type: 'ul',
        items: [
          'Basemap / zoom style labels: font-weight 600, ~0.68rem, letter-spacing 0.02em.',
          'Control height: ~1.85rem; zoom FAB: ~2rem square; radius ~0.55rem.',
          'Shadow: 0 8px 18px rgba(15, 23, 42, 0.16) — same family as Leaflet Junction controls.',
          'Cream fill: rgba(255, 252, 245, 0.96); active fill: forest with gold text.',
        ],
      },
    ],
  },
  {
    slug: 'controls',
    title: 'Controls and drawers',
    kicker: 'Style',
    chapter: '03 · Controls',
    minutes: 5,
    summary: 'How Get / Send, map toggles, and drawers should behave across Junction apps.',
    blocks: [
      {
        type: 'h2',
        text: 'Get drawer (phone software)',
      },
      {
        type: 'ol',
        items: [
          'Gold J mark, map-scale (~2rem), bottom-left, z under shop/login modals.',
          'Closed by default. Tap opens a cream drawer — not a giant square panel.',
          'Copy: safety line only (“Your phone scans us for safety”). No “APK” wording.',
          'Actions: equal Get | Send (or Send | Get on iOS Safari so WhatsApp share is primary).',
          'iOS app row hidden until TestFlight URL is set; iOS browsers still see Send for Android.',
          'Auto-close after 10s; close on outside pointerdown; mobile width ≤720px only.',
        ],
      },
      {
        type: 'h2',
        text: 'Primary vs secondary',
      },
      {
        type: 'ul',
        items: [
          'Primary: forest background, gold text.',
          'Secondary: cream background, forest text, hairline divider.',
          'Do not restyle as purple pills or oversized marketing CTAs inside map/tool chrome.',
        ],
      },
      {
        type: 'callout',
        tone: 'gold',
        caption: 'reCAPTCHA',
        text: 'Keep the Google badge tiny but present (scale ~0.38, bottom-right, low opacity). Do not fully hide without required attribution text.',
      },
    ],
  },
  {
    slug: 'branding-build',
    title: 'Branding and builds',
    kicker: 'Style',
    chapter: '04 · Builds',
    minutes: 4,
    summary: 'branding/ is the source of truth. Web builds must sync favicons — never hand-copy Angular defaults.',
    blocks: [
      {
        type: 'h2',
        text: 'Source of truth',
      },
      {
        type: 'ul',
        items: [
          'junctionFrontweb: branding/{logo.svg,favicon.ico,favicon-32.png,icon.png}',
          'tools/sync-web-branding.mjs copies into apps/*/public on every build / build:vercel.',
          'tools/generate-brand-icons.mjs regenerates rasters from logo.svg (sharp), then sync.',
          'Reject Angular default favicon.ico (~15KB). Junction icon is ~0.5KB.',
        ],
      },
      {
        type: 'h2',
        text: 'Native binaries',
      },
      {
        type: 'ul',
        items: [
          'Do not leave APK/IPA under public/downloads during cap sync (nests into the next native build).',
          'Android: same-origin /downloads/*.apk for Get.',
          'iOS: TestFlight / App Store — not public IPA sideload for consumers.',
        ],
      },
      {
        type: 'callout',
        tone: 'warn',
        caption: 'Separation of concerns',
        text: 'If an asset must appear in production, wire it into the build pipeline. Manual one-off copies will regress.',
      },
    ],
  },
  {
    slug: 'agent-checklist',
    title: 'Agent checklist',
    kicker: 'Style',
    chapter: '05 · Agents',
    minutes: 2,
    summary: 'Before shipping UI, tick this list instead of improvising a new pattern.',
    blocks: [
      {
        type: 'steps',
        caption: 'Before merge',
        items: [
          'Tokens match forest / gold / paper / DM Sans.',
          'Phone-install UI hidden above 720px.',
          'No APK/IPA jargon in user-facing copy unless the user asked for file format detail.',
          'Favicons come from branding/ via sync — not Angular scaffold leftovers.',
          'Drawers: closed default, outside-tap + idle dismiss where used.',
          'Prefer editing existing map/Get patterns over inventing a dashboard card stack.',
          'Site copyright line present in footer chrome: © {year} Sunskriti Data Management Company (Caption: mute + --text-xs).',
        ],
      },
      {
        type: 'p',
        text: 'Canonical URL once deployed: /style on the jEarth site. Raw markdown mirror: /style.md for fetchable agent context.',
      },
    ],
  },
  {
    slug: 'copyright',
    title: 'Copyright line',
    kicker: 'Style',
    chapter: '06 · Legal',
    minutes: 1,
    summary: 'Every Junction public site shows the Sunskriti copyright in the footer.',
    blocks: [
      {
        type: 'callout',
        tone: 'gold',
        caption: 'Canonical copy',
        text: '© {year} Sunskriti Data Management Company',
      },
      {
        type: 'ul',
        items: [
          'Use the current calendar year (dynamic in code is fine).',
          'Mute Caption: `var(--mute)` / `#6b7c72`, `var(--text-xs)` (~0.6875rem), regular weight — not a marketing banner.',
          'Place as a real footer: fixed bottom bar or document footer with `--page-pad-x` and safe-area padding. On phone it must sit at the viewport/page footer, not inside a stacked hero column.',
          'On map shells, keep z-index below Get FAB and clear the left FAB with padding when ≤720px.',
          'Do not invent alternate legal entity names; legal pack uses Sunskriti Data Management Company.',
        ],
      },
    ],
  },
];

export function styleArticleBySlug(slug: string): GuideArticle | undefined {
  return STYLE_ARTICLES.find((article) => article.slug === slug);
}
