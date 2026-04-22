import * as z from "zod"

export const ClockOutSchema = z.object({
  notes: z
    .string()
    .trim()
    .min(1, { message: "Notes are required" })
    .max(200, { message: "Notes must be less than 200 characters" }),
})

const today = () => {
  const manilaDateStr = new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Manila",
  })
  return new Date(`${manilaDateStr}T00:00:00`)
}

export const LeaveRequestSchema = z
  .object({
    leave_type: z.enum(["VL", "SL", "EL", "ML", "PL"], {
      message: "Please select leave you want to request",
    }),
    start_date: z
      .string({ message: "Start date is required" })
      .min(1, { message: "Start date is required" })
      .refine((date) => new Date(date) >= today(), {
        message: "Start date must be today or in the future",
      }),
    end_date: z
      .string({ message: "End date is required" })
      .min(1, { message: "End date is required" })
      .refine((date) => new Date(date) >= today(), {
        message: "End date must be today or in the future",
      }),
    reason: z
      .string()
      .trim()
      .min(1, { message: "Reason is required" })
      .max(200, { message: "Reason must be less than 200 characters" }),
  })
  .superRefine((data, ctx) => {
    if (data.start_date && data.end_date) {
      if (new Date(data.end_date) < new Date(data.start_date)) {
        ctx.addIssue({
          code: "custom",
          message: "End date must be on or after the start date",
          path: ["end_date"],
        })
      }
    }
  })
