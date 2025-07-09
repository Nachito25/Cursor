import { supabase } from "../../lib/supabaseClient";

export async function POST(request) {
  const { apiKey } = await request.json();
  const { data, error } = await supabase
    .from("api_keys")
    .select("id")
    .eq("value", apiKey)
    .single();
  if (data && !error) {
    return Response.json({ valid: true }, { status: 200 });
  } else {
    return Response.json({ valid: false }, { status: 401 });
  }
} 