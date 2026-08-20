# Secure admin setup

The previous build exposed a hardcoded admin phone in the page source and trusted a browser `localStorage` flag. The admin portal now uses Supabase email/password authentication and accepts only users whose server-controlled `app_metadata.role` equals `admin`.

## One-time Supabase steps

1. Open Supabase Dashboard → **Authentication → Users**.
2. Create an admin user with an email and a strong, unique password, or select an existing confirmed user.
3. Open **SQL Editor** and run `SUPABASE-ADMIN-SETUP.sql` after replacing `REPLACE_WITH_ADMIN_EMAIL`.
4. Sign out of the website and sign back in through **Admin Mode**.

Do not place the real password in source code, GitHub, Vercel environment variables, screenshots or documentation.

## Security boundary

This prototype stores listings and inquiries in each browser's `localStorage`, so admin changes affect only that browser. Before using a shared production database, move these records to Supabase tables and protect every write with Row Level Security policies that check the authenticated admin role.
