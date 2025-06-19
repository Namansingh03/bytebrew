"use server"

import * as z from "zod";
import { signInSchema } from "@/schemas/authenticationSchema";
import { signIn } from "@/lib/auth"; 
import { DEAFAULT_REDIRECT } from "@/constants/route";
import { AuthError } from "next-auth";

export const login = async (values: z.infer<typeof signInSchema>) => {
  const validatedFields = signInSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }
   
  const { email, password } = validatedFields.data;
   
  console.log("email: ", email,  " password: ", password)

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEAFAULT_REDIRECT,
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }

    throw error;
  }
};
