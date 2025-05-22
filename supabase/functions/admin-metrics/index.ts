// @ts-nocheck
// Deno Edge Function for admin metrics

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

Deno.serve(async (req: Request) => {
  if (req.method !== "GET") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const authHeader = req.headers.get("authorization") ?? "";
  const accessToken = authHeader.replace("Bearer", "").trim();
  if (!accessToken) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { data: authData, error: authError } = await supabaseAdmin.auth.getUser(accessToken);
  if (authError || !authData?.user) {
    return new Response("Unauthorized", { status: 401 });
  }
  const userId = authData.user.id;

  const { data: profile, error: profileError } = await supabaseAdmin
    .from("users")
    .select("role")
    .eq("id", userId)
    .single();
  if (profileError || !profile || profile.role !== "admin") {
    return new Response("Forbidden", { status: 403 });
  }

  const [usersAgg, itemsAgg, ordersAgg] = await Promise.all([
    supabaseAdmin.from("users").select("id", { head: true, count: "exact" }),
    supabaseAdmin.from("items").select("id", { head: true, count: "exact" }),
    supabaseAdmin.from("orders").select("id, amount", { count: "exact" }),
  ]);

  const { data: revenueRows } = await supabaseAdmin
    .from("orders")
    .select("amount")
    .neq("status", "cancelled");

  const totalRevenue = (revenueRows ?? []).reduce(
    (sum: number, row: any) => sum + Number(row.amount),
    0,
  );

  const result = {
    users: usersAgg.count ?? 0,
    items: itemsAgg.count ?? 0,
    orders: ordersAgg.count ?? 0,
    revenue: totalRevenue,
  };

  return new Response(JSON.stringify(result), {
    headers: { "Content-Type": "application/json" },
  });
}); 