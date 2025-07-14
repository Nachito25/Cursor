import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

console.log("SUPABASE_SERVICE_ROLE_KEY:", process.env.SUPABASE_SERVICE_ROLE_KEY);
console.log("NEXT_PUBLIC_SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);

import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!supabaseAdmin) {
        throw new Error("supabaseAdmin is not initialized. Check SUPABASE_SERVICE_ROLE_KEY.");
      }
      try {
        console.log("Intentando login para:", user.email);

        // Verifica si el usuario ya existe
        const { data, error } = await supabaseAdmin
          .from('users')
          .select('id')
          .eq('email', user.email)
          .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
          console.error("Error buscando usuario:", error);
          return false;
        }

        if (!data) {
          // Si no existe, lo insertas
          const { error: insertError } = await supabaseAdmin.from('users').insert([
            {
              email: user.email,
              name: user.name,
              image: user.image,
            },
          ]);
          if (insertError) {
            console.error("Error insertando usuario:", insertError);
            return false;
          }
          console.log("Usuario insertado correctamente:", user.email);
        } else {
          console.log("Usuario ya existe:", user.email);
        }
        return true;
      } catch (e) {
        console.error("Error inesperado en signIn callback:", e);
        return false;
      }
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 