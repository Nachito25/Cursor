import GoogleProvider from "next-auth/providers/google";
import { supabaseAdmin } from '../../../lib/supabaseAdmin';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!supabaseAdmin) {
        throw new Error("supabaseAdmin is not initialized. Check SUPABASE_SERVICE_ROLE_KEY.");
      }
      try {
        // Verifica si el usuario ya existe
        const { data, error } = await supabaseAdmin
          .from('users')
          .select('id')
          .eq('email', user.email)
          .single();

        if (error && error.code !== 'PGRST116') {
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
        }
        return true;
      } catch (e) {
        console.error("Error inesperado en signIn callback:", e);
        return false;
      }
    },
  },
}; 