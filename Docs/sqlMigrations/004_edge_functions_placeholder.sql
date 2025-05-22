-- 004_edge_functions_placeholder.sql
-- Edge functions are deployed via Supabase CLI and not through SQL migrations.
-- This file exists solely to maintain sequential numbering alignment.
-- Implement the following edge functions in the `supabase/functions` directory:
--   1. checkout  - validates purchase & inserts order
--   2. admin-metrics - returns aggregated metrics for admin dashboard
--
-- To scaffold these functions:
--   supabase functions new checkout
--   supabase functions new admin-metrics

-- No-op SQL statement to keep migration valid
select 1 as edge_functions_placeholder;

-- END ------------------------------------------------------------- 