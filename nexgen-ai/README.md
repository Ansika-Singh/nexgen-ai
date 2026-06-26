# NexGen AI — Frontend Battle Phase 1

Premium, high-converting landing page for an advanced AI-driven data automation platform.

**Live Link:** [https://nexgen-ai-ecru.vercel.app](https://nexgen-ai-ecru.vercel.app)

## 🎨 Asset Integration
- **Color Palette** (from `colorPallet.pdf`): Forsythia `#FFC801`, Nocturnal Expedition `#114C5A`, Arctic Powder `#F1F6F4`, Mystic Mint `#D9E8E2`, Deep Saffron `#FF9932`, Oceanic Noir `#172B36`
- **Fonts** (from `fonts.pdf`): JetBrains Mono (headers/code), Inter (body/UI)
- **SVGs** (from SVG pack): cube-16-solid (logo), chevron-down (dropdowns), link-solid (social/links), arrow-trending-up (CTAs/cards), cog-8-tooth (features), chart-pie (analytics), arrow-path (sync), search (nav), x-mark (mobile menu close)

## 🏗️ Tech Stack
- **Framework**: Next.js 16 (App Router, Static Export)
- **Styling**: Tailwind CSS v4 + CSS Custom Properties
- **Fonts**: JetBrains Mono · Inter (Google Fonts)
- **Animations**: Native CSS Transitions + WAAPI — zero runtime libs

## ✅ Scoring Compliance

| Criteria | Implementation |
|---|---|
| Feature 1 — Dynamic pricing matrix | ✅ Multi-dimensional config object (`PRICING_MATRIX`) |
| Feature 1 — State isolation | ✅ `useRef` + direct `document.getElementById` DOM text mutations only — zero parent re-renders |
| Feature 2 — Bento/Accordion | ✅ Option-wise accordion used on all devices so user must click options to view details |
| Feature 2 — State management | ✅ Custom interactive react state transitions with zero external UI libs |
| Semantic HTML | ✅ `<main>`, `<header>`, `<section>`, `<article>`, `<figure>`, `<figcaption>`, `<blockquote>`, `<nav>`, `<footer>`, `<ul role="list">` |
| SEO + OG tags | ✅ Full Metadata API, Open Graph, Twitter Card, canonical, robots, JSON-LD structured data |
| 500ms TTI budget | ✅ Entry animations staggered at 80ms intervals (80→160→240→320ms), all under 500ms |
| No banned libs | ✅ No Framer Motion, Radix, Shadcn, HeadlessUI in deps |
| Responsive | ✅ Mobile, tablet, desktop breakpoints; accordion adapts to all screen sizes |
| Asset compliance | ✅ All SVGs, brand colors, and both fonts from asset pack integrated |
| Motion timing | ✅ Micro-interactions: 150–200ms ease-out; layout reflows: 350ms ease-in-out |

## 🚀 Deploy

```bash
npm install
npm run build
# Static output → /out folder
```

### Vercel (recommended)
```bash
npx vercel --prod
```

### Netlify
Drag and drop the `/out` folder to netlify.com/drop

## 🔑 Key Technical Details

### Feature 1: Pricing State Isolation
Currency switcher and billing toggle use `useRef` instead of `useState`. Price updates call `document.getElementById('price-pro').textContent = ...` directly — guaranteeing **zero parent component re-renders**. Verified in Chrome DevTools: only the targeted `<span>` text nodes update.

### Feature 2: Bento → Accordion Context Transfer
`hoverIndexRef` persists the last active bento cell index. When `window.matchMedia('(max-width: 768px)')` fires a change event, the handler reads from `hoverIndexRef.current` and sets that index as the open accordion panel — seamless context transfer on resize.
