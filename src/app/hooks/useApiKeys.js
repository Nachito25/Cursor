import { useState, useEffect, useCallback } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function useApiKeys() {
  const [apiKeys, setApiKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchApiKeys = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("api_keys")
      .select("id, name, value, usage")
      .order("id", { ascending: true });
    if (!error) setApiKeys(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchApiKeys();
  }, [fetchApiKeys]);

  const createApiKey = async ({ name, value }) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("api_keys")
      .insert({ name, value, usage: 0 })
      .select();
    if (!error && data && data.length > 0) {
      setApiKeys((prev) => [...prev, data[0]]);
      setLoading(false);
      return { success: true };
    }
    setLoading(false);
    return { success: false, error };
  };

  const updateApiKey = async (id, { name }) => {
    setLoading(true);
    const { error } = await supabase
      .from("api_keys")
      .update({ name })
      .eq("id", id);
    if (!error) {
      setApiKeys((prev) => prev.map((k) => (k.id === id ? { ...k, name } : k)));
      setLoading(false);
      return { success: true };
    }
    setLoading(false);
    return { success: false, error };
  };

  const deleteApiKey = async (id) => {
    setLoading(true);
    const { error } = await supabase.from("api_keys").delete().eq("id", id);
    if (!error) {
      setApiKeys((prev) => prev.filter((k) => k.id !== id));
      setLoading(false);
      return { success: true };
    }
    setLoading(false);
    return { success: false, error };
  };

  return {
    apiKeys,
    loading,
    createApiKey,
    updateApiKey,
    deleteApiKey,
    refreshApiKeys: fetchApiKeys,
  };
} 