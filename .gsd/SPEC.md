# SPEC.md — Project Specification

> **Status**: `FINALIZED`
>
> ⚠️ **Planning Lock**: Requirements are locked and finalized.

## Vision
**GhoomoBihar** is a lightweight, zero-barrier, QR-code-based tourism discovery web platform created for the **TEJAS India Hackathon 2026 (Bihar Tourism Track)**. It enables tourists visiting iconic Bihar heritage and cultural sites (Jamui, Bodh Gaya, Nalanda, Sonepur Mela, Chhath Ghat) to instantly discover verified local guides, homestays, food vendors, and artisans, connecting directly with them via a 1-tap WhatsApp deep link or a lightweight package request form without requiring any app installation, account creation, or payment gateway. Jamui is set as the primary default-selected site on page load to directly highlight and celebrate the hackathon host location. It empowers local micro-entrepreneurs by giving them a demo-level vendor authentication and onboarding path managed via a straightforward admin curation interface where approvals automatically grant a verified badge.

---

## Goals
1. **Zero-Friction Tourist Discovery**: Instant site selection across 5 major sites (Jamui as the default host location, Bodh Gaya, Nalanda, Sonepur Mela, Chhath Ghat) and category filtering (All, Guide, Homestay, Food, Craft) on mobile browsers with zero load lag and zero build dependencies.
2. **1-Tap WhatsApp Direct Connect & Lightweight Package Requests**: Generate localized, context-rich WhatsApp deep links (`wa.me/<number>?text=...`) directly connecting tourists with local service providers, accompanied by a lightweight "package request" form (name + phone number, no account needed) for tourists wanting to request bookings.
3. **Local Vendor Demo Authentication & Entrepreneur Onboarding**: Simple demo-level vendor signup/login (name, phone number, password stored in `localStorage`) preceding an entrepreneur onboarding form to register listings into a pending queue. Clean admin interface to review, approve, or reject listings, where admin approval automatically assigns a `verified: true` badge.
4. **Authentic Bihari Visual Identity & Enriched Metadata Schema**: Rich listing data schema including `openHours`, static `rating`, `specialty` highlights, dynamic open/close badges, and verified badges; wrapped in Folk-art (Madhubani) aesthetics with terracotta, deep teal, and gold palette.
5. **AI Bihar Tourism Concierge (P2 Stretch)**: Embedded natural language chatbot powered by a Netlify serverless function integrating the **Groq API ("groq/compound" model with built-in real-time web search)**, keeping the `GROQ_API_KEY` secure server-side with zero frontend exposure, backed by an unyielding local listing fallback.

---

## Non-Goals (Out of Scope)
- No live GPS tracking, turn-by-turn navigation, or interactive map SDKs.
- No integrated payment processing, wallets, or UPI gateways.
- No complex multi-day itinerary or route planning engines.
- No complex production-grade backend user auth, OAuth, or database user management (vendor auth is simple, localStorage-based demo auth).
- No Gemini API, Google Search Grounding, or Google Places API (replaced exclusively by Groq `groq/compound` API with built-in web search).
- No external database backend, SQL/NoSQL servers, or heavy scraper infrastructure.
- No React, Vite, Vue, TypeScript, TailwindCSS, Supabase, or multi-step agent frameworks.
- Single-file pure vanilla `index.html` structure with no npm build steps for the client.

---

## Users
- **Heritage Site Tourists**: Domestic & international travelers scanning on-site QR codes or browsing on mobile phones who need immediate, trustworthy local services without downloading apps, with options for 1-tap WhatsApp or quick package booking requests.
- **Local Micro-Entrepreneurs / Vendors**: Local guides, homestay owners, litti-chokha stalls, and Madhubani artisans in Jamui and across Bihar seeking direct customer leads via WhatsApp and package requests, managing their listing via simple vendor login.
- **Tourism Admin / Hackathon Judges**: Curators verifying new entrepreneur submissions, testing auto-verification badges, and demonstrating end-to-end platform operations.

---

## Constraints
- **Technical**: Single standalone `index.html` (inline CSS & JS), zero client build step, browser `localStorage` persistence, plain JS Netlify function for P2 Groq API.
- **Team**: 3-person hackathon team with zero prior coding experience; every module must be explainable in plain English and fail gracefully.
- **Security**: Strict text sanitization against XSS on user inputs; `GROQ_API_KEY` confined strictly to Netlify serverless environment variables; basic chat send debounce/rate-limiting.
- **Timeline**: 24-hour hackathon build.

---

## Success Criteria
- [ ] 100% standalone execution by opening `index.html` directly in any standard browser.
- [ ] Jamui is default-selected on page load, with instant site switching across Jamui, Bodh Gaya, Nalanda, Sonepur Mela, and Chhath Ghat.
- [ ] Responsive filtering across All, Guide, Homestay, Food, and Craft categories.
- [ ] WhatsApp deep links correctly open WhatsApp with pre-filled message including listing title and tourist inquiry context.
- [ ] Lightweight package request form (name + phone number) captures tourist inquiries without requiring an account.
- [ ] Vendor demo signup/login flow (name, phone, password via localStorage) gates the listing submission form.
- [ ] Admin panel (accessible via clean header toggle) allows approving/rejecting pending listings; approved listings automatically receive `verified: true` badge and immediately reflect in live view.
- [ ] Listing cards display full metadata: `openHours`, dynamic open/close status, `rating` (e.g. 4.8★), `specialty` tags, and `verified` badges.
- [ ] P2 AI Chatbot cleanly queries Groq (`groq/compound`) via Netlify serverless function with built-in real-time web search and falls back gracefully to local curated recommendations if offline or if API is unavailable.
- [ ] Complete demo script (Jamui default -> Filter -> Package Request / WhatsApp connect -> Vendor Signup & Submit -> Admin approve & verify -> Groq AI Concierge query) executes flawlessly.

---

## Technical Stack & Architecture
- **Frontend**: Single `index.html` containing HTML5 semantic markup, Vanilla CSS (Madhubani theme, terracotta/teal/gold), Vanilla JavaScript.
- **Data Layer**: In-memory JavaScript data structures pre-seeded with rich Bihar & Jamui listings, schema containing `openHours`, `rating`, `specialty`, and `verified`, synced to `localStorage`.
- **Backend (P2 only)**: One plain JavaScript Netlify serverless function (`netlify/functions/chat.js`) calling the Groq API (`groq/compound` model with built-in real-time web search) with `GROQ_API_KEY` stored securely in Netlify environment variables.
- **Styling Tokens**: Terracotta (`#C85A32`, `#A43E1B`), Deep Teal (`#1A535C`, `#0B3C49`), Warm Gold (`#E9B44C`), Warm Off-White / Sand (`#FDFBF7`, `#F5EBE1`), Dark Charcoal (`#262626`).

---

*Last updated: 2026-08-20*

