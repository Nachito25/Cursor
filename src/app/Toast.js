import React from "react";

export default function Toast({ show, message, color = "green", onClose }) {
  if (!show) return null;
  return (
    <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 ${color === "red" ? "bg-red-700" : "bg-green-700"} text-white px-6 py-3 rounded-xl shadow flex items-center gap-3 min-w-[280px] max-w-[90vw]`}>
      <span className="text-2xl">✔️</span>
      <span className="font-medium flex-1">{message}</span>
      <button className="ml-2 text-lg font-bold" onClick={onClose}>&times;</button>
    </div>
  );
} 