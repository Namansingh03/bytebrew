"use server";

import * as z from "zod";
import { signUpSchema } from "@/schemas/authenticationSchema";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";

export async function register(values: z.infer<typeof signUpSchema>) {
  try {

    console.log("in the register")
    
    const validate = signUpSchema.safeParse(values);

    console.log(validate.error);

    if (!validate.success) {
      return { error: "Invalid Fields" };
    }

    const { email, password } = validate.data;

    console.log(email, password);

    const existingUser = await prisma.user.findUnique({ where: { email } });

    console.log("user exists : ", existingUser);

    if (existingUser) {
      return { error: "User already exists" };
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashPassword,
        emailVerified: false,
      },
    });

    console.log("user : ", user);

    return { success: true };
  } catch (error: any) {
    console.error("Register error:", error);
    return { error: "Something went wrong. Please try again." };
  }
}
