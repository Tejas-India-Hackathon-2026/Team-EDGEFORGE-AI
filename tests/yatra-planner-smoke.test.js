const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");

[
  "✨ Plan My Bihar Yatra",
  "1 day",
  "2 days",
  "3 days",
  "4+ days",
  "Under ₹2,000",
  "₹2–5k",
  "₹5–10k",
  "Flexible",
  "Buddhist heritage",
  "History & culture",
  "Food",
  "Nature",
  "Family",
  "Mix",
  "Patna",
  "Jamui",
  "Bodh Gaya",
  "Other"
].forEach((label) => assert(html.includes(label), `missing planner option: ${label}`));

assert(html.includes("Perfect! Main aapke liye personal Bihar travel plan banaunga."), "missing day question");
assert(html.includes("Aapka approximate budget kya hai?"), "missing budget question");
assert(html.includes("Per person, per day. Travel into Bihar is not included."), "budget basis should be explicit");
assert(html.includes("Aapko kis type ka experience pasand hai?"), "missing experience question");
assert(html.includes("Aap trip kahan se start karna chahenge?"), "missing start question");
assert(html.includes("Agar aap first-time visitor hain, Patna se start karna easiest rahega"), "missing start recommendation");
assert(html.includes("https://wa.me/?text="), "full itinerary should be shareable on WhatsApp");
assert(html.includes("findYatraListing(site, state.experience, index)"), "itinerary should include real local listings");

const start = html.indexOf("const YATRA_OPTIONS");
const end = html.indexOf("function findYatraListing", start);
assert(start >= 0 && end > start, "planner route helpers should be present");

const context = {};
vm.createContext(context);
vm.runInContext(`${html.slice(start, end)}\nthis.yatraApi = { buildYatraRoute, getYatraTravelTime, getYatraBudgetSummary, getYatraDayCount };`, context);

const buddhistDayTrip = context.yatraApi.buildYatraRoute({
  days: "1",
  budget: "2000-5000",
  experience: "buddhist",
  start: "patna"
});
assert.deepStrictEqual([...buddhistDayTrip], ["bodh-gaya"], "Buddhist day trip from Patna should prioritize Bodh Gaya");

const jamuiMix = context.yatraApi.buildYatraRoute({
  days: "3",
  budget: "5000-10000",
  experience: "mix",
  start: "jamui"
});
assert.strictEqual(jamuiMix.length, 3, "three-day selection should produce three itinerary days");
assert.strictEqual(jamuiMix[0], "jamui", "a Jamui-start mix should begin locally");
assert.strictEqual(new Set(jamuiMix).size, 3, "itinerary destinations should not repeat");

const extended = context.yatraApi.buildYatraRoute({
  days: "4plus",
  budget: "flexible",
  experience: "history",
  start: "bodh-gaya"
});
assert.strictEqual(context.yatraApi.getYatraDayCount("4plus"), 4, "4+ should generate a four-day core route");
assert.strictEqual(extended.length, 4, "4+ route should contain four core itinerary days");
assert.strictEqual(extended[0], "bodh-gaya", "Bodh Gaya start should avoid unnecessary backtracking");

assert.strictEqual(
  context.yatraApi.getYatraTravelTime("other", "nalanda"),
  "reach Patna hub, then about 2 hr",
  "other origins should receive a practical Patna connection"
);

const budget = context.yatraApi.getYatraBudgetSummary({ days: "3", budget: "under-2000" });
assert.strictEqual(budget.range, "₹3,900–₹5,700", "budget should scale to the selected duration");
assert(budget.note.includes("per-person"), "budget should state its planning basis");

console.log("Shartak Bihar Yatra planner checks passed.");
