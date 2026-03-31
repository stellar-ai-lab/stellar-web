import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { signIn } from "@/services/supabaseAuthService"

export function useSignIn() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      toast.success("Signed in successfully")
      navigate({ to: "/" })
    },
  })
}
