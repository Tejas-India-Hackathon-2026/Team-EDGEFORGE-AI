# DECISIONS.md — Architecture Decision Records

> **Purpose**: Log significant technical decisions and their rationale.

---

## Decisions

### [DECISION-001] Single-File Frontend Architecture (`index.html`)

**Date**: 2026-08-20
**Status**: Accepted

#### Context
The project is being developed for a 24-hour hackathon by a 3-person team with zero prior coding background. Quick demonstration, portability, and zero-dependency execution are paramount.

#### Decision
Deliver the frontend in a single `index.html` file with inline CSS and JS, with zero build tools (no npm build, no bundler, no React/Vite/TypeScript).

#### Rationale
- Runs instantly by double-clicking or hosting on any static server (Netlify, GitHub Pages).
- Eliminates build pipeline errors, dependency version mismatch, and complexity.
- Easy for beginners to inspect, debug, and explain to hackathon judges.

#### Consequences
- Must structure CSS and JS into cleanly commented logical sections within `index.html`.
- Slightly longer single file, but drastically reduced operational overhead.

---

### [DECISION-002] Header Toggle for Admin Moderation View

**Date**: 2026-08-20
**Status**: Accepted

#### Context
The demo flow requires showcasing the entrepreneur submission and real-time admin review/approval cycle without introducing a full backend authentication system.

#### Decision
Provide a clean, elegant toggle button in the header (e.g., "⚙️ Admin Mode") that switches the view between Tourist Exploration and Admin Moderation Queue. Approving a listing automatically marks it with `verified: true`.

#### Rationale
- Zero friction for hackathon judges during live demonstration.
- Satisfies non-goals (no heavy backend role-based access control).
- Clearly separates Tourist View from Admin View in the UI while seamlessly setting the verified badge.

---

### [DECISION-003] Netlify Serverless Function for Groq API (`groq/compound`) with Built-in Web Search (P2)

**Date**: 2026-08-20
**Status**: Accepted

#### Context
P2 requires an AI chatbot that can answer Bihar and Jamui tourist queries with up-to-date real-time context without exposing API keys in frontend code or juggling multiple search/places APIs.

#### Decision
Implement a single plain JavaScript serverless function (`netlify/functions/chat.js`) that reads `GROQ_API_KEY` from Netlify environment variables and queries the Groq API using the `groq/compound` model, which features built-in real-time web search.

#### Rationale
- Single API solution: No separate Google Places or Google Search Grounding API required.
- Groq's high-speed inference provides instant conversational responses.
- Securely keeps the API key on the server side away from client code.
- Standalone client can still run local fallback gracefully if the serverless function is offline.

---

### [DECISION-004] Client-Side `localStorage` Data Persistence & In-Memory Seeding

**Date**: 2026-08-20
**Status**: Accepted

#### Context
Listings need to be pre-populated with authentic Bihar content while persisting newly submitted and approved listings across browser refreshes without an external database.

#### Decision
Initialize a rich pre-seeded dataset in JS. Check `localStorage` on load; if present, merge/load cached listings. Persist all admin approvals, rejections, vendor accounts, package requests, and new submissions directly to `localStorage`.

#### Rationale
- Instant response times with 0ms database latency.
- 100% offline-capable for core P0 and P1 tiers.
- Reliable state retention during judging sessions.

---

### [DECISION-005] Jamui as Default-Selected Site on Load

**Date**: 2026-08-20
**Status**: Accepted

#### Context
The TEJAS India Hackathon 2026 is physically hosted in Jamui, Bihar. Highlighting local Jamui tourism, heritage, homestays, and artisans creates an immediate connection with judges and attendees.

#### Decision
Expand the site selector to 5 sites (Jamui, Bodh Gaya, Nalanda, Sonepur Mela, Chhath Ghat) and set Jamui as the default active site when the web app loads.

#### Rationale
- Immediate wow factor for local hackathon judges.
- Showcases hyper-local tourism enablement alongside famous heritage destinations.

---

### [DECISION-006] Demo-Level Vendor Auth & Zero-Auth Tourist Package Requests

**Date**: 2026-08-20
**Status**: Accepted

#### Context
Entrepreneurs need an identity layer prior to onboarding, while tourists need a quick way to request bookings without sign-up friction.

#### Decision
1. Provide a lightweight vendor demo signup/login modal (name, phone, password stored in `localStorage`).
2. Provide a 2-field "Package Request" modal for tourists (name + phone number) directly alongside the 1-tap WhatsApp button.

#### Rationale
- Gives realistic vendor lifecycle demonstration without backend database overhead.
- Maintains zero-barrier UX for tourists.

---

*Last updated: 2026-08-20*

