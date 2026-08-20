---
milestone: v1.0
version: 1.0.0
updated: 2026-08-20
---

# Roadmap

> **Current Phase:** Phase 4: Hackathon Demo Verification & Plain-English Team Guide
> **Status:** Phase 3 Complete (Ready for Phase 4)

## Must-Haves (from SPEC)

- [x] **P0 Core Platform**: 5 site selectors with Jamui as default-selected on page load (plus Bodh Gaya, Nalanda, Sonepur Mela, Chhath Ghat), 5 category filters, rich listing cards with data schema (`openHours`, `rating`, `specialty`, `verified`), 1-tap WhatsApp deep links (`wa.me`), and lightweight tourist package request form (name + phone number).
- [x] **P0 Vendor Auth, Onboarding & Admin**: Demo-level vendor signup/login (name/phone/password in `localStorage`), entrepreneur listing submission, clean admin moderation toggle where approve automatically sets `verified: true` badge, full `localStorage` persistence.
- [x] **P0 Security & Architecture**: Zero-build single-file `index.html` with robust HTML input sanitization (XSS prevention).
- [x] **P1 Visual Polish & Dynamic Metadata**: Dynamic open/closed time calculations from `openHours`, static star ratings (e.g. 4.8★), specialty highlight tags, verified badges, Madhubani-inspired theme.
- [x] **P2 AI Tourism Concierge**: Embedded chat UI, plain JS Netlify serverless function for Groq API (`groq/compound` model with built-in real-time web search), zero frontend API key exposure, zero-fail local listings fallback.
- [ ] **Demo Readiness & Plain-English Guides**: 100% executable demo flow showcasing Jamui host site, tourist package requests, vendor demo auth & admin verification, Groq AI concierge.

---

## Phases

### Phase 1: Core Foundation & P0 Essentials
**Status:** 🟩 Complete
**Objective:** Deliver guaranteed, zero-friction core platform with 5 sites (Jamui default), WhatsApp links, tourist package request form, vendor demo auth, onboarding, admin moderation with auto-verification, and localStorage persistence.
**Requirements:** REQ-01, REQ-02, REQ-03, REQ-04, REQ-05, REQ-06, REQ-07, REQ-08, REQ-09, REQ-10, NFR-01, NFR-02

**Plans:**
- [x] Plan 1.1: Core Data Models (Schema with `openHours`, `rating`, `specialty`, `verified`), Storage Sync & Security Sanitizer
- [x] Plan 1.2: 5-Site Selector (Jamui as Default), Category Filtering & Listing Cards Rendering
- [x] Plan 1.3: WhatsApp Deep-Link Generator & Tourist Package Request Form (Name + Phone)
- [x] Plan 1.4: Vendor Demo Auth (Signup/Login via `localStorage`) & Entrepreneur Onboarding Modal
- [x] Plan 1.5: Admin Moderation View (Approve/Reject) with Auto-Verified Flag & Real-Time Sync

---

### Phase 2: Bihari Folk Aesthetics & P1 Metadata Enhancements
**Status:** 🟩 Complete
**Objective:** Apply authentic Madhubani terracotta/teal/gold design system and render dynamic operational hours badges, ratings, specialty tags, and verified seals.
**Requirements:** REQ-11, REQ-12, REQ-13, REQ-14, NFR-04
**Depends on:** Phase 1

**Plans:**
- [x] Plan 2.1: Bihari Folk Art Design System (Palette, Typography, Madhubani Borders & Icons)
- [x] Plan 2.2: Dynamic Open/Closed Status Calculator & Real-Time Time Engine (from `openHours`)
- [x] Plan 2.3: Specialty Chips, Star Ratings & Auto-Verified Badges

---

### Phase 3: AI Tourism Concierge & Groq Serverless Gateway (P2)
**Status:** 🟩 Complete
**Objective:** Build embedded conversational tourism concierge with a lightweight Netlify function calling Groq API (`groq/compound` model with built-in real-time web search) and rock-solid local fallback.
**Requirements:** REQ-15, REQ-16, REQ-17, NFR-03, NFR-05
**Depends on:** Phase 2

**Plans:**
- [x] Plan 3.1: Embedded Chat UI Widget & Interaction State
- [x] Plan 3.2: Netlify Serverless Function (`netlify/functions/chat.js`) with Groq API (`groq/compound` with Built-in Web Search) & Secret Management
- [x] Plan 3.3: Robust Offline / Failure Fallback Engine to Curated Local Listings

---

### Phase 4: Hackathon Demo Verification & Plain-English Team Guide
**Status:** ⬜ Not Started
**Objective:** Verify entire end-to-end demo flow in browser subagent, test edge cases, and produce plain-English documentation for the 3-person non-coder hackathon team.
**Depends on:** Phase 3

**Plans:**
- [ ] Plan 4.1: End-to-End Browser Subagent Verification & Recording
- [ ] Plan 4.2: Hackathon Demo Script Cheat-Sheet & Plain-English Code Walkthrough

---

## Progress Summary

| Phase | Status | Plans | Complete |
|-------|--------|-------|----------|
| 1. Foundation & P0 Essentials | 🟩 Complete | 5/5 | 100% |
| 2. Bihari Folk Design & P1 Polish | 🟩 Complete | 3/3 | 100% |
| 3. AI Concierge & Serverless Groq P2 | 🟩 Complete | 3/3 | 100% |
| 4. Demo Verification & Team Guide | ⬜ Not Started | 0/2 | — |

---

## Timeline

| Phase | Started | Completed | Duration |
|-------|---------|-----------|----------|
| 1 | 2026-08-20 | 2026-08-20 | 1h |
| 2 | 2026-08-20 | 2026-08-20 | 30m |
| 3 | 2026-08-20 | 2026-08-20 | 25m |
| 4 | — | — | — |


