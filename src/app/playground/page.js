"use client";
import { useState } from "react";
import Toast from "../Toast";
import { useRouter } from "next/navigation";
import { Sidebar } from "../Sidebar";

const sidebarLinks = [
  { name: "Overview", icon: "🏠", href: "/" },
  { name: "API Playground", icon: "< />" },
  { name: "Use Cases", icon: "💡" },
  { name: "Billing", icon: "💳" },
  { name: "Settings", icon: "⚙️" },
  { name: "Documentation", icon: "📄", external: true, href: "#" },
  { name: "Tavily MCP", icon: "🌐", external: true, href: "#" },
];

export default function Playground() {
  const [apiKey, setApiKey] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastColor, setToastColor] = useState("green");
  const [summaryResult, setSummaryResult] = useState(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/validate-key", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apiKey }),
    });
    const data = await res.json();
    if (res.status === 200) {
      setToastMsg(data.message);
      setToastColor("green");
    } else {
      setToastMsg(data.message);
      setToastColor("red");
    }
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  async function handleSummarize(e) {
    e.preventDefault();
    setIsSummarizing(true);
    setSummaryResult(null);
    try {
      const res = await fetch("/api/github-summarizer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify({ githubUrl }),
      });
      const data = await res.json();
      setSummaryResult(data);
      if (res.status === 200) {
        setToastMsg("Summarization successful");
        setToastColor("green");
      } else {
        setToastMsg(data.message || "Error");
        setToastColor("red");
      }
    } catch (err) {
      setToastMsg("Request failed");
      setToastColor("red");
    }
    setShowToast(true);
    setIsSummarizing(false);
    setTimeout(() => setShowToast(false), 2000);
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
      <main className="flex-1 flex flex-col items-center justify-center">
        <Toast show={showToast} message={toastMsg} color={toastColor} onClose={() => setShowToast(false)} />
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow max-w-md w-full flex flex-col gap-4 mb-6 mt-8">
          <h1 className="text-2xl font-bold mb-2">API Playground</h1>
          <label className="text-sm font-medium">API Key</label>
          <input
            className="border px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            placeholder="Enter your API key"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded font-semibold hover:bg-blue-600 mt-2"
          >
            Submit
          </button>
        </form>
        <form onSubmit={handleSummarize} className="bg-white p-8 rounded-xl shadow max-w-md w-full flex flex-col gap-4">
          <label className="text-sm font-medium">GitHub URL</label>
          <input
            className="border px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="url"
            value={githubUrl}
            onChange={e => setGithubUrl(e.target.value)}
            placeholder="Enter a GitHub repository or file URL"
            required
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded font-semibold hover:bg-green-600 mt-2 disabled:opacity-50"
            disabled={!apiKey || !githubUrl || isSummarizing}
          >
            {isSummarizing ? "Summarizing..." : "Summarize"}
          </button>
        </form>
        {summaryResult && (
          <div className="bg-gray-100 rounded p-4 mt-6 max-w-md w-full break-words">
            <h2 className="font-semibold mb-2">Summary Result</h2>
            <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(summaryResult, null, 2)}</pre>
          </div>
        )}
      </main>
    </div>
  );
} 