# Future scope and production roadmap

GhoomoBihar currently proves the end-to-end tourism marketplace concept. This roadmap defines the work required to move from a hackathon prototype to a secure, measurable and district-scalable platform. Items below are proposed future work unless explicitly marked as implemented in the README.

## Prioritization principle

Production readiness comes before adding more visual features:

```text
central data → authorization → verification → reliability → measurement → district scale
```

## Priority 0 — Central marketplace data

Move browser-local listings and inquiries into Supabase Postgres before any public pilot.

### Proposed tables

| Table | Purpose | Essential ownership rule |
| --- | --- | --- |
| `vendor_profiles` | Public business profile linked to a Supabase user | Vendor updates only their own profile |
| `listings` | Guide, homestay, food and craft services | Vendor creates/updates own drafts; only approved records are public |
| `listing_verification_events` | Append-only moderation and evidence history | Admin/moderator write; vendor reads events for own listings |
| `booking_inquiries` | Traveler request routed to a listing owner | Listing owner reads only inquiries for owned listings |
| `district_content` | Reviewed destination facts, travel guidance and source links | Editors draft; moderators publish |
| `impact_events` | Privacy-minimized inquiry and direct-contact signals | Aggregated reporting; no fabricated revenue claims |

### Required controls

- Row Level Security on every marketplace table.
- Foreign keys from listings to authenticated vendor owners.
- Controlled listing statuses: `draft`, `pending`, `approved`, `rejected`, `suspended`.
- Immutable moderation timestamps and actor IDs.
- Server-side validation for prices, phone numbers, URLs and category values.
- Pagination and indexed filters by district, category and status.
- Retention and deletion rules for traveler inquiries.
- Migration of demo seed records without converting them into false verified claims.

### Definition of done

- A vendor submission appears on another device after authentication.
- A vendor cannot read or modify another vendor's private records.
- Anonymous users can read only approved public listings.
- Admin changes are traceable through a moderation event history.
- Clearing browser storage does not delete centralized marketplace records.

## Priority 1 — Trust and verification

- Define verification levels such as `identity checked`, `local partner checked` and `periodically re-verified`.
- Separate government-recognized credentials from platform moderation badges.
- Add document-review workflows with private object storage and strict access policies.
- Record verification expiry dates and automatic review reminders.
- Provide listing report, appeal and suspension workflows.
- Establish district-level moderation partners and escalation ownership.
- Publish traveler safety contacts and an emergency-content review process.

## Priority 2 — AI reliability and evaluation

- Keep the deterministic Yatra planner as the guaranteed baseline.
- Validate the configured Groq model against the current provider API before each release.
- Reduce and version system prompts to avoid oversized or incompatible upstream requests.
- Add provider timeouts, structured error codes, retry limits and a circuit breaker.
- Restrict AI Function CORS to approved origins.
- Ground answers in reviewed destination records with source references and last-reviewed dates.
- Create evaluation cases for route quality, factual accuracy, budget honesty, cultural sensitivity and unsafe recommendations.
- Show users whether a response is live AI, cached, deterministic or local fallback.
- Never allow AI to grant verification status or invent vendor contact details.

## Priority 3 — Booking and direct-local measurement

The platform should preserve direct contact while measuring outcomes honestly.

- Add inquiry acceptance, decline and expiry states.
- Track consented, anonymized funnel events: listing view → contact action → inquiry → provider response.
- Let providers voluntarily mark an inquiry as completed without claiming payment verification.
- Keep livelihood-impact figures separated into `estimated`, `provider-reported` and `audited` categories.
- Add an impact methodology page and district-level aggregate reporting.
- Avoid exposing individual vendor revenue or traveler identity in public analytics.

## Priority 4 — Inclusive product expansion

- Hindi and English interfaces first, followed by locally validated language support.
- Low-bandwidth mode, compressed media and offline destination summaries.
- Accessible keyboard navigation, screen-reader labels and color-contrast audits.
- Voice-assisted discovery for users with low digital literacy.
- Transparent provider onboarding for women-led enterprises, artisans and rural homestays.
- Downloadable or printable itineraries and QR discovery for low-connectivity sites.

## Priority 5 — Sustainable operations

- Production hosting plan with predictable deploy and Function capacity.
- Continuous integration for smoke, security and accessibility tests.
- Separate preview, staging and production environments.
- Centralized error monitoring, uptime checks and alert ownership.
- Database backups, tested restoration and incident-response procedures.
- Secret rotation for admin sessions and AI providers.
- Dependency and source-content review schedule.
- Privacy notice, terms, consent records and data-subject request process.

## Delivery timeline

### Next 30 days — Pilot hardening

- Implement centralized `vendor_profiles`, `listings` and `booking_inquiries` tables.
- Apply RLS policies and cross-account authorization tests.
- Resolve live AI provider compatibility while preserving fallback.
- Establish one repeatable verification checklist.
- Add staging and production deployment monitoring.

### Months 2–3 — Measurable district pilots

- Pilot centralized operations in the five current district footprints.
- Onboard real providers only after consent and verification.
- Add inquiry status tracking and privacy-safe analytics.
- Conduct accessibility, safety-content and destination-fact reviews.
- Measure provider response rate and visitor satisfaction.

### Months 4–6 — Heritage circuit expansion

- Enter Rohtas, Kaimur, Vaishali and East Champaran only after the roadmap gates are satisfied.
- Add local moderation ownership for each district.
- Expand reviewed content, multilingual support and low-bandwidth discovery.
- Publish aggregate impact reporting with a documented methodology.

### Beyond six months — Statewide network

- Apply the reusable model across all 38 Bihar districts.
- Introduce institutional dashboards for tourism partners without exposing personal data.
- Support district-level analytics, safety escalation and provider-quality improvement loops.

## Success measures

| Outcome | Example measure |
| --- | --- |
| Local supply | Approved active providers per district and category |
| Traveler utility | Itinerary completion, contact-action and inquiry rates |
| Provider responsiveness | Median first-response time and inquiry acceptance rate |
| Trust | Verification coverage, complaint rate and resolution time |
| Inclusion | Rural, artisan and women-led provider participation |
| Quality | Destination-content review freshness and AI evaluation pass rate |
| Reliability | Uptime, Function success rate and fallback frequency |
| Expansion | Districts meeting every entry gate, not merely listed on a map |

## Future-scope statement for judges

> Our first production milestone is not adding more destinations—it is centralizing listings and inquiries in Supabase with ownership-based Row Level Security and auditable moderation. Once that trust layer is proven across the five pilot footprints, we expand district-by-district using verified local supply, safety content and measurable visitor demand.
