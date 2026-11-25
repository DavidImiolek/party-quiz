-- Players table: someone who joined via the PWA link
create table players (
  id uuid primary key default gen_random_uuid(),
  username text not null check (char_length(username) between 2 and 20),
  created_at timestamptz not null default now()
);

-- Anyone can insert themselves (no auth required)
alter table players enable row level security;
create policy "anyone can insert" on players for insert with check (true);
create policy "anyone can read" on players for select using (true);
