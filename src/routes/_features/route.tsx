import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"

import { supabase } from "@/lib/supabase"

export const Route = createFileRoute("/_features")({
  beforeLoad: async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      throw redirect({ to: "/auth/signin" })
    }
  },
  component: () => <Outlet />,
})
