import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./schemas/authenticationSchema";
import prisma from "./lib/db";
import bcrypt from "bcryptjs";

export default {
  providers: [
    Github,
    Google,
    Credentials({
      async authorize(credentials) {
        const validatedFields = signInSchema.safeParse(credentials);
        if (!validatedFields.success) return null;

        const { email, password } = validatedFields.data;
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || !user.password) return null;

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return null;

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
