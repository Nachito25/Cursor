"use client";
import { useSession, signIn } from "next-auth/react";
import { useEffect, useState, useCallback } from "react";
// import { supabase } from "../../lib/supabaseClient"; // Remove direct supabase usage
import { Sidebar } from "../Sidebar";
import Toast from "../Toast";
import Dashboard from "../Dashboard";
// import useApiKeys from "../hooks/useApiKeys"; // Remove custom hook
import SignOutButton from "../SignOutButton";

const sidebarLinks = [
  { name: "Overview", icon: "🏠" },
  { name: "API Playground", icon: "< />" },
  { name: "Use Cases", icon: "💡" },
  { name: "Billing", icon: "💳" },
  { name: "Settings", icon: "⚙️" },
  { name: "Documentation", icon: "📄", external: true, href: "#" },
  { name: "Tavily MCP", icon: "🌐", external: true, href: "#" },
];

const KEY_TYPES = [
  { label: "Development", value: "dev", info: "Rate limited to 100 requests/minute", enabled: true },
  { label: "Production", value: "prod", info: "Rate limited to 1,000 requests/minute", enabled: false },
];

export default function DashboardsPage(props) {
  const { data: session, status } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastColor, setToastColor] = useState("green");
  const [apiKeys, setApiKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all API keys for the user
  const fetchApiKeys = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/api-keys");
    if (res.ok) {
      const data = await res.json();
      setApiKeys(data);
    }
    setLoading(false);
  }, []);

  // Create a new API key
  const createApiKey = async ({ name, value }) => {
    setLoading(true);
    const res = await fetch("/api/api-keys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, value }),
    });
    if (res.ok) {
      const data = await res.json();
      setApiKeys((prev) => [...prev, data]);
      setLoading(false);
      return { success: true };
    }
    setLoading(false);
    return { success: false };
  };

  // Update an API key
  const updateApiKey = async (id, { name }) => {
    setLoading(true);
    const res = await fetch(`/api/api-keys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    if (res.ok) {
      const data = await res.json();
      setApiKeys((prev) => prev.map((k) => (k.id === id ? { ...k, name: data.name } : k)));
      setLoading(false);
      return { success: true };
    }
    setLoading(false);
    return { success: false };
  };

  // Delete an API key
  const deleteApiKey = async (id) => {
    setLoading(true);
    const res = await fetch(`/api/api-keys/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setApiKeys((prev) => prev.filter((k) => k.id !== id));
      setLoading(false);
      return { success: true };
    }
    setLoading(false);
    return { success: false };
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn("google");
    } else if (status === "authenticated") {
      fetchApiKeys();
    }
  }, [status, fetchApiKeys]);

  if (status === "loading") {
    return <div>Cargando...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-[#f8fafd] relative">
      {/* Sidebar Toggle Button (always visible) */}
      <button
        className="fixed top-4 left-4 z-50 bg-white border rounded-lg shadow p-2 flex items-center justify-center"
        onClick={() => setSidebarOpen((open) => !open)}
      >
        <span className="sr-only">Toggle sidebar</span>
        {sidebarOpen ? (
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        ) : (
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        )}
      </button>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} sidebarLinks={sidebarLinks} />
      <Toast show={showToast} message={toastMsg} color={toastColor} onClose={() => setShowToast(false)} />
      <main className="flex-1 p-10">
        <div className="mb-4 flex justify-end">
          <SignOutButton />
        </div>
        <Dashboard
          apiKeys={apiKeys}
          loading={loading}
          createApiKey={createApiKey}
          updateApiKey={updateApiKey}
          deleteApiKey={deleteApiKey}
          showModal={showModal}
          setShowModal={setShowModal}
          showToast={showToast}
          setShowToast={setShowToast}
          setToastMsg={setToastMsg}
          setToastColor={setToastColor}
        />
      </main>
    </div>
  );
} 