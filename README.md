# NexGen AI — Advanced Data Automation Platform

A premium, high-converting showcase for NexGen AI — an advanced, AI-driven data automation platform built to orchestrate, transform, and deploy enterprise workflows with sub-second latency.

## 🚀 Live Demo
**Vercel Production Link:** [https://nexgen-ai-ecru.vercel.app](https://nexgen-ai-ecru.vercel.app)

---

## 📂 Repository Contents

This workspace consists of two main variants of the NexGen AI landing page:
1. **Next.js Web Application (`/nexgen-ai`):** Built with Next.js 16 (App Router), React, and Tailwind CSS.
2. **Static HTML Page (`/nexgen_ai_landing_page.html`):** A standalone, zero-dependency single-file HTML implementation with custom vanilla CSS and vanilla JavaScript.

---

## ✨ Features Implemented

### 1. Dynamic Pricing Matrix & Billing Toggle
- **Multi-currency support:** Easily switch between USD ($), INR (₹), and EUR (€) with custom rounding parameters.
- **Annual Payment Adjustment:** Following the annual payment model, selecting "Annual" calculates and displays the **total yearly price** (e.g. 12 × monthly base rate × 20% discount) with a `/ year` subtitle instead of a monthly fraction.
- **State Isolation:** Toggle billing cycles and currencies with zero re-renders of parent elements, mutating target text nodes directly via vanilla DOM methods for maximum performance.

### 2. Collapsible Features Accordion (Option-Wise)
- **Interactive Accordion:** The "Platform capabilities" section has been designed option-wise. Desktop and mobile viewports list options as collapsible bars.
- **On-Click Details:** Features are collapsed by default, requiring the user to press (click) each option to expand and read the description and performance metrics.

### 3. Scroll Reveal & Partner Logo Marquee
- **IntersectionObserver Reveal:** Subtle scroll reveal effects fade and slide elements up as they enter the viewport.
- **Infinite Logo Marquee:** Auto-scrolling, infinite-loop partner logo strip featuring Stripe, Linear, Vercel, Notion, Figma, and Supabase, with pause-on-hover logic.

---

## 🛠️ Local Development

### Running the Next.js Web App
```bash
cd nexgen-ai
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the React application.

### Running the Static HTML Page
Serve the static files via any local server (e.g., Python's built-in HTTP server):
```bash
python -m http.server 8000
```
Open [http://localhost:8000/nexgen_ai_landing_page.html](http://localhost:8000/nexgen_ai_landing_page.html) to view the static site.
