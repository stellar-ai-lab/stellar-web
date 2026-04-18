import * as z from "zod"

export const ClockOutSchema = z.object({
  notes: z
    .string()
    .trim()
    .min(1, { message: "Notes are required" })
    .max(200, { message: "Notes must be less than 200 characters" }),
})
