# Profeshare v170 final baseline

The active entry is `profeshare-glass-chat-layout-20.html`. Its baseline is the exact saved Version 170 (snapshot ID 779c182a-5f33-4ea5-96bc-9be0864474fa). Matching companion snapshots were restored: Library 72, Community 62 and Discover 48, the latest snapshots at or before v170. Calendar and Profile remain the screens inside v170; their standalone entries point to those screens. The previous app entries are preserved in `backups/pre-v170-final/`.

## Build

Run `npm run build`. Source JSX lives in `app/v170-main.jsx`; the generated browser bundle is `dist/profeshare-v170.js`. Shared audit fixes live in `styles/v170-audit.css` and `scripts/v170-accessibility.js`. React remains the original pinned UMD dependency; Tailwind and fonts retain their existing external delivery. This is a multi-file project: serve the project folder, not the entry HTML alone.

## Corrections

- Consistency (medium): shared target, input, spacing, radius, focus and dialog constraints across restored entries, preserving existing brand colors and compact message sizing.
- Layout (high): removed minimum-width calendar grids, added day labels when weeks stack, allowed long source names and controls to wrap, constrained dialogs to the visible viewport.
- Responsiveness (high): narrow week/month views stack; mobile timeline events use normal document flow to avoid collisions; single-column Library/Discover composition.
- Mobile (high): minimum 44px button targets, 16px input text, safe-area spacing, reachable direct messages, scrollable dialog and navigation content.
- Accessibility (high): visible input focus without message borders, accessible names on collapsed navigation, skip link, dialog focus containment/restoration and reduced-motion support.
- Navigation (high): Discover links now point to existing application routes instead of missing absolute paths. Replaced an unsupported research-count claim with a descriptive library label.
- Build (high): active HTML loads compiled JSX rather than requiring Babel in the browser; the default build now targets v170.

## Shared repair tokens

The v170 palette remains the baseline. The repair layer defines readable dark surface, secondary text and warm focus colors in OKLCH; 4/8/16/24px spacing; 14px labels; 16px inputs; 44px targets; inherited 16px radius; restrained shadow. These apply to shared constraints rather than a new visual theme.

## Verification and limits

Build and all inline-script syntax checks pass. Local HTML dependencies resolve. CSS was reviewed for 360, 390, 768, 1024 and 1440px conditions. The image background uses proportional cover sizing, with no global processing or pseudo-element overlays.

The preview export failed before returning an image. Actual viewport rendering, interaction walkthroughs, contrast on every composited glass surface and full WCAG conformance are NOT verified. Backend-dependent actions require the existing local service. Community still contains demo-only actions; no new backend capability was added. No claim is made that every possible UI/UX issue has been eliminated.
