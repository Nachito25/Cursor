"use client";
import { useState } from "react";
import Toast from "../Toast";
import { useRouter } from "next/navigation";

export default function Playground() {
  const [apiKey, setApiKey] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastColor, setToastColor] = useState("green");
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f8fafd]">
      <Toast show={showToast} message={toastMsg} color={toastColor} onClose={() => setShowToast(false)} />
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow max-w-md w-full flex flex-col gap-4">
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
    </div>
  );
} 