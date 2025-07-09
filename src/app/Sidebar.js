import React from "react";
import { useRouter } from "next/navigation";

export default function Sidebar({ sidebarOpen, setSidebarOpen, sidebarLinks }) {
  const router = useRouter();
  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full z-40 bg-white border-r flex flex-col pt-14 py-6 px-4 gap-4 shadow-sm transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          w-64 md:w-64
        `}
      >
        <div className="flex items-center gap-2 mb-8">
          <span className="text-2xl font-bold text-blue-600">Nacho AI</span>
          {/* Hide button always visible inside sidebar */}
          <button className="ml-auto text-2xl" onClick={() => setSidebarOpen(false)}>&times;</button>
        </div>
        <nav className="flex-1">
          <ul className="space-y-2">
            {sidebarLinks.map((link) => (
              <li key={link.name}>
                {link.name === "API Playground" ? (
                  <button
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 text-gray-700 font-medium transition-colors w-full text-left"
                    onClick={() => router.push("/playground")}
                  >
                    <span>{link.icon}</span>
                    {link.name}
                  </button>
                ) : (
                  <a
                    href={link.href || "#"}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 text-gray-700 font-medium transition-colors"
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                  >
                    <span>{link.icon}</span>
                    {link.name}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
          <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">IR</span>
          <span className="text-xs font-medium">irivas@devsys.com.uy</span>
        </div>
      </aside>
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
} 