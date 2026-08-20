# SPEC.md — Project Specification

> **Status**: `FINALIZED`
>
> ⚠️ **Planning Lock**: Requirements are locked and finalized.

## Vision
**GhoomoBihar** is a lightweight, zero-barrier, QR-code-based tourism discovery web platform created for the **TEJAS India Hackathon 2026 (Bihar Tourism Track)**. It enables tourists visiting iconic Bihar heritage sites (Bodh Gaya, Nalanda, Sonepur Mela, Chhath Ghat) to instantly discover verified local guides, homestays, food vendors, and artisans, connecting directly with them via a 1-tap WhatsApp deep link without requiring any app installation, account creation, or payment gateway. It empowers local micro-entrepreneurs by giving them an immediate digital presence and a self-service onboarding path managed via a straightforward admin curation interface.

---

## Goals
1. **Zero-Friction Tourist Discovery**: Instant site selection (4 major heritage sites) and category filtering (All, Guide, Homestay, Food, Craft) on mobile browsers with zero load lag and zero build dependencies.
2. **1-Tap WhatsApp Direct Connect**: Generate localized, context-rich WhatsApp deep links (`wa.me/<number>?text=...`) directly connecting tourists with local service providers.
3. **Local Entrepreneur Digital Onboarding & Admin Curation**: Simple onboarding form for local businesses to register details into a pending queue, with a clean admin interface to review, approve, or reject listings, persisting state via `localStorage`.
4. **Authentic Bihari Visual Identity & Metadata Polish (P1)**: Folk-art (Madhubani) aesthetics with terracotta, deep teal, and gold palette; dynamic open/close badges, static ratings, specialty tags, and verified badges.
5. **AI Bihar Tourism Concierge (P2 Stretch)**: Embedded natural language chatbot powered by a Netlify serverless function integrating Gemini API with Google Search Grounding (prioritizing official Bihar government tourism sources) with an unyielding local listing fallback.

---

## Non-Goals (Out of Scope)
- No live GPS tracking, turn-by-turn navigation, or interactive map SDKs.
- No integrated payment processing, wallets, or UPI gateways.
- No complex multi-day itinerary or route planning engines.
- No user authentication, passwords, or complex role-based login system.
- No external database backend, SQL/NoSQL servers, or heavy scraper infrastructure.
- No React, Vite, Vue, TypeScript, TailwindCSS, Supabase, or multi-step agent frameworks.
- Single-file pure vanilla `index.html` structure with no npm build steps for the client.

---

## Users
- **Heritage Site Tourists**: Domestic & international travelers scanning on-site QR codes or browsing on mobile phones who need immediate, trustworthy local services without downloading apps.
- **Local Micro-Entrepreneurs**: Local guides, homestay owners, litti-chokha stalls, and Madhubani artisans seeking direct customer leads via WhatsApp.
- **Tourism Admin / Hackathon Judges**: Curators verifying new entrepreneur submissions and demonstrating end-to-end platform operations.

---

## Constraints
- **Technical**: Single standalone `index.html` (inline CSS & JS), zero client build step, browser `localStorage` persistence, plain JS Netlify function for P2.
- **Team**: 3-person hackathon team with zero prior coding experience; every module must be explainable in plain English and fail gracefully.
- **Security**: Strict text sanitization against XSS on user inputs; API keys confined to Netlify serverless environment variables; basic chat send debounce/rate-limiting.
- **Timeline**: 24-hour hackathon build.

---

## Success Criteria
- [ ] 100% standalone execution by opening `index.html` directly in any standard browser.
- [ ] Instant site switching across Bodh Gaya, Nalanda, Sonepur Mela, and Chhath Ghat.
- [ ] Responsive filtering across All, Guide, Homestay, Food, and Craft categories.
- [ ] WhatsApp deep links correctly open WhatsApp with pre-filled message including listing title and tourist inquiry context.
- [ ] Entrepreneur registration form successfully adds new listing to "Pending" queue with input sanitization.
- [ ] Admin panel (accessible via clean header toggle) allows approving/rejecting pending listings; approved listings immediately reflect in live view.
- [ ] Dynamic open/close status badge calculated accurately from operational hours against client time.
- [ ] P2 AI Chatbot cleanly falls back to local curated recommendations if serverless function/Gemini API is unavailable.
- [ ] Complete demo script (Nalanda -> Filter -> WhatsApp connect -> Submit -> Admin approve -> Chatbot query) executes flawlessly.

---

## Technical Stack & Architecture
- **Frontend**: Single `index.html` containing HTML5 semantic markup, Vanilla CSS (Madhubani theme, terracotta/teal/gold), Vanilla JavaScript.
- **Data Layer**: In-memory JavaScript data structures pre-seeded with rich Bihar listings, synced to `localStorage`.
- **Backend (P2 only)**: One plain JavaScript Netlify serverless function (`netlify/functions/chat.js`) calling Gemini API with Search Grounding.
- **Styling Tokens**: Terracotta (`#C85A32`, `#A43E1B`), Deep Teal (`#1A535C`, `#0B3C49`), Warm Gold (`#E9B44C`), Warm Off-White / Sand (`#FDFBF7`, `#F5EBE1`), Dark Charcoal (`#262626`).

---

*Last updated: 2026-08-20*
