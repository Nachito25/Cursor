"use client";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      style={{
        padding: "8px 16px",
        background: "#e53e3e",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        margin: "8px 0"
      }}
    >
      Cerrar sesión
    </button>
  );
} 