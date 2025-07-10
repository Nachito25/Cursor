"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function SignInButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-2">
        {session.user?.image && (
          <Image
            src={session.user.image}
            alt={session.user.name || "Foto de perfil"}
            width={32}
            height={32}
            className="rounded-full"
          />
        )}
        <span>Bienvenido, {session.user?.name}</span>
        <button onClick={() => signOut()}>Cerrar sesión</button>
      </div>
    );
  }
  return (
    <button onClick={() => signIn("google")}>Iniciar sesión con Google</button>
  );
} 