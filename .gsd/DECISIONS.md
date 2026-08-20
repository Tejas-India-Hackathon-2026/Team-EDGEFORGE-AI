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
The demo flow requires showcasing the entrepreneur submission and real-time admin review/approval cycle without introducing a full authentication system.

#### Decision
Provide a clean, elegant toggle button in the header (e.g., "⚙️ Admin Mode") that switches the view between Tourist Exploration and Admin Moderation Queue.

#### Rationale
- Zero friction for hackathon judges during live demonstration.
- Satisfies non-goals (no heavy login/auth system).
- Clearly separates Tourist View from Admin View in the UI.

---

### [DECISION-003] Netlify Serverless Function for AI Search Grounding (P2)

**Date**: 2026-08-20
**Status**: Accepted

#### Context
P2 requires an AI chatbot using Gemini API with Google Search Grounding to answer tourist queries and link to official Bihar Tourism portals without exposing API keys in frontend code.

#### Decision
Implement a single plain JavaScript serverless function (`netlify/functions/chat.js`) that reads `GEMINI_API_KEY` from environment variables, queries the Gemini API with Search Grounding tool enabled, and formats responses with direct listing matches and fallback.

#### Rationale
- Securely encapsulates API keys.
- Free and instant deployment on Netlify.
- Does not compromise the standalone frontend architecture.

---

### [DECISION-004] Client-Side `localStorage` Data Persistence & In-Memory Seeding

**Date**: 2026-08-20
**Status**: Accepted

#### Context
Listings need to be pre-populated with authentic Bihar content while persisting newly submitted and approved listings across browser refreshes without an external database.

#### Decision
Initialize a rich pre-seeded dataset in JS. Check `localStorage` on load; if present, merge/load cached listings. Persist all admin approvals, rejections, and new submissions directly to `localStorage`.

#### Rationale
- Instant response times with 0ms database latency.
- 100% offline-capable for core P0 and P1 tiers.
- Reliable state retention during judging sessions.

---

*Last updated: 2026-08-20*
