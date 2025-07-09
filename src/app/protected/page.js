"use server";
import { supabase } from "../lib/supabaseClient";

export default async function ProtectedPage(req, res) {
  if (req.method === "POST") {
    const { apiKey } = await req.json();
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
  // For GET or other methods, just show a message
  return <div className="p-8 text-center">This page is for API key validation only.</div>;
} 