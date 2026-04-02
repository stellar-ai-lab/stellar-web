import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"
import { supabase } from "@/lib/supabase"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import HeaderBreadcrumb from "@/components/sidebar/breadcrumb"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

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
  component: FeaturesLayout,
})

function FeaturesLayout() {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background px-8 py-4">
          <HeaderBreadcrumb />
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}
