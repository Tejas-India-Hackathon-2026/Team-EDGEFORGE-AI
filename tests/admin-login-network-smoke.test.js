const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const start = html.indexOf("const ADMIN_AUTH_RETRY_DELAYS_MS");
const end = html.indexOf("function activateAdminDashboard", start);

assert(start >= 0 && end > start, "admin network helper should be present");

const helperSource = html
  .slice(start, end)
  .replace("[0, 500, 1200]", "[0, 0, 0]");

function createContext(fetchImpl) {
  const context = {
    AbortController,
    Error,
    Promise,
    clearTimeout,
    fetch: fetchImpl,
    setTimeout
  };
  vm.createContext(context);
  vm.runInContext(`${helperSource}\nthis.fetchAdminSession = fetchAdminSession;`, context);
  return context;
}

(async () => {
  let attempts = 0;
  const recovered = createContext(async () => {
    attempts += 1;
    if (attempts === 1) throw new TypeError("temporary network failure");
    return { status: 401, json: async () => ({ authenticated: false }) };
  });

  const recoveredResult = await recovered.fetchAdminSession({ method: "POST" });
  assert.strictEqual(attempts, 2, "a temporary network failure should be retried");
  assert.strictEqual(recoveredResult.response.status, 401, "the successful retry response should be returned");

  let gatewayAttempts = 0;
  const gateway = createContext(async () => {
    gatewayAttempts += 1;
    return { status: 503, json: async () => ({ error: "temporary" }) };
  });

  const gatewayResult = await gateway.fetchAdminSession({ method: "POST" });
  assert.strictEqual(gatewayAttempts, 3, "temporary Netlify gateway responses should be retried");
  assert.strictEqual(gatewayResult.response.status, 503, "the final gateway response should be returned");

  console.log("Admin login network retry checks passed.");
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
