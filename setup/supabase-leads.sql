-- sua · Tabla de leads en Supabase
-- Dónde pegarlo: Supabase → tu proyecto → SQL Editor → New query → pegar → Run.
create table if not exists public.leads (
  id bigint generated always as identity primary key,
  name text not null check (char_length(name) between 1 and 200),
  email text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  company text, country text, spend text,
  message text check (char_length(message) < 2000),
  lang text, source text, created_at text,
  inserted_at timestamptz default now()
);
alter table public.leads enable row level security;
-- La web solo puede INSERTAR. Nadie puede leer desde internet; tú ves los datos en el panel.
drop policy if exists "web puede insertar leads" on public.leads;
create policy "web puede insertar leads" on public.leads for insert to anon with check (true);
