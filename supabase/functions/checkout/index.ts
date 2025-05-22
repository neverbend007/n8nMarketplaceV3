// @ts-nocheck
// Deno Edge Function for checkout

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") {
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

  let payload: { itemId?: string };
  try {
    payload = await req.json();
  } catch {
    return new Response("Invalid JSON body", { status: 400 });
  }
  const { itemId } = payload;
  if (!itemId) {
    return new Response("itemId is required", { status: 400 });
  }

  const { data: item, error: itemError } = await supabaseAdmin
    .from("items")
    .select("id, price, status")
    .eq("id", itemId)
    .single();
  if (itemError || !item) {
    return new Response("Item not found", { status: 404 });
  }
  if (item.status !== "published") {
    return new Response("Item is not available for purchase", { status: 400 });
  }

  const { data: order, error: orderError } = await supabaseAdmin
    .from("orders")
    .insert({
      user_id: userId,
      item_id: item.id,
      amount: item.price,
      status: "completed",
    })
    .select("id, status, amount, created_at")
    .single();
  if (orderError) {
    console.error(orderError);
    return new Response("Failed to create order", { status: 500 });
  }

  return new Response(JSON.stringify(order), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}); 