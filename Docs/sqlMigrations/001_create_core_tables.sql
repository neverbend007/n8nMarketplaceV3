-- 001_create_core_tables.sql
-- Core schema for Marketplace MVP
-- This migration creates: users, categories, items, orders tables
-- It assumes you are running inside a Supabase project with the `auth` schema.

-- Enable UUID extension (if not already)
create extension if not exists "uuid-ossp";

-- USERS -----------------------------------------------------------
-- Extension of auth.users for profile & role management
create table if not exists public.users (
    id          uuid primary key references auth.users (id) on delete cascade,
    email       text unique,
    full_name   text,
    avatar_url  text,
    role        text not null check (role in ('user', 'creator', 'admin')) default 'user',
    created_at  timestamp with time zone default timezone('utc', now()),
    updated_at  timestamp with time zone default timezone('utc', now())
);

-- CATEGORIES ------------------------------------------------------
create table if not exists public.categories (
    id          uuid primary key default uuid_generate_v4(),
    name        text not null,
    slug        text unique not null,
    description text,
    parent_id   uuid references public.categories (id) on delete set null,
    created_at  timestamp with time zone default timezone('utc', now())
);

-- ITEMS -----------------------------------------------------------
create table if not exists public.items (
    id          uuid primary key default uuid_generate_v4(),
    creator_id  uuid references public.users (id) on delete cascade,
    title       text not null,
    description text,
    price       numeric(10, 2) not null check (price >= 0),
    category_id uuid references public.categories (id) on delete set null,
    status      text not null check (status in ('draft', 'published', 'archived')) default 'draft',
    created_at  timestamp with time zone default timezone('utc', now()),
    updated_at  timestamp with time zone default timezone('utc', now())
);

-- ORDERS ----------------------------------------------------------
create table if not exists public.orders (
    id         uuid primary key default uuid_generate_v4(),
    user_id    uuid references public.users (id) on delete cascade,
    item_id    uuid references public.items (id) on delete cascade,
    status     text not null check (status in ('pending', 'completed', 'cancelled')) default 'pending',
    amount     numeric(10, 2) not null check (amount >= 0),
    created_at timestamp with time zone default timezone('utc', now()),
    updated_at timestamp with time zone default timezone('utc', now())
);

-- INDEXES ---------------------------------------------------------
create index if not exists categories_slug_idx on public.categories (slug);
create index if not exists items_status_idx on public.items (status);
create index if not exists orders_status_idx on public.orders (status);

-- END ------------------------------------------------------------- 