---
phase: 2
plan: 1
wave: 1
updated: 2026-08-20
---

# Plan 2.1: Bihari Folk Aesthetics & P1 Metadata Enhancements

## Objective
Implement Phase 2 (P1) features into [index.html](file:///c:/Users/sumit/OneDrive/Documents/college-project/index.html):
1. **Dynamic Open/Closed Status Calculation Engine**: Real-time status evaluator computing whether a listing is currently open, closed, or open 24/7 based on `openHours` vs the user's client clock with a live animated status pill badge.
2. **Visual Star Ratings & Customer Feedback Badges**: Display star ratings (`★ 4.9`) with clear score styling.
3. **Specialty Highlight Chips**: Folk-themed visual badge with icon for each provider's unique specialty.
4. **Verified Trust Seals**: Distinctive verified checkmark seal on admin-approved and pre-verified listings.
5. **Authentic Folk Art Motifs & Micro-Interactions**: Enhanced Madhubani border trims, stamp styling, and visual polish.

## Context
- `.gsd/SPEC.md` (Goal 4: Rich Metadata & Trust Signals)
- `.gsd/REQUIREMENTS.md` (REQ-11, REQ-12, REQ-13, REQ-14, NFR-04)
- `brain.md`
- `index.html`

## Tasks

<task type="auto">
  <name>Task 2.1.1: Build Dynamic Open/Closed Status Calculation Engine</name>
  <files>index.html</files>
  <action>
    Implement `computeOpenStatus(openHours)` in JavaScript inside `index.html`:
    - Handles `"24 Hours"`, `"24/7"`, and standard `"HH:MM-HH:MM"` (e.g. `06:00-18:00`, `05:30-17:30`, `08:00-22:00`).
    - Compares start and end time against `new Date()` client time.
    - Handles overnight operating hours (e.g. `18:00-02:00`).
    - Returns `{ isOpen, text, badgeClass, nextEventText }`.
    - Formats 12h readable time (e.g. `6:00 PM`).
    - Renders a live status pill badge on each listing card:
      - `🟢 Open Now • Closes at 6:00 PM`
      - `🔴 Closed Now • Opens at 6:00 AM`
      - `🟢 Open 24 Hours`
    - Sets up a periodic timer (every 60s) to re-evaluate open status automatically.
  </action>
  <verify>Test with multiple operating hours across morning, evening, and 24-hour ranges.</verify>
  <done>Listings dynamically display accurate real-time open/closed status badges.</done>
</task>

<task type="auto">
  <name>Task 2.1.2: Polish P1 Metadata Display & Folk Art Aesthetics</name>
  <files>index.html</files>
  <action>
    Enhance listing cards and destination detail view:
    1. Prominent Star Rating badge (`★ 4.9`) with score formatting.
    2. Distinctive Folk Specialty Highlight chip with category-specific icon.
    3. Verified Trust Seal (`✓ Verified Local Host`) with green/teal border.
    4. Madhubani aesthetic accents (lotus stamps, border flourishes, elegant shadows).
  </action>
  <verify>Inspect listing cards across Jamui, Bodh Gaya, Nalanda, Sonepur Mela, and Chhath Ghat.</verify>
  <done>All P1 metadata fields render cleanly with authentic Bihari aesthetics.</done>
</task>

## Success Criteria
- [ ] Real-time dynamic open/closed status calculated accurately from `openHours`.
- [ ] 24-hour, daytime, and overnight operating hours parsed properly.
- [ ] Live status badge shows closing/opening countdown or target time.
- [ ] Star ratings, specialty highlight chips, and verified checkmarks displayed cleanly.
- [ ] All existing core flows (WhatsApp, package request, passwordless auth, admin moderation, Discover Bihar home) preserved.
