-- 003_create_storage_buckets.sql
-- Create public storage buckets for avatars and item images

-- AVATARS bucket (public)
insert into storage.buckets (id, name, public)
  values ('avatars', 'avatars', true)
  on conflict (id) do nothing;

-- ITEM IMAGES bucket (public)
insert into storage.buckets (id, name, public)
  values ('item-images', 'item-images', true)
  on conflict (id) do nothing;

-- Grant anon and authenticated read access (if not automatic)
-- Supabase sets public buckets to allow read via anon key automatically.

-- END ------------------------------------------------------------- 