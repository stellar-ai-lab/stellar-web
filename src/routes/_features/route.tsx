import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"

import { supabase } from "@/lib/supabase"

export const Route = createFileRoute("/_features")({
  beforeLoad: async () => {
    if (typeof window === "undefined") return

    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      throw redirect({ to: "/auth/signin" })
    }
  },
  component: () => <Outlet />,
})
