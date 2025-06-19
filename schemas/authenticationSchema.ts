import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email format" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
      message:
        "Password must contain uppercase, lowercase, number, and special character",
    }),
});

export const signUpSchema = z
  .object({
    email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email format" }),
    password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
      message:
        "Password must contain uppercase, lowercase, number, and special character",
    }),
    confPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
      message:
        "Password must contain uppercase, lowercase, number, and special character",
    }),
  })
  .refine((data) => data.password === data.confPassword, {
    message: "Passwords do not match",
    path: ["confPassword"],
  });
