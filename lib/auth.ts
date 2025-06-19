import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import Credentails from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import prisma from "./db";
import authConfig from "@/auth.config";

export const {handlers , auth , signIn , signOut } = NextAuth({
    callbacks: {
      
    },
    adapter : PrismaAdapter(prisma),
    session : { strategy : "jwt" },
    ...authConfig,
    pages: {
        signIn : "/auth/sign-in"
    }
})