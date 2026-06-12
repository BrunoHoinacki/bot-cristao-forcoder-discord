create table if not exists public.guild_configs (
  guild_id text primary key,
  channel_id text not null,
  guild_name text,
  channel_name text,
  is_primary boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists guild_configs_active_idx
  on public.guild_configs (is_active);

create index if not exists guild_configs_primary_idx
  on public.guild_configs (is_primary)
  where is_primary = true;

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_guild_configs_updated_at on public.guild_configs;

create trigger set_guild_configs_updated_at
before update on public.guild_configs
for each row
execute function public.set_updated_at();

alter table public.guild_configs disable row level security;
