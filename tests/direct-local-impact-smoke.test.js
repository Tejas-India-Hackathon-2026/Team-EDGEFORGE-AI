const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");

[
  "Direct-to-Local Impact",
  "Estimated demo metrics",
  "100% direct vendor contact — no middleman commission",
  "Estimated local livelihood impact:",
  "✓ Verified",
  "⏳ Pending verification",
  "potential direct local spend—not a confirmed payment, vendor profit, or measured livelihood income"
].forEach((text) => assert(html.includes(text), `missing impact disclosure: ${text}`));

assert(html.includes('id="confirmation-direct-impact-slot"'), "booking confirmation should include an impact slot");
assert(html.includes('createDirectLocalImpactCard(impact, "booking")'), "booking confirmation should render its impact proof");
assert(html.includes('createDirectLocalImpactCard(planImpact, "plan")'), "Yatra itinerary should render its impact proof");
assert(html.includes("impactSnapshot"), "booking request should preserve its impact snapshot");

const start = html.indexOf("const DIRECT_IMPACT_ROLE_LABELS");
const end = html.indexOf("function migrateBuiltInListingPhotos", start);
assert(start >= 0 && end > start, "impact calculation helpers should be present");

const context = {};
vm.createContext(context);
vm.runInContext(`${html.slice(start, end)}\nthis.impactApi = { parseIndicativePrice, buildDirectLocalImpact, formatImpactRupees };`, context);

assert.strictEqual(context.impactApi.parseIndicativePrice("₹1,400/night"), 1400, "formatted prices should parse");
assert.strictEqual(context.impactApi.parseIndicativePrice("Standard Rate"), 0, "missing numeric prices should not invent value");

const single = context.impactApi.buildDirectLocalImpact({
  category: "guide",
  price: "₹800/group",
  status: "approved",
  verified: true
});
assert.strictEqual(single.amount, 800, "single booking estimate should equal its indicative listing price");
assert.deepStrictEqual([...single.roles], ["local guide"], "single booking should name only its actual role");
assert.strictEqual(single.verified, true, "approved verified listing should show verified");

const plan = context.impactApi.buildDirectLocalImpact([
  { category: "guide", price: "₹800/group", status: "approved", verified: true },
  { category: "craft", price: "₹350/piece", status: "approved", verified: true },
  { category: "food", price: "₹160/box", status: "approved", verified: false }
]);
assert.strictEqual(plan.amount, 1310, "plan estimate should sum one unit of each included listing");
assert.deepStrictEqual([...plan.roles], ["local guide", "artisan", "food vendor"], "plan should aggregate only included roles");
assert.strictEqual(plan.verified, false, "any unverified provider should make plan status pending");
assert.strictEqual(context.impactApi.formatImpactRupees(plan.amount), "₹1,310", "impact amount should use Indian formatting");

console.log("Direct-to-Local Impact checks passed.");
