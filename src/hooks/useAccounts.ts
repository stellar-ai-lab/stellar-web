import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAccount } from "@/services/accountService"

export const accountKeys = {
  all: ["accounts"] as const,
  list: () => [...accountKeys.all, "list"] as const,
}

export function useCreateAccount() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createAccount,
    onSuccess: () => {
      toast.success("Account created successfully")
      queryClient.invalidateQueries({ queryKey: accountKeys.list() })
    },
    onError: (error: Error) => {
      toast.error(error.message ?? "Failed to create account")
    },
  })
}
