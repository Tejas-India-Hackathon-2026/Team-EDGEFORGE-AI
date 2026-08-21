const fs = require("fs");
const assert = require("assert");

const html = fs.readFileSync("index.html", "utf8");
const sql = fs.readFileSync("supabase/tourism-feedback.sql", "utf8");
const adminAuth = fs.readFileSync("netlify/functions/admin-auth.js", "utf8");

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
assert(html.includes('onsubmit="handleAdminServerLogin(event)"'), "admin form must use the server login gateway");
assert(html.includes('placeholder="Enter your user ID"'), "generic admin user ID placeholder is missing");
assert(html.includes('placeholder="Enter password"'), "generic admin password placeholder is missing");
assert(html.includes('id="admin-login-password"'), "masked admin password field is missing");
assert(html.includes("fetchAdminSession"), "admin session gateway is not wired");
assert(!html.includes("handleAdminMagicLink"), "obsolete Supabase admin magic link returned");
assert(!html.includes("sb.auth.signInWithOtp"), "Supabase admin magic link must not be used");
assert(adminAuth.includes("crypto.scryptSync"), "server-side password hashing is missing");
assert(adminAuth.includes("ADMIN_USER_ID_HASH"), "admin user ID hash environment variable is missing");
assert(adminAuth.includes("ADMIN_PASSWORD_HASH"), "admin password hash environment variable is missing");
assert(adminAuth.includes("ADMIN_SESSION_SECRET"), "admin session signing secret is missing");
assert(adminAuth.includes("HttpOnly; Secure; SameSite=Strict"), "secure admin cookie flags are missing");

console.log("Feedback and roadmap smoke checks passed.");
