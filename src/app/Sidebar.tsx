"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";

interface SidebarLink {
  name: string;
  href?: string;
  icon?: React.ReactNode;
  external?: boolean;
}

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  sidebarLinks: SidebarLink[];
}

export function Sidebar({ sidebarOpen, setSidebarOpen, sidebarLinks }: SidebarProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-screen z-40 bg-white border-r flex flex-col justify-between pt-14 px-4 gap-4 shadow-sm transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          w-64 md:w-64
        `}
      >
        <div className="pb-4">
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
        </div>
        <div className="flex flex-col gap-2 pb-4">
          <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg min-h-[56px]">
            {user ? (
              <>
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || user.email || "User"}
                    className="w-10 h-10 rounded-full object-cover border"
                    width={40}
                    height={40}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%233b82f6'/%3E%3Ctext x='50%25' y='55%25' text-anchor='middle' fill='white' font-size='20' font-family='Arial' dy='.3em'%3F%3E?%3C/text%3E%3C/svg%3E";
                    }}
                    priority={false}
                  />
                ) : (
                  <span className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                    {user.name ? user.name[0] : "U"}
                  </span>
                )}
                <div className="flex flex-col ml-2 overflow-hidden">
                  <span className="text-sm font-medium truncate">{user.name || "Usuario"}</span>
                  <span className="text-xs text-gray-600 truncate">{user.email}</span>
                </div>
              </>
            ) : (
              <>
                <span className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">?</span>
                <span className="text-xs font-medium ml-2">No logueado</span>
              </>
            )}
          </div>
          {user && (
            <button
              className="mt-2 w-full px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-colors text-sm"
              onClick={() => signOut()}
            >
              Cerrar sesión
            </button>
          )}
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