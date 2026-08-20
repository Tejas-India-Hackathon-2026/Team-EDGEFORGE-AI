---
phase: 1
plan: 1
wave: 1
updated: 2026-08-20
---

# Plan 1.1: Core Foundation & P0 Essentials

## Objective
Build and deliver the complete standalone single-file `index.html` for **GhoomoBihar**, featuring 5 Bihar destinations with **Jamui** as the default host location, rich listing cards with the updated schema (`openHours`, `rating`, `specialty`, `verified`), 1-tap WhatsApp deep links, zero-auth tourist package booking requests, demo-level vendor authentication, entrepreneur listing submissions, and admin moderation with auto-verification.

## Context
- `.gsd/SPEC.md`
- `.gsd/REQUIREMENTS.md`
- `.gsd/DECISIONS.md`
- `brain.md`

## Tasks

<task type="auto">
  <name>Task 1.1.1: Build Standalone Single-File Application (index.html)</name>
  <files>index.html</files>
  <action>
    Construct the complete, self-contained `index.html` application containing:
    1. Madhubani-inspired CSS design system (Terracotta, Deep Teal, Warm Gold, Sand background).
    2. Dynamic 5-Site Selector defaulting to Jamui on page load.
    3. Category Filter tabs for All, Guide, Homestay, Food, and Craft.
    4. Enriched listing cards rendering dynamic open/closed hours, star ratings, specialty chips, verified seals, price, and descriptions.
    5. Dual action buttons on every card: 1-tap WhatsApp connect (`wa.me`) and Package Request modal trigger.
    6. Lightweight Tourist Package Request modal (name + phone number, zero auth).
    7. Vendor Demo Auth modal (signup/login via localStorage) and Entrepreneur Listing submission form.
    8. Header toggle for Admin Moderation view with Approve (auto-sets verified: true) and Reject actions.
    9. Input sanitization (XSS prevention) and complete localStorage bidirectional persistence.
  </action>
  <verify>Check file existence, structure, and verify in browser subagent.</verify>
  <done>index.html runs standalone with all P0 interactions functioning seamlessly.</done>
</task>

<task type="auto">
  <name>Task 1.1.2: End-to-End Browser Verification & State Sync Check</name>
  <files>index.html</files>
  <action>
    Execute full browser subagent test validating:
    - Default site is Jamui on initial load.
    - Category filtering displays matching cards.
    - Tourist package request captures name and phone and stores in localStorage.
    - Vendor signs up and submits a new listing to the pending queue.
    - Admin approves the listing and it immediately renders in live view with the verified badge.
    - Page reload preserves all localStorage state.
  </action>
  <verify>Browser subagent execution with visual and state confirmation.</verify>
  <done>All P0 verification criteria pass with zero errors.</done>
</task>

## Success Criteria
- [ ] `index.html` runs with zero build steps by opening in any standard browser.
- [ ] Jamui is default-selected on initial load with authentic local listings.
- [ ] Instant site and category switching.
- [ ] 1-tap WhatsApp deep link correctly formats phone and encoded message.
- [ ] Tourist package request modal captures bookings without login.
- [ ] Vendor demo auth modal enables login/signup and listing creation.
- [ ] Admin approval automatically grants `verified: true` badge to listings.
- [ ] All dynamic state persists across page refreshes via `localStorage`.
