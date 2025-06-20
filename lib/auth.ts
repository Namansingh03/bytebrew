import NextAuth from "next-auth";
import prisma from "./db";
import authConfig from "@/auth.config";

export const {handlers , auth , signIn , signOut } = NextAuth({
  ...authConfig,
    callbacks: {
      async jwt({token}){
        return token
      },
    },
    session : { strategy : "jwt" },
    pages: {
        signIn : "/auth/sign-in"
    }
})