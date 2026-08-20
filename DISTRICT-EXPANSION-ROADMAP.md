# District expansion roadmap

GhoomoBihar currently demonstrates five destination clusters mapped to five district footprints: Jamui, Gaya, Nalanda, Saran and Patna. Bihar has 38 districts, so expansion must preserve verification and visitor safety instead of adding unmoderated listings quickly.

## Phase 1 — Live pilot

**District footprints:** Jamui, Gaya, Nalanda, Saran and Patna.

Validate the complete loop: QR discovery → destination guidance → verified local business connection → booking inquiry → tourism feedback → admin moderation.

## Phase 2 — Heritage circuit expansion (proposed, next six months)

**Priority districts:** Rohtas, Kaimur, Vaishali and East Champaran.

Entry gate for each district:

- At least 10 verified local providers across guides, stays, food and crafts.
- District content reviewed against official Bihar Tourism or district administration sources.
- Safety contacts, nearest transport and visitor guidance documented.
- A named local moderation partner and feedback-response owner.
- Successful pilot with measurable inquiries and visitor satisfaction.

## Phase 3 — Statewide 38-district network

Roll out the reusable district template to the remaining 29 districts with multilingual AI guidance, standardized verification, safety escalation and district-level analytics.

## Feedback-driven prioritization

The website feedback form asks which district visitors want next. The public roadmap displays only aggregate demand. Names and comments are not published automatically; any public excerpt requires explicit consent and moderation.

### Deployment step

Run `supabase/tourism-feedback.sql` once in the project's Supabase SQL Editor. It creates the feedback table, validation constraints, Row Level Security policies and an anonymous-safe aggregate function. If the SQL has not been installed yet, the live form keeps working with a browser-local demo fallback.

## Success metrics

- Verified providers per district.
- Tourist inquiries and WhatsApp connections.
- Average visitor rating and recommendation rate.
- Safety or trust complaints resolved.
- Feedback-to-improvement turnaround time.
- Local provider response and conversion rate.

## Official reference points

- Bihar State Data Lab district structure: https://statedata.bihar.gov.in/
- Bihar Tourism destinations: https://tourism.bihar.gov.in/en/destinations
- Bihar Tourism district directory: https://tourism.bihar.gov.in/en/districts
