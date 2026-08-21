const assert = require("assert");
const crypto = require("crypto");

const USER_ID = "test-admin";
const PASSWORD = "correct-horse-battery-staple";
const SALT = crypto.randomBytes(16);

process.env.ADMIN_USER_ID_HASH = crypto.createHash("sha256").update(USER_ID).digest("hex");
process.env.ADMIN_PASSWORD_SALT = SALT.toString("base64url");
process.env.ADMIN_PASSWORD_HASH = crypto.scryptSync(PASSWORD, SALT, 64).toString("base64url");
process.env.ADMIN_SESSION_SECRET = crypto.randomBytes(48).toString("base64url");
process.env.ADMIN_ALLOWED_ORIGINS = "https://ghoomobihar.netlify.app";

const { handler } = require("../netlify/functions/admin-auth.js");

function event(httpMethod, body, headers = {}) {
  return { httpMethod, body: body ? JSON.stringify(body) : "", headers };
}

(async () => {
  const login = await handler(event("POST", {
    action: "login",
    userId: USER_ID,
    password: PASSWORD
  }, { origin: "https://ghoomobihar.netlify.app" }));

  assert.strictEqual(login.statusCode, 200, "valid credentials should log in");
  assert(login.headers["Set-Cookie"].includes("HttpOnly"), "session cookie must be HttpOnly");
  assert(login.headers["Set-Cookie"].includes("Secure"), "session cookie must be Secure");
  assert(login.headers["Set-Cookie"].includes("SameSite=Strict"), "session cookie must be strict same-site");
  assert(!login.body.includes(USER_ID), "response must not echo the user ID");
  assert(!login.body.includes(PASSWORD), "response must not echo the password");

  const cookie = login.headers["Set-Cookie"].split(";")[0];
  const status = await handler(event("GET", null, { cookie }));
  assert.deepStrictEqual(JSON.parse(status.body), { authenticated: true }, "signed cookie should restore the session");

  const invalid = await handler(event("POST", {
    action: "login",
    userId: USER_ID,
    password: "wrong-password"
  }, { origin: "https://ghoomobihar.netlify.app" }));
  assert.strictEqual(invalid.statusCode, 401, "invalid credentials must be rejected");
  assert(!invalid.headers["Set-Cookie"], "invalid credentials must not create a session");

  const foreignOrigin = await handler(event("POST", {
    action: "login",
    userId: USER_ID,
    password: PASSWORD
  }, { origin: "https://example.com" }));
  assert.strictEqual(foreignOrigin.statusCode, 403, "untrusted origins must be rejected");

  const tamperedCookie = cookie.replace(/.$/, cookie.endsWith("a") ? "b" : "a");
  const tampered = await handler(event("GET", null, { cookie: tamperedCookie }));
  assert.deepStrictEqual(JSON.parse(tampered.body), { authenticated: false }, "tampered sessions must fail");

  const logout = await handler(event("POST", { action: "logout" }, {
    origin: "https://ghoomobihar.netlify.app",
    cookie
  }));
  assert.strictEqual(logout.statusCode, 200, "logout should succeed");
  assert(logout.headers["Set-Cookie"].includes("Max-Age=0"), "logout must clear the cookie");

  console.log("Admin authentication smoke checks passed.");
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
