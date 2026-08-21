# Secure admin setup

Admin authentication is independent of Supabase. The browser sends the entered user ID and password over HTTPS to `netlify/functions/admin-auth.js`. That function verifies salted hashes stored in Netlify environment variables and returns a signed four-hour session cookie with `HttpOnly`, `Secure` and `SameSite=Strict` flags.

The real user ID, password, hashes and session signing key must never be committed to GitHub or placed in frontend JavaScript.

## Required Netlify environment variables

| Variable | Purpose |
| --- | --- |
| `ADMIN_USER_ID_HASH` | SHA-256 hash of the admin user ID |
| `ADMIN_PASSWORD_SALT` | Random salt used by scrypt |
| `ADMIN_PASSWORD_HASH` | 64-byte scrypt output |
| `ADMIN_SESSION_SECRET` | Random key used to sign session cookies |
| `ADMIN_ALLOWED_ORIGINS` | Comma-separated trusted origins; normally `https://ghoomobihar.netlify.app` |

Generate these values using a local secret-generation tool. Store the plain user ID and password only in a password manager. After setting the variables under **Netlify → Site configuration → Environment variables**, redeploy the site.

## What the browser can and cannot see

- The source contains only generic placeholders: `Enter your user ID` and `Enter password`.
- The application never stores the submitted user ID or password in `localStorage`, `sessionStorage`, IndexedDB or a JavaScript-readable cookie.
- The session cookie is signed and `HttpOnly`, so frontend JavaScript cannot read it.
- Netlify environment variables and stored hashes are not returned to the browser.
- A person controlling their own device can inspect values they personally type or view their own HTTPS request in Developer Tools. No website can prevent the device owner from inspecting their own browser. The security goal is to avoid publishing or persistently storing credentials client-side.

## Security boundary

This hackathon prototype still stores listings and inquiries in each browser's `localStorage`, so moderation changes affect only that browser. Production must move these records to a shared database, authorize every write on the server, add rate limiting and keep an audit log. Supabase remains in this repository for vendor authentication and tourism feedback only.
