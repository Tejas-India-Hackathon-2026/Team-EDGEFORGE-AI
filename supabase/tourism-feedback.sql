-- GhoomoBihar tourism feedback table and Row Level Security policies.
-- Run once in Supabase Dashboard > SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.tourism_feedback (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  tourist_name text,
  visited_district text not null,
  rating smallint not null check (rating between 1 and 5),
  focus_area text not null check (focus_area in ('safety', 'cleanliness', 'guides', 'food', 'transport', 'digital')),
  comments text not null check (char_length(comments) between 20 and 600),
  recommend text not null check (recommend in ('yes', 'maybe', 'no')),
  requested_district text,
  consent_public boolean not null default false,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected'))
);

alter table public.tourism_feedback enable row level security;

drop policy if exists "Anyone can submit tourism feedback" on public.tourism_feedback;
create policy "Anyone can submit tourism feedback"
on public.tourism_feedback
for insert
to anon, authenticated
with check (
  status = 'pending'
  and rating between 1 and 5
  and char_length(comments) between 20 and 600
);

drop policy if exists "Admins can read tourism feedback" on public.tourism_feedback;
create policy "Admins can read tourism feedback"
on public.tourism_feedback
for select
to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admins can update tourism feedback" on public.tourism_feedback;
create policy "Admins can update tourism feedback"
on public.tourism_feedback
for update
to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admins can delete tourism feedback" on public.tourism_feedback;
create policy "Admins can delete tourism feedback"
on public.tourism_feedback
for delete
to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

grant insert on public.tourism_feedback to anon, authenticated;
grant select, update, delete on public.tourism_feedback to authenticated;

create index if not exists tourism_feedback_created_at_idx
  on public.tourism_feedback (created_at desc);

create index if not exists tourism_feedback_requested_district_idx
  on public.tourism_feedback (requested_district)
  where requested_district is not null;

-- Anonymous-safe aggregate used by the public roadmap. It never exposes names,
-- comments, ratings or individual records.
create or replace function public.get_tourism_feedback_signals()
returns table (
  total_feedback bigint,
  top_requested_district text,
  top_request_count bigint
)
language sql
stable
security definer
set search_path = public
as $$
  with totals as (
    select count(*)::bigint as total_feedback
    from public.tourism_feedback
  ), ranked as (
    select requested_district, count(*)::bigint as request_count
    from public.tourism_feedback
    where requested_district is not null and btrim(requested_district) <> ''
    group by requested_district
    order by request_count desc, requested_district asc
    limit 1
  )
  select
    totals.total_feedback,
    ranked.requested_district,
    coalesce(ranked.request_count, 0)::bigint
  from totals
  left join ranked on true;
$$;

revoke all on function public.get_tourism_feedback_signals() from public;
grant execute on function public.get_tourism_feedback_signals() to anon, authenticated;
