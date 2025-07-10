"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Verifica si el usuario ya existe
      const { data, error } = await supabase
        .from("users")
        .select("id")
        .eq("email", user.email)
        .single();

      if (!data) {
        // Si no existe, lo inserta
        await supabase.from("users").insert([
          {
            email: user.email,
            name: user.name,
            image: user.image,
          },
        ]);
      }
      // Permite el login siempre
      return true;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

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