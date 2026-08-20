---
milestone: v1.0
updated: 2026-08-20
---

# Requirements

## Overview
Traceable functional and non-functional requirements for GhoomoBihar (TEJAS India Hackathon 2026).

---

## Functional Requirements

| ID | Requirement | Priority | Source | Phase | Status |
|----|-------------|----------|--------|-------|--------|
| REQ-01 | **Site Selector (5 Sites)**: 5 prominent buttons for Jamui (default-selected host site), Bodh Gaya, Nalanda, Sonepur Mela, and Chhath Ghat with instant active state switching | P0 | SPEC Goal 1 | 1 | Pending |
| REQ-02 | **Category Filter**: Filter tabs for All, Guide, Homestay, Food, and Craft updating listings dynamically | P0 | SPEC Goal 1 | 1 | Pending |
| REQ-03 | **Enriched Listing Cards & Data Schema**: Render title, category, site, description, pricing (INR), `openHours`, `rating`, `specialty`, `verified` badge, and action triggers | P0 | SPEC Goal 4 | 1 | Pending |
| REQ-04 | **WhatsApp Deep Link**: Generate valid `wa.me/<number>?text=<encoded_message>` with contextual tourist inquiry text | P0 | SPEC Goal 2 | 1 | Pending |
| REQ-05 | **Tourist Package Request Form**: Lightweight modal form for tourists to request package/service bookings with just name + phone number (zero login needed) | P0 | SPEC Goal 2 | 1 | Pending |
| REQ-06 | **Vendor Demo Authentication**: Demo-level vendor signup/login (name, phone, password stored in `localStorage`) required before accessing onboarding submission form | P0 | SPEC Goal 3 | 1 | Pending |
| REQ-07 | **Entrepreneur Onboarding Form**: Form accepting category, site, description, price, WhatsApp number, openHours, and specialty for authenticated vendors, saving to "Pending" queue | P0 | SPEC Goal 3 | 1 | Pending |
| REQ-08 | **Admin Moderation & Auto-Verification**: Header-toggled panel to review pending submissions; Approve action automatically assigns `verified: true` badge and moves listing to live view, plus Reject action | P0 | SPEC Goal 3 | 1 | Pending |
| REQ-09 | **Local Storage Persistence**: Persist custom added/approved listings, vendor accounts, package requests, approval states, and status across browser refreshes | P0 | SPEC Goal 3 | 1 | Pending |
| REQ-10 | **Mobile-First Layout**: Fluid, responsive layout optimized for mobile browsers & QR code scans | P0 | SPEC Goal 1 | 1 | Pending |
| REQ-11 | **Open/Closed Status Calculation**: Real-time badge computing whether a listing is currently open based on `openHours` vs client clock | P1 | SPEC Goal 4 | 2 | Complete |
| REQ-12 | **Static Ratings**: Visual star rating (e.g. 4.8★) per listing card from data schema | P1 | SPEC Goal 4 | 2 | Complete |
| REQ-13 | **Specialty Tags**: Distinct highlight chip for local specialties (e.g. "Famous for Gidhaur Sweets", "Ancient Buddhist Lore") | P1 | SPEC Goal 4 | 2 | Complete |
| REQ-14 | **Verified Checkmark Badge**: Prominent verification seal displayed automatically on admin-approved and verified listings (`verified: true`) | P1 | SPEC Goal 4 | 2 | Complete |
| REQ-15 | **Embedded AI Tourism Concierge**: Natural language chat interface answering Bihar travel queries with direct WhatsApp action triggers | P2 | SPEC Goal 5 | 3 | Complete |
| REQ-16 | **Netlify Serverless Groq Gateway**: Secure serverless function calling Groq API using the `groq/compound` model with built-in real-time web search | P2 | SPEC Goal 5 | 3 | Complete |
| REQ-17 | **Graceful Chat Fallback**: Immediate fallback to curated local listing recommendations when offline or when Groq API call fails | P2 | SPEC Goal 5 | 3 | Complete |

---

## Non-Functional Requirements

| ID | Requirement | Category | Phase | Status |
|----|-------------|----------|-------|--------|
| NFR-01 | **Zero Build Step**: Entire client runs by opening `index.html` directly in browser | Architecture | 1 | Complete |
| NFR-02 | **XSS & Injection Protection**: HTML sanitization/escaping on all user inputs (vendor auth, listings, package requests) before rendering into DOM | Security | 1 | Complete |
| NFR-03 | **API Key Security**: Zero client exposure of `GROQ_API_KEY`, secured exclusively in Netlify serverless environment variables | Security | 3 | Complete |
| NFR-04 | **Bihari Folk Aesthetic**: Terracotta/Teal/Gold palette with Madhubani borders and clean typography | Design | 1 & 2 | Complete |
| NFR-05 | **Debounced Interactions**: Rate-limiting and disabling chat send button during Groq API request processing | Security/UX | 3 | Complete |

---

## Constraints

| ID | Constraint | Source | Impact |
|----|------------|--------|--------|
| CON-01 | Single-file frontend architecture (`index.html`) | Hackathon Requirement | No module bundlers or complex framework tooling |
| CON-02 | Non-coder friendly codebase | Team Requirement | Plain, cleanly commented, modular JavaScript functions |
| CON-03 | Local state storage (`localStorage`) | Architecture | No external DB dependencies |
| CON-04 | Groq Compound API for AI Concierge | Architecture | Single unified API for LLM + real-time web search; serverless proxy prevents key leakage |

---

## Traceability Matrix

| Requirement | Phase | Verification Method | Status |
|-------------|-------|---------------------|--------|
| REQ-01..10, NFR-01..02 | Phase 1 (P0) | Jamui default load check, site/category switching, package request submission, vendor auth & onboarding, admin approval with auto-verify | Pending |
| REQ-11..14, NFR-04 | Phase 2 (P1) | Visual card inspection, openHours calculations, specialty chips, star ratings, verified badge check | Pending |
| REQ-15..17, NFR-03, NFR-05 | Phase 3 (P2) | End-to-end chat test querying Groq `groq/compound` via serverless proxy, simulated offline/timeout fallback test | Pending |
| All | Phase 4 (Demo) | End-to-end hackathon demo script execution | Pending |

