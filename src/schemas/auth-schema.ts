import * as z from "zod"

export const LoginSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(8, "Password must be at least 8 characters"),
})
