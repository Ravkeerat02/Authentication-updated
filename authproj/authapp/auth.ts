import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import authConfig from "./auth.config";
import { getUserById } from "./data/user";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    // redirect when something goes wrong
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        // check when the email was verified
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    // SIGN IN
    async signIn({ user, account }) {
      // allow Oauth WITHOUT VERIFICATION
      if (account?.provider !== "credentials") return true;
      // existing user
      const existingUser = await getUserById(user.id);
      if (!existingUser?.emailVerified) return false;

      // add 2fa check

      return true;
    },

    // SESSION
    async session({ token, session }) {
      console.log("session", session);
      if (token.role && session.user) {
        session.user.role = token.role as "ADMIN" | "USER";
      }
      return session;
    },
    // JWT
    async jwt({ token }) {
      // logged out
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      token.role = existingUser.role;
      return token;
    },
  },
  adapter: PrismaAdapter(db), // Move adapter property inside the NextAuth configuration object
  session: { strategy: "jwt" },
  ...authConfig,
});
