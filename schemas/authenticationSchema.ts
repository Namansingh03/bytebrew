import { z } from 'zod';

const authSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email format" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
      { message: "Password must contain uppercase, lowercase, number, and special character" }
    )
});

export const signInSchema = authSchema;
export const signUpSchema = authSchema;