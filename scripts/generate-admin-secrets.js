#!/usr/bin/env node

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const credentialsPath = process.argv[2];
const environmentPath = process.argv[3];

if (!credentialsPath || !environmentPath) {
  console.error("Usage: node scripts/generate-admin-secrets.js <credentials-file> <environment-file>");
  process.exit(1);
}

const userId = `edgeforge-admin-${crypto.randomBytes(4).toString("hex")}`;
const password = crypto.randomBytes(24).toString("base64url");
const passwordSalt = crypto.randomBytes(16);
const environment = {
  ADMIN_USER_ID_HASH: crypto.createHash("sha256").update(userId, "utf8").digest("hex"),
  ADMIN_PASSWORD_SALT: passwordSalt.toString("base64url"),
  ADMIN_PASSWORD_HASH: crypto.scryptSync(password, passwordSalt, 64).toString("base64url"),
  ADMIN_SESSION_SECRET: crypto.randomBytes(48).toString("base64url"),
  ADMIN_ALLOWED_ORIGINS: "https://ghoomobihar.netlify.app"
};

const credentials = [
  "GhoomoBihar private admin credentials",
  "====================================",
  "",
  `User ID: ${userId}`,
  `Password: ${password}`,
  "",
  "Store these values in a password manager. Do not commit or share this file.",
  "The website does not save either value in localStorage or browser-readable cookies.",
  ""
].join("\n");

const environmentFile = Object.entries(environment)
  .map(([key, value]) => `${key}=${value}`)
  .join("\n") + "\n";

fs.mkdirSync(path.dirname(credentialsPath), { recursive: true });
fs.mkdirSync(path.dirname(environmentPath), { recursive: true });
fs.writeFileSync(credentialsPath, credentials, { mode: 0o600, flag: "wx" });
fs.writeFileSync(environmentPath, environmentFile, { mode: 0o600, flag: "wx" });

console.log("Admin credentials and Netlify environment import were generated without printing secret values.");
