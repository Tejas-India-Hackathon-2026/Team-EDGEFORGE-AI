-- Run this in Supabase Dashboard > SQL Editor after creating and confirming
-- the admin user in Authentication > Users. Replace the email before running.
-- Never put the real admin password in GitHub, SQL, JavaScript or Vercel variables.

update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb)
  || '{"role":"admin"}'::jsonb
where lower(email) = lower('REPLACE_WITH_ADMIN_EMAIL');

-- Confirm that exactly one intended user has the admin role.
select id, email, raw_app_meta_data ->> 'role' as role
from auth.users
where raw_app_meta_data ->> 'role' = 'admin';
