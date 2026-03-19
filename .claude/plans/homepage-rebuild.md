# Stacked Marketing: The One Page Rebuild

## Strategy
Kill the current 7-page structure. Build 3 pages + utilities. Everything that matters goes on `/`.

## What stays untouched
- `/ads` page and all `src/components/ads/*` files (separate campaign landing page)
- `src/lib/constants.ts` (shared config)

## What gets deleted
- `src/app/services/` (entire directory)
- `src/components/services/` (entire directory)
- All current homepage components: `src/components/Hero.tsx`, `FAQ.tsx`, `Footer.tsx`, `HowItWorks.tsx`, `Questionnaire.tsx`, `ScrollReveal.tsx`, `SocialProof.tsx`, `ValueStack.tsx`, `WhatsAppButton.tsx`
- Current `src/app/page.tsx`
- Current `src/app/globals.css` (full rewrite)

## What gets built

### New Design System
- Colours: `--lime #C8FF00`, `--black #0A0A0A`, `--surface #111111`, `--white #F5F5F5`, `--grey #888888`, `--grey-dim #555555`
- Fonts: Syne 700 (headings), Outfit 400/500 (body), IBM Plex Mono 500 (stats/labels)
- Grain texture, 2px border-radius, no box-shadows
- Zero em dashes. UK English.

### File Structure
```
src/app/
  layout.tsx          (rewrite: new fonts, new meta, new favicon)
  globals.css         (rewrite: full design system)
  page.tsx            (THE ONE PAGE: 9 sections)
  about/page.tsx      (founder story, 3 sections)
  contact/page.tsx    (standalone form)
  thank-you/page.tsx  (confirmation, noindex)
  privacy/page.tsx    (POPIA compliance)
  terms/page.tsx      (ToS)
  ads/                (UNTOUCHED)

src/components/main/
  Nav.tsx             (sticky, hide-on-scroll-down, show-on-scroll-up, mobile hamburger)
  Hero.tsx            (100vh, fade-up entrance, two CTAs)
  TrustBar.tsx        (5 stats, count-up animation, horizontal scroll mobile)
  Proof.tsx           (5 staggered case study cards, fade-up on scroll)
  Offers.tsx          (3 pricing cards: Website/Ads/Full Stack, ?interest= pre-fill)
  Process.tsx         (3 steps, horizontal connected line)
  Comparison.tsx      (3-col table: DIY/Agency/Stacked, mobile cards)
  LeadForm.tsx        (8 fields, radio for interest, webhook POST, success state)
  Footer.tsx          (3-col desktop, stacked mobile)
  WhatsApp.tsx        (floating button, pulse rings, delayed entrance)
```

### Section Order on `/`
1. Hero (100vh)
2. Trust Bar (no gap from hero)
3. Proof (5 staggered cards)
4. Offers (3 pricing cards)
5. How It Works (3 steps)
6. Comparison Table (DIY vs Agency vs Stacked)
7. Lead Form (#contact)
8. Footer

Note: Testimonials section OMITTED unless real testimonials are provided.

### Form Webhook
- Homepage + Contact form POST to: `https://hook.eu2.make.com/rw71138jxaqdksi2i1ganhueiczxnx6g`
- /ads form stays at its own webhook

### Animations
- Fade-up entrance: opacity 0>1, translateY 20>0, 0.5s, IntersectionObserver threshold 0.2
- Stagger: 80ms between siblings, max 500ms total
- Count-up numbers: requestAnimationFrame, 1.5s, ease-out
- prefers-reduced-motion: disable all, show immediately
- Nav: hide on scroll down, show on scroll up

### Performance Targets
- Lighthouse mobile 90+
- Max 3 Google Font files
- Static generation (no client-side data fetching)
- Lazy load below-fold images (none expected, typography-only design)

## Build Sequence
1. Delete old components and /services
2. Rewrite globals.css with new design system
3. Rewrite layout.tsx (fonts, meta, favicon)
4. Build all 10 components in src/components/main/
5. Build page.tsx (The One Page)
6. Build /about, /contact, /thank-you, /privacy, /terms
7. Build and verify
8. Deploy to production via `vercel --prod`
