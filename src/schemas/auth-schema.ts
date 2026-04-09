import * as z from "zod"

export const LoginSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export const CreateAccountSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be less than 30 characters"),
  role: z.enum(
    ["leadership", "manager", "developer", "lead", "support", "ic"],
    "Please select a role"
  ),
})
