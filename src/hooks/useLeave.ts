import { toast } from "sonner"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { CreateLeaveRequestPayload } from "@/services/leaveService"
import { createLeaveRequest, getApprovers } from "@/services/leaveService"

export const leaveKeys = {
  all: ["leave"] as const,
  approvers: () => [...leaveKeys.all, "approvers"] as const,
  requests: () => [...leaveKeys.all, "requests"] as const,
}

export function useApprovers(enabled: boolean) {
  return useQuery({
    queryKey: leaveKeys.approvers(),
    queryFn: getApprovers,
    enabled,
    staleTime: 10 * 60 * 1000,
  })
}

export function useCreateLeaveRequest(onSuccess?: () => void) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateLeaveRequestPayload) =>
      createLeaveRequest(payload),
    onSuccess: () => {
      toast.success("Leave request submitted successfully")
      queryClient.invalidateQueries({ queryKey: leaveKeys.requests() })
      onSuccess?.()
    },
    onError: (error: Error) => {
      toast.error(error.message ?? "Failed to submit leave request")
    },
  })
}
