import { supabase } from "../lib/supabaseClient";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { apiKey } = req.body;
    const { data, error } = await supabase
      .from("api_keys")
      .select("id")
      .eq("value", apiKey)
      .single();
    if (data && !error) {
      return res.status(200).json({ valid: true });
    } else {
      return res.status(200).json({ valid: false });
    }
  }
  return res.status(405).json({ error: "Method not allowed" });
} 