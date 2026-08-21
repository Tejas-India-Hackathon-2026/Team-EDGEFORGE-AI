/**
 * GhoomoBihar admin authentication gateway.
 *
 * Credentials are verified only inside Netlify using salted hashes stored in
 * environment variables. The browser receives an opaque, signed HttpOnly
 * cookie—never the configured user ID, password, hashes, or signing secret.
 */

const crypto = require("crypto");

const COOKIE_NAME = "gb_admin_session";
const SESSION_TTL_SECONDS = 4 * 60 * 60;
const LIVE_ORIGIN = "https://ghoomobihar.netlify.app";

function json(statusCode, body, extraHeaders = {}) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store, max-age=0",
      "X-Content-Type-Options": "nosniff",
      ...extraHeaders
    },
    body: JSON.stringify(body)
  };
}

function configuredOrigins() {
  return (process.env.ADMIN_ALLOWED_ORIGINS || LIVE_ORIGIN)
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function isTrustedOrigin(event) {
  const origin = event.headers.origin || event.headers.Origin || "";
  return configuredOrigins().includes(origin);
}

function readCookie(event, name) {
  const raw = event.headers.cookie || event.headers.Cookie || "";
  for (const part of raw.split(";")) {
    const [cookieName, ...cookieValue] = part.trim().split("=");
    if (cookieName === name) return cookieValue.join("=");
  }
  return "";
}

function safeBufferEqual(left, right) {
  if (!Buffer.isBuffer(left) || !Buffer.isBuffer(right) || left.length !== right.length) {
    return false;
  }
  return crypto.timingSafeEqual(left, right);
}

function safeHexEqual(actualHex, expectedHex) {
  if (!/^[a-f0-9]+$/i.test(actualHex) || !/^[a-f0-9]+$/i.test(expectedHex)) return false;
  return safeBufferEqual(Buffer.from(actualHex, "hex"), Buffer.from(expectedHex, "hex"));
}

function safeBase64UrlEqual(actual, expected) {
  try {
    return safeBufferEqual(Buffer.from(actual, "base64url"), Buffer.from(expected, "base64url"));
  } catch (_error) {
    return false;
  }
}

function hasRequiredSecrets() {
  return Boolean(
    process.env.ADMIN_USER_ID_HASH &&
    process.env.ADMIN_PASSWORD_SALT &&
    process.env.ADMIN_PASSWORD_HASH &&
    process.env.ADMIN_SESSION_SECRET
  );
}

function verifyCredentials(userId, password) {
  const userIdHash = crypto.createHash("sha256").update(userId, "utf8").digest("hex");
  const userMatches = safeHexEqual(userIdHash, process.env.ADMIN_USER_ID_HASH);

  let passwordHash;
  try {
    passwordHash = crypto.scryptSync(
      password,
      Buffer.from(process.env.ADMIN_PASSWORD_SALT, "base64url"),
      64
    ).toString("base64url");
  } catch (_error) {
    return false;
  }

  const passwordMatches = safeBase64UrlEqual(passwordHash, process.env.ADMIN_PASSWORD_HASH);
  return userMatches && passwordMatches;
}

function signSession() {
  const now = Math.floor(Date.now() / 1000);
  const payload = Buffer.from(JSON.stringify({
    sub: "admin",
    iat: now,
    exp: now + SESSION_TTL_SECONDS,
    nonce: crypto.randomBytes(12).toString("base64url")
  })).toString("base64url");

  const signature = crypto
    .createHmac("sha256", process.env.ADMIN_SESSION_SECRET)
    .update(payload)
    .digest("base64url");

  return `${payload}.${signature}`;
}

function verifySession(token) {
  if (!token || !hasRequiredSecrets()) return false;
  const [payload, signature, extra] = token.split(".");
  if (!payload || !signature || extra) return false;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.ADMIN_SESSION_SECRET)
    .update(payload)
    .digest("base64url");

  if (!safeBase64UrlEqual(signature, expectedSignature)) return false;

  try {
    const claims = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    const now = Math.floor(Date.now() / 1000);
    return claims.sub === "admin" && Number.isInteger(claims.exp) && claims.exp > now;
  } catch (_error) {
    return false;
  }
}

function sessionCookie(token) {
  return `${COOKIE_NAME}=${token}; Path=/; Max-Age=${SESSION_TTL_SECONDS}; HttpOnly; Secure; SameSite=Strict`;
}

function clearSessionCookie() {
  return `${COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict`;
}

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

exports.handler = async function (event) {
  if (event.httpMethod === "GET") {
    const token = readCookie(event, COOKIE_NAME);
    return json(200, { authenticated: verifySession(token) });
  }

  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed." }, { Allow: "GET, POST" });
  }

  if (!isTrustedOrigin(event)) {
    return json(403, { error: "Request origin is not allowed." });
  }

  if ((event.body || "").length > 2048) {
    return json(413, { error: "Request is too large." });
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch (_error) {
    return json(400, { error: "Invalid request." });
  }

  if (payload.action === "logout") {
    return json(200, { authenticated: false }, { "Set-Cookie": clearSessionCookie() });
  }

  if (payload.action !== "login") {
    return json(400, { error: "Invalid action." });
  }

  if (!hasRequiredSecrets()) {
    console.error("Admin authentication environment variables are incomplete.");
    return json(503, { error: "Admin authentication is not configured." });
  }

  const userId = typeof payload.userId === "string" ? payload.userId.trim() : "";
  const password = typeof payload.password === "string" ? payload.password : "";

  if (!userId || !password || userId.length > 100 || password.length > 256) {
    await wait(350);
    return json(401, { error: "Invalid user ID or password." });
  }

  if (!verifyCredentials(userId, password)) {
    await wait(350);
    return json(401, { error: "Invalid user ID or password." });
  }

  return json(
    200,
    { authenticated: true, expiresIn: SESSION_TTL_SECONDS },
    { "Set-Cookie": sessionCookie(signSession()) }
  );
};
