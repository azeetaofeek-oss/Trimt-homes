-- ==========================================
-- TRIMT HOMES DATABASE
-- Supabase PostgreSQL Schema
-- ==========================================

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  phone text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  property_type text not null,
  listing_type text not null check (listing_type in ('sale', 'lease', 'investment')),
  price numeric(15, 2),
  location text not null,
  bedrooms integer default 0,
  bathrooms integer default 0,
  area_sqm numeric(10, 2),
  image_url text,
  status text not null default 'available' check (status in ('available', 'sold', 'leased', 'draft')),
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references auth.users(id) on delete set null,
  full_name text not null,
  email text not null,
  phone text,
  interest text not null,
  message text not null,
  status text not null default 'new' check (status in ('new', 'reviewing', 'contacted', 'closed')),
  created_at timestamptz not null default now()
);

create table if not exists public.investment_enquiries (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references auth.users(id) on delete set null,
  full_name text not null,
  email text not null,
  phone text,
  investment_interest text not null,
  estimated_budget numeric(15, 2),
  message text,
  status text not null default 'new' check (status in ('new', 'reviewing', 'contacted', 'closed')),
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.profiles where id = (select auth.uid()) and role = 'admin');
$$;

alter table public.profiles enable row level security;
alter table public.properties enable row level security;
alter table public.enquiries enable row level security;
alter table public.investment_enquiries enable row level security;

create policy "Users can view their own profile" on public.profiles for select to authenticated using (id = (select auth.uid()) or (select public.is_admin()));
create policy "Users can create their own customer profile" on public.profiles for insert to authenticated with check (id = (select auth.uid()) and role = 'customer');
create policy "Admins can update profiles" on public.profiles for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

create policy "Public can view available properties" on public.properties for select to anon, authenticated using (status = 'available' or (select public.is_admin()));
create policy "Admins can add properties" on public.properties for insert to authenticated with check ((select public.is_admin()));
create policy "Admins can update properties" on public.properties for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
create policy "Admins can delete properties" on public.properties for delete to authenticated using ((select public.is_admin()));

create policy "Visitors can submit enquiries" on public.enquiries for insert to anon, authenticated with check (customer_id is null or customer_id = (select auth.uid()));
create policy "Admins can view enquiries" on public.enquiries for select to authenticated using ((select public.is_admin()));
create policy "Admins can update enquiries" on public.enquiries for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

create policy "Visitors can submit investment enquiries" on public.investment_enquiries for insert to anon, authenticated with check (customer_id is null or customer_id = (select auth.uid()));
create policy "Admins can view investment enquiries" on public.investment_enquiries for select to authenticated using ((select public.is_admin()));
create policy "Admins can update investment enquiries" on public.investment_enquiries for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

create or replace function public.update_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists update_properties_updated_at on public.properties;
create trigger update_properties_updated_at before update on public.properties for each row execute function public.update_updated_at();

create index if not exists properties_status_idx on public.properties(status);
create index if not exists properties_listing_type_idx on public.properties(listing_type);
create index if not exists enquiries_created_at_idx on public.enquiries(created_at desc);
create index if not exists investment_enquiries_created_at_idx on public.investment_enquiries(created_at desc);
create index if not exists profiles_email_idx on public.profiles(email);
