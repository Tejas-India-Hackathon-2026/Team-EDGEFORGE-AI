---
phase: 3
plan: 1
wave: 1
updated: 2026-08-20
---

# Plan 3.1: AI Tourism Concierge & Groq Serverless Gateway (P2)

## Objective
Build an embedded conversational **AI Tourism Concierge** powered by Groq's `groq/compound` model with built-in real-time web search capability via a secure Netlify serverless proxy (`netlify/functions/chat.js`), zero client API key exposure, and a rock-solid local fallback engine for offline / static browser usage.

## Context
- `.gsd/SPEC.md` (Goal 5: AI-Driven Tourism Concierge)
- `.gsd/REQUIREMENTS.md` (REQ-15, REQ-16, REQ-17, NFR-03, NFR-05)
- `brain.md`
- `netlify/functions/chat.js`
- `index.html`

## Tasks

<task type="auto">
  <name>Task 3.1.1: Build Netlify Serverless Proxy (netlify/functions/chat.js)</name>
  <files>netlify/functions/chat.js, netlify.toml, .env.example</files>
  <action>
    1. Create `netlify/functions/chat.js` with HTTPS POST handler calling Groq's OpenAI-compatible completions API with `groq/compound`.
    2. Inject grounded system prompt with deep Bihar tourism domain knowledge (Jamui host location, Bodh Gaya, Nalanda, Sonepur Mela, Chhath Ghat, local cuisine, travel logistics, and WhatsApp direct bookings).
    3. Read `process.env.GROQ_API_KEY` securely without client exposure.
    4. Create `netlify.toml` and `.env.example`.
  </action>
  <verify>Check syntax and structure of chat.js and netlify.toml.</verify>
  <done>Serverless proxy is created, secure, and ready for deployment.</done>
</task>

<task type="auto">
  <name>Task 3.1.2: Build Embedded Conversational UI in index.html</name>
  <files>index.html</files>
  <action>
    1. Add floating action button (`✨ Ask Bihar AI Concierge`) with subtle glow and badge.
    2. Add expandable chat drawer with status indicator (`🌐 Live Groq Compound AI` vs `⚡ Local Knowledge Mode`).
    3. Add 5 quick-prompt suggestion chips (Jamui tours, Simultala transit, Bodh Gaya season, Silao Khaja, Nalanda ruins).
    4. Build message stream with Markdown formatting, typing indicator, and recommendation cards with direct 1-tap WhatsApp buttons.
    5. Implement debounced input box and send button.
  </action>
  <verify>Verify chat widget triggers, quick prompt execution, message formatting, and drawer responsiveness.</verify>
  <done>Embedded chat UI functions seamlessly with rich typography and micro-interactions.</done>
</task>

<task type="auto">
  <name>Task 3.1.3: Build Zero-Fail Local Knowledge Engine</name>
  <files>index.html</files>
  <action>
    1. Implement `queryLocalKnowledgeEngine(userQuery)` in JavaScript.
    2. Add comprehensive Bihar tourism knowledge base covering:
       - Jamui (Minto Tower, Simultala pine valley, Nagi-Nakti birds, soft chhena sweets).
       - Bodh Gaya (Mahabodhi Temple, 5 AM morning chanting, Sujata village homestay, Litti Chokha).
       - Nalanda (Ancient university ruins, GI-tagged Silao Khaja, Bawan Buti handloom weavers).
       - Sonepur Mela (Ganga-Gandak sangam, Kartik Purnima fair, giant saffron jalebis, brass bells).
       - Chhath Ghat (Patna sunrise Ganges boat tour, pure ghee woodfire thekua, painted bamboo soop).
       - Transit logistics from Patna to all 5 destinations.
    3. Seamlessly route to the local engine when offline or when running as a standalone `file:///` page.
  </action>
  <verify>Test quick prompts and custom queries in local fallback mode.</verify>
  <done>AI Concierge guarantees 100% uptime with instant, high-quality responses even without an active server.</done>
</task>

## Success Criteria
- [ ] Floating AI trigger button opens/closes the chat drawer smoothly.
- [ ] Netlify serverless function securely proxies Groq API requests with zero client key exposure.
- [ ] Quick prompt chips execute instant travel queries.
- [ ] Recommendations include direct 1-tap WhatsApp booking action buttons.
- [ ] Zero-fail local knowledge engine provides immediate, high-quality responses offline or via `file:///`.
- [ ] All existing features (Discover Bihar hub, site detail logistics, listing filters, passwordless auth, admin moderation) remain intact.
