import Credentials from "next-auth/providers/credentials";
// github
import Github from "next-auth/providers/github";
// google
import Google from "next-auth/providers/google";
import { LoginSchema } from "./schemas/Index";
import bcrypt from "bcryptjs";

import type { NextAuthConfig } from "next-auth";
import { getUserByEmail } from "./data/user";
// triggers the adapter - middlware
export default {
  providers: [
    Github({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Credentials({
      // need to compare the hashed passwrod for a successful login
      async authorize(credentials) {
        // validating fields
        const validateFields = LoginSchema.safeParse(credentials);
        if (validateFields.success) {
          const { email, password } = validateFields.data;

          // check if user exists
          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          // comparing the user and the hasedh psswd
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) return null;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
