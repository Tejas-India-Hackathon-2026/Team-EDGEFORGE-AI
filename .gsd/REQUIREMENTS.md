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
| REQ-01 | **Site Selector**: 4 prominent buttons for Bodh Gaya, Nalanda, Sonepur Mela, and Chhath Ghat with instant active state switching | P0 | SPEC Goal 1 | 1 | Pending |
| REQ-02 | **Category Filter**: Filter tabs for All, Guide, Homestay, Food, and Craft updating listings dynamically | P0 | SPEC Goal 1 | 1 | Pending |
| REQ-03 | **Rich Listing Cards**: Render title, category, site, description, pricing (INR), WhatsApp CTA, and badges | P0 | SPEC Goal 1 | 1 | Pending |
| REQ-04 | **WhatsApp Deep Link**: Generate valid `wa.me/<number>?text=<encoded_message>` with contextual tourist inquiry text | P0 | SPEC Goal 2 | 1 | Pending |
| REQ-05 | **Entrepreneur Onboarding Form**: Form accepting name, category, site, description, price, and WhatsApp number saving as "Pending" | P0 | SPEC Goal 3 | 1 | Pending |
| REQ-06 | **Admin Moderation Interface**: Header-toggled panel to review pending submissions, with Approve (moves to live) and Reject actions | P0 | SPEC Goal 3 | 1 | Pending |
| REQ-07 | **Local Storage Persistence**: Persist custom added and approved listings, approval states, and status across browser refreshes | P0 | SPEC Goal 3 | 1 | Pending |
| REQ-08 | **Mobile-First Layout**: Fluid, responsive layout optimized for mobile browsers & QR code scans | P0 | SPEC Goal 1 | 1 | Pending |
| REQ-09 | **Open/Closed Status Calculation**: Real-time badge computing whether a listing is currently open based on operating hours vs client clock | P1 | SPEC Goal 4 | 2 | Pending |
| REQ-10 | **Static Ratings**: Visual star rating (e.g. 4.8★) per listing card | P1 | SPEC Goal 4 | 2 | Pending |
| REQ-11 | **Specialty Tags**: Distinct highlight chip for local specialties (e.g. "Famous for Litti Chokha", "Ancient Buddhist Lore") | P1 | SPEC Goal 4 | 2 | Pending |
| REQ-12 | **Verified Checkmark Badge**: Prominent verification seal displayed automatically on admin-approved and verified listings | P1 | SPEC Goal 4 | 2 | Pending |
| REQ-13 | **Embedded AI Tourism Concierge**: Natural language chat interface answering Bihar heritage & travel queries with direct WhatsApp action triggers | P2 | SPEC Goal 5 | 3 | Pending |
| REQ-14 | **Netlify Serverless AI Gateway**: Secure serverless function calling Gemini API with Search Grounding focused on official Bihar tourism portals | P2 | SPEC Goal 5 | 3 | Pending |
| REQ-15 | **Graceful Chat Fallback**: Immediate fallback to curated local listing recommendations when offline or when API call fails | P2 | SPEC Goal 5 | 3 | Pending |

---

## Non-Functional Requirements

| ID | Requirement | Category | Phase | Status |
|----|-------------|----------|-------|--------|
| NFR-01 | **Zero Build Step**: Entire client runs by opening `index.html` directly in browser | Architecture | 1 | Pending |
| NFR-02 | **XSS & Injection Protection**: HTML sanitization/escaping on all user inputs before rendering into DOM | Security | 1 | Pending |
| NFR-03 | **API Key Security**: Zero client exposure of AI API credentials | Security | 3 | Pending |
| NFR-04 | **Bihari Folk Aesthetic**: Terracotta/Teal/Gold palette with Madhubani borders and clean typography | Design | 1 & 2 | Pending |
| NFR-05 | **Debounced Interactions**: Rate-limiting and disabling chat send button during request processing | Security/UX | 3 | Pending |

---

## Constraints

| ID | Constraint | Source | Impact |
|----|------------|--------|--------|
| CON-01 | Single-file frontend architecture (`index.html`) | Hackathon Requirement | No module bundlers or complex framework tooling |
| CON-02 | Non-coder friendly codebase | Team Requirement | Plain, cleanly commented, modular JavaScript functions |
| CON-03 | Local state storage (`localStorage`) | Architecture | No external DB dependencies |

---

## Traceability Matrix

| Requirement | Phase | Verification Method | Status |
|-------------|-------|---------------------|--------|
| REQ-01..08, NFR-01..02 | Phase 1 (P0) | Manual site/category clicking, WhatsApp link test, form submission, admin approval check | Pending |
| REQ-09..12, NFR-04 | Phase 2 (P1) | Visual card inspection, time calculations check, verified badge check | Pending |
| REQ-13..15, NFR-03..05 | Phase 3 (P2) | End-to-end chat test, simulated offline/timeout fallback test | Pending |
| All | Phase 4 (Demo) | End-to-end hackathon demo script execution | Pending |
