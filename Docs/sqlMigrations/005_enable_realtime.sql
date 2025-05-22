-- 005_enable_realtime.sql
-- Enable realtime broadcasts for items and orders tables

alter publication supabase_realtime add table public.items;
alter publication supabase_realtime add table public.orders;

-- END ------------------------------------------------------------- 