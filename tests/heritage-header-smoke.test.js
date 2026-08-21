const assert = require("assert");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const logo = fs.readFileSync(path.join(root, "assets", "ghoomobihar-mark.svg"), "utf8");
const backdrop = fs.readFileSync(path.join(root, "assets", "bihar-heritage-listing-bg.webp"));

assert.match(html, /assets\/ghoomobihar-mark\.svg/, "Header must use the Bihar heritage emblem");
assert.match(html, /Heritage · People · Journeys/, "Brand lockup must include its positioning line");
assert.match(logo, /historic Bihar arch and the flowing Ganga/, "Logo must explain its Bihar-specific meaning");

assert.match(html, /id="account-menu-trigger"[^>]+aria-expanded="false"/, "Three-dot trigger must expose menu state");
assert.match(html, /id="account-menu-panel"[^>]+role="menu"/, "Account options must use an accessible menu");
assert.match(html, /function toggleAccountMenu\(event\)/, "Account menu toggle must be implemented");
assert.match(html, /function closeAccountMenu\(\)/, "Account menu close behavior must be implemented");
assert.match(html, /document\.getElementById\("header-auth-menu-content"\)/, "Dynamic auth actions must stay inside the menu");

assert.match(html, /url\('assets\/bihar-heritage-listing-bg\.webp'\)/, "Destination listings must use the heritage backdrop");
assert.strictEqual(backdrop.subarray(0, 4).toString("ascii"), "RIFF", "Backdrop must be an optimized WebP asset");
assert.strictEqual(backdrop.subarray(8, 12).toString("ascii"), "WEBP", "Backdrop must be a valid WebP asset");

const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
assert.deepStrictEqual([...new Set(duplicates)], [], `Duplicate HTML IDs found: ${duplicates.join(", ")}`);

console.log("Heritage branding and account-menu smoke checks passed.");
