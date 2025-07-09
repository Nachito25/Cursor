"use client";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Sidebar from "../Sidebar";
import Toast from "../Toast";
import Dashboard from "../Dashboard";
import useApiKeys from "../hooks/useApiKeys";

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

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastColor, setToastColor] = useState("green");

  const {
    apiKeys,
    loading,
    createApiKey,
    updateApiKey,
    deleteApiKey,
    refreshApiKeys,
  } = useApiKeys();

  return (
    <div className="flex min-h-screen bg-[#f8fafd] relative">
      {/* Sidebar Toggle Button (always visible) */}
      <button
        className="fixed top-4 left-4 z-50 bg-white border rounded-lg shadow p-2 flex items-center justify-center"
        onClick={() => setSidebarOpen((open) => !open)}
      >
        <span className="sr-only">Toggle sidebar</span>
        {sidebarOpen ? (
          // Left arrow icon
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        ) : (
          // Hamburger icon
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        )}
      </button>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} sidebarLinks={sidebarLinks} />
      <Toast show={showToast} message={toastMsg} color={toastColor} onClose={() => setShowToast(false)} />
      <main className="flex-1 p-10">
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