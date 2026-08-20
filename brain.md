# GhoomoBihar — Brain & Project Quick-Context

> **One-Liner:** Lightweight, zero-barrier QR-code tourism discovery web platform for Bihar, connecting tourists directly with local guides, homestays, food vendors, and artisans via WhatsApp and package requests. Built for **TEJAS India Hackathon 2026 (Bihar Tourism Track)**.

---

## 📍 Current Status
- **Milestone:** `v1.0` | **Phase:** Phase 3 Complete (AI Concierge Delivered) $\rightarrow$ Phase 4 (Demo Readiness)
- **Architecture:** Zero-build single-file frontend (`index.html`) + 1 Netlify serverless function (`netlify/functions/chat.js`)

---

## 🎯 Navigation & Scope
- **Default Home View:** **"Discover Bihar"** hub with 5 destination cards showcasing rich photos, cultural significance, and direct exploration CTAs.
- **Destination Detail View:**
  - Full-image background hero banner with dark gradient readability overlay.
  - "Why Visit & History" narrative blurb.
  - "Getting There" info block (distance from Patna, railway station, travel time).
  - "Visitor Tips" block (best time to visit + insider tips).
  - Filtered local business listings (Guide, Homestay, Food, Craft, Other).
- **5 Sites:** **Jamui** (🌟 Default Host Location), Bodh Gaya, Nalanda, Sonepur Mela, Chhath Ghat (plus custom "Other" destinations).
- **Tourist Interactions:** 1-tap WhatsApp deep link (`wa.me`) + Direct phone call link + Lightweight Package Request modal with itemized confirmation receipt (zero auth required).
- **AI Concierge (P2):** Chatbot powered exclusively by **Groq API (`groq/compound` model with built-in real-time web search)**. `GROQ_API_KEY` secured server-side in Netlify function. No Gemini API, Google Search Grounding, or Google Places API.

---

## 🔐 Auth & Verification Model (Simplified Passwordless)
| Role | Auth Identifier | Capabilities & Flow |
|---|---|---|
| **Admin** | Supabase email/password plus server-controlled `app_metadata.role = "admin"` | Unlocks Admin Dashboard (photo thumbnails, 1-click "Approve & Verify" with auto-verified seal, inquiries log) |
| **Vendor / Business** | Phone alone (`localStorage`) + Email (Contact info) | Passwordless login by phone. Accesses Vendor Portal: "My Inquiries" (filtered requests), "My Listings", and "+ Submit New Listing" (with photo upload) |
| **Traveler (Optional)** | Name + Phone (Zero password) | Local profile auto-filling booking forms. Full browsing and bookings remain 100% zero-login |

---

## 📦 Listing Data Schema
```javascript
{
  id: "jamui-g-01",              // string: unique identifier
  title: "Gidhaur Heritage Tour",// string: listing / business name
  category: "guide",             // "guide" | "homestay" | "food" | "craft" | custom string
  site: "jamui",                 // "jamui" | "bodh-gaya" | "nalanda" | "sonepur" | "chhath-ghat" | custom string
  description: "...",            // string: rich description with local lore
  price: "₹800/group",           // string: indicative pricing in INR
  whatsapp: "919876543210",       // string: phone number for calls & wa.me
  openHours: "06:00-18:00",      // string: 24h format "HH:MM-HH:MM"
  rating: 4.9,                   // number: 1.0 to 5.0 rating
  specialty: "Historical Lore",  // string: highlight chip text (auto-suggested from category)
  verified: true,                // boolean: true if pre-seeded or admin-approved
  status: "approved",            // "approved" | "pending" | "rejected"
  submittedBy: "Vendor Name",    // string: author of listing for inquiry filtering
  photo: "data:image/...;base64" // string: base64 data URL or asset image URL
}
```

---

## 🔒 Locked Architectural Decisions (Do Not Re-debate)
1. **Single-File Client (`index.html`)**: Pure Vanilla HTML/CSS/JS. No React, Vite, Vue, TypeScript, Tailwind, or npm build steps.
2. **Local Persistence**: `localStorage` handles all dynamic state (custom listings, approvals, vendor auth, traveler profile, package requests).
3. **Groq Compound AI**: Single unified API for LLM + real-time web search via `netlify/functions/chat.js`. Never expose `GROQ_API_KEY` to client.
4. **Discover Bihar First**: Landing page is the default home view; clicking a destination opens the full detail view with travel logistics and listings.
5. **Passwordless Vendor Auth**: Phone number alone identifies vendors; no password barrier.
6. **Photo-Enabled Listings**: Uploaded listing photos convert to base64 and auto-render on listing cards.
7. **Explicit Non-Goals**: No group/organization booking forms, no adult/child tiered pricing, no multi-image gallery inside details.

---

## 📁 Key File Locations
- **`index.html`** — Standalone frontend (HTML structure, Madhubani CSS tokens, Vanilla JS state & rendering).
- **`assets/`** — Destination images (`jamui.jpeg`, `bodh_gaya.jpeg`, `nalanda.jpeg`, `sonepur_mela.jpeg`, `chhath_ghat.jpeg`).
- **`netlify/functions/chat.js`** — Serverless proxy calling Groq API (`groq/compound`) using server-side env vars.
- **`brain.md`** — This file (fast context sheet for future AI agent sessions).
- **`.gsd/`** — Project specification and planning files (`SPEC.md`, `REQUIREMENTS.md`, `ROADMAP.md`, `TODO.md`, `DECISIONS.md`, `STATE.md`).

