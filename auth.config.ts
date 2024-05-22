import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import db from "@/lib/db";

export default {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  events: {
    async linkAccount({ user }) {
      await db?.user?.update({
        where: {
          id: user?.id,
        },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },

  callbacks: {
    async jwt({ token }) {
      return token;
    },

    async session({ token, session }) {
      if (token.sub) {
        session.user.id = token.sub as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
