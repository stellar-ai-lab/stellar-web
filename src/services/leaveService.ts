import { apiFetch } from "@/lib/api"

export type Approver = {
  id: string
  user_id: string
  first_name: string
  last_name: string
  avatar_url: string | null
  job_title: string
}

export type LeaveRequest = {
  id: string
  user_id: string
  leave_type: string
  start_date: string
  end_date: string
  approver: string
  reason: string
  status: string
  created_at: string
  updated_at: string
}

export type CreateLeaveRequestPayload = {
  leave_type: string
  start_date: string
  end_date: string
  approver: string
  reason: string
}

export async function getApprovers(): Promise<Approver[]> {
  const res = await apiFetch("/leave/approver")

  if (!res.ok) {
    const body = await res.json().catch(() => null)
    throw new Error(body?.detail ?? `Failed to fetch approvers (${res.status})`)
  }

  return res.json()
}

export async function createLeaveRequest(
  payload: CreateLeaveRequestPayload
): Promise<LeaveRequest> {
  const res = await apiFetch("/leave/", {
    method: "POST",
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const body = await res.json().catch(() => null)
    throw new Error(
      body?.detail ?? `Failed to submit leave request (${res.status})`
    )
  }

  return res.json()
}
