import type * as z from "zod"
import type { CreateAccountSchema } from "@/schemas/auth-schema"
import { apiFetch } from "@/lib/api"

export type CreateAccountData = z.infer<typeof CreateAccountSchema>

export async function createAccount(data: CreateAccountData): Promise<void> {
  const res = await apiFetch("/account/", {
    method: "POST",
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const body = await res.json().catch(() => null)
    throw new Error(body?.detail ?? `Failed to create account (${res.status})`)
  }
}
