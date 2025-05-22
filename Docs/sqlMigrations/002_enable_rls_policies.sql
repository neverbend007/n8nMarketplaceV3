-- 002_enable_rls_policies.sql
-- Enable Row Level Security and define basic policies
-- NOTE: Adjust policies as business rules evolve.

-- USERS -----------------------------------------------------------------
alter table public.users enable row level security;

-- Everyone can read user profiles
create policy "users_select_all" on public.users
  for select using (true);

-- Users can update their own profile
create policy "users_update_own" on public.users
  for update using (auth.uid() = id);

-- CATEGORIES ------------------------------------------------------------
alter table public.categories enable row level security;

-- Everyone can read categories
create policy "categories_select_all" on public.categories
  for select using (true);

-- Only admins can modify categories
create policy "categories_admin_modify" on public.categories
  for all using (
    exists (
      select 1 from public.users u where u.id = auth.uid() and u.role = 'admin'
    )
  ) with check (
    exists (
      select 1 from public.users u where u.id = auth.uid() and u.role = 'admin'
    )
  );

-- ITEMS -----------------------------------------------------------------
alter table public.items enable row level security;

-- Anyone can view published items; creators can view their own drafts
create policy "items_select" on public.items
  for select using (
    status = 'published' or creator_id = auth.uid()
  );

-- Creators or admins can insert items
create policy "items_insert_creator" on public.items
  for insert with check (
    exists (
      select 1 from public.users u where u.id = auth.uid() and u.role in ('creator', 'admin')
    )
  );

-- Creators can update their own items; admins any
create policy "items_update_owner_or_admin" on public.items
  for update using (
    creator_id = auth.uid() or (
      exists (
        select 1 from public.users u where u.id = auth.uid() and u.role = 'admin'
      )
    )
  );

-- ORDERS ----------------------------------------------------------------
alter table public.orders enable row level security;

-- Users can view their own orders; creators can view orders on their items; admins all
create policy "orders_select" on public.orders
  for select using (
    user_id = auth.uid() or (
      exists (
        select 1 from public.items i
        where i.id = orders.item_id and i.creator_id = auth.uid()
      )
    ) or (
      exists (
        select 1 from public.users u where u.id = auth.uid() and u.role = 'admin'
      )
    )
  );

-- Only edge function (service_role) inserts orders so no insert policy needed for client.

-- END ------------------------------------------------------------------- 