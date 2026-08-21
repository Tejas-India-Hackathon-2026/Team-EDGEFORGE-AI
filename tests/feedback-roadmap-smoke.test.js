const fs = require("fs");
const assert = require("assert");

const html = fs.readFileSync("index.html", "utf8");
const sql = fs.readFileSync("supabase/tourism-feedback.sql", "utf8");

assert(html.includes('id="district-expansion-roadmap"'), "roadmap section is missing");
assert(html.includes('id="tourism-feedback-form"'), "feedback form is missing");
assert(html.includes('onsubmit="handleTourismFeedbackSubmit(event)"'), "feedback handler is not wired");
assert(html.includes('sb.from("tourism_feedback").insert(feedback)'), "Supabase feedback insert is missing");
assert(html.includes('sb.rpc("get_tourism_feedback_signals")'), "aggregate feedback signal RPC is missing");
assert(html.includes('localStorage.setItem("ghoomobihar_tourism_feedback"'), "offline feedback fallback is missing");
assert(html.includes("5 / 38"), "district coverage indicator is missing");
assert(sql.includes("enable row level security"), "RLS is not enabled");
assert(sql.includes("app_metadata"), "admin role policy is missing");
assert(sql.includes("get_tourism_feedback_signals"), "anonymous-safe aggregate function is missing");
assert(!html.includes("9898989800"), "hardcoded former admin credential returned");
assert(html.includes("handleAdminMagicLink()"), "secure admin email-link action is missing");
assert(html.includes("sb.auth.signInWithOtp"), "Supabase magic-link authentication is missing");
assert(html.includes("shouldCreateUser: false"), "admin email link must not create arbitrary users");

console.log("Feedback and roadmap smoke checks passed.");
