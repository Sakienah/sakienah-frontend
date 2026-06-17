# Homepage Premium Redesign

## Problem

The Sakienah homepage already has a strong brand concept (dark/gold/cream palette, Playfair Display + Amiri Arabic calligraphy, zellij geometric patterns) but reads as flat and templated rather than premium:

- Four sections in a row (`CategoryShowcase`, `ValueProposition`, `SocialProof`, `FaqSection`) reuse the identical "white card + 4 gold corner-brackets + diamond divider" recipe.
- Nearly every section repeats the same uppercase-tracking "eyebrow" label above its headline, producing a templated rhythm.
- The hero stacks 5 text elements (Bismillah, star-rating/review line, headline, subheadline, CTAs) including a trust micro-strip that duplicates the `TrustBar` section directly below it.
- All motion is ad-hoc CSS with default easings; no scroll-reveal, no consistent depth system.
- A newly generated brand video (`public/video/hero.webm`, portrait 834×1112, 24fps, 2.3MB) exists but is unused.

## Goal

Redesign the homepage (`app/page.tsx` and `components/home/*`) to feel premium and distinct, using the new hero video as the visual anchor, without changing copy, IA, routes, or the underlying brand identity (Playfair/Inter/Amiri, gold/dark/cream palette, Islamic motifs).

## Scope

Homepage only: `Navbar`/`Footer` unchanged. All sections currently rendered in `app/page.tsx`:
`HeroSection`, `TrustBar`, `PromoBar`, `CategoryShowcase`, `BestsellersSection`, `CTABanner`, `ValueProposition`, `SocialProof`, `FaqSection`, `FinalCTA`.

No copy changes, no new routes, no backend changes.

## Design

### 1. Hero section

- Keep the approved split layout (dark left / cream right on desktop).
- Right column: video replaces the featured product card. Portrait video sits in a **double-bezel frame** (outer shell with hairline gold border + padding, inner core holding the `<video>` with its own subtle inner shadow) instead of a flat bordered box.
- Video: `autoplay muted loop playsInline`, `preload="metadata"`, poster image generated from the video's first frame (`ffmpeg -i hero.webm -vframes 1 hero-poster.webp`) so there's no empty flash before buffering.
- On load: gentle scale-in (`0.95 → 1`, opacity `0 → 1`, ~700ms, custom ease-out cubic-bezier `(0.23, 1, 0.32, 1)`).
- One gold corner-bracket pair only (top-left + bottom-right), not all four — this becomes the section's sole use of that motif on this redesign pass.
- Mobile (`< lg`): video shown full-width above the text block (shorter aspect crop) instead of hidden.
- Hero text stack simplified to exactly 4 elements: Bismillah (acts as the eyebrow), headline, subheadline, CTAs. The star-rating/review-count line is removed (redundant with `TrustBar` immediately below).
- Featured product card is removed entirely; `BestsellersSection` carries that job (see below).
- CTA buttons use the new shared `Button` primitive (see below) instead of the bespoke pulse-ring animation.
- `prefers-reduced-motion`: hero shows the static poster image instead of the playing video, no scale-in animation (content appears immediately).

### 2. Shared primitives (`components/ui/`)

New, small, reusable pieces — infrastructure, not new visual identity:

- **`<Reveal>`**: Framer Motion wrapper for fade+rise-on-scroll (`opacity 0→1`, `y 24px→0`, `viewport={{ once: true, amount: 0.3 }}`, custom ease, ~600ms). Returns children unanimated when `useReducedMotion()` is true.
- **`<SectionHeader>`**: replaces the copy-pasted label/heading/divider block. Props: `eyebrow?` (optional — omitted by default per the eyebrow budget below), `heading`, `align?`.
- **`<Button>`**: primary/secondary variants, replaces bespoke per-component button styles. `:active` → `scale(0.97)`, hover handled via `@media (hover: hover) and (pointer: fine)`, transition on `transform` + `box-shadow` only (not `all`), duration 160-200ms ease-out.
- **`<DoubleBezel>`**: the nested outer-shell/inner-core wrapper used for the hero video frame and (optionally) product/category cards needing real depth.
- Depth scale: 3-tier shadow tokens (resting / hover / floating), each tinted toward the gold/black brand hue rather than flat `rgba(0,0,0,...)`.
- Spacing rhythm: standardize section vertical padding to a defined scale (e.g. `py-16 md:py-24`) instead of bespoke `clamp()` per section.

### 3. Eyebrow budget

Across the ~9 homepage sections, keep at most 3 eyebrow-style labels total (hero's Bismillah counts as one). Candidates to keep: Hero (Bismillah), `CategoryShowcase` ("Collecties") or `Bestsellers` ("Onze Collectie") — pick one, and one more for whichever of `ValueProposition`/`SocialProof`/`FAQ` benefits most. All other sections drop the label and lead with just the heading.

### 4. Per-section plan

- **TrustBar / PromoBar**: structurally fine as-is (bars, not boxed cards). Wrap in `<Reveal>`, apply the new `<Button>` styling to the promo code button, no structural change.
- **CategoryShowcase**: keep the strong image-led cards; break the equal 3-column grid into an asymmetric layout (one large + two stacked). Drop corner brackets; keep gold frame-on-hover only.
- **BestsellersSection**: feature the top product in a larger tile than the rest (hero-tile + smaller grid) instead of a uniform grid.
- **CTABanner** (Bismillah moment): keep as the dark "breath" pause; add slow ambient motion (very subtle, e.g. background pattern drifting) — gated behind reduced-motion.
- **ValueProposition**: drop the 3 boxed corner-bracket cards. Replace with an editorial horizontal layout — large Arabic calligraphy as backdrop watermark per item, alternating icon/text alignment, no card borders.
- **SocialProof**: keep the side-preview-carousel mechanic; drop corner brackets on the center card; let a large Playfair italic quote dominate typographically.
- **FaqSection**: keep the split question-list/answer-panel layout; drop corner brackets; keep the vertical gold divider as the section's signature line.
- **FinalCTA**: keep structurally; upgrade button to the new primitive; add slow mandala rotation (gated behind reduced-motion).

Net result: the gold corner-bracket motif appears once with intent (hero) rather than on every card; at least 4 distinct layout families across the 9 sections (bars, asymmetric image grid, editorial alternating rows, split list/panel, dark full-bleed).

### 5. Technical approach

- New dependency: `framer-motion` (only new package; `lucide-react` already present, no new icon library needed).
- `LazyMotion` to limit bundle impact; `viewport={{ once: true }}` on all scroll-reveals.
- `prefers-reduced-motion`: disables scroll-reveals and hero scale-in (content appears immediately/static); hero swaps video for poster.
- Existing ARIA/keyboard behavior (FAQ accordion, review carousel) preserved exactly — only visuals/animation change.
- Work order: shared primitives → hero (checkpoint: verify in browser before continuing) → remaining sections.

## Out of scope

- Copy/content changes.
- Site sections outside the homepage (shop, product detail, cart, checkout, account).
- Changing fonts, color palette, or removing the Arabic/Islamic motif identity.
- New animation libraries beyond Framer Motion (no GSAP).
