import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"
import { supabase } from "@/lib/supabase"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import HeaderBreadcrumb from "@/components/sidebar/breadcrumb"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
  Appointment01Icon,
  CalendarRemove01Icon,
  Tick01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { useState } from "react"

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

// TODO: implement clock in/out functionality
function FeaturesLayout() {
  const [isClockedIn, setIsClockedIn] = useState<boolean>(false)

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background px-6 py-2">
          <HeaderBreadcrumb />
          <div className="ml-auto flex items-center gap-4">
            {isClockedIn ? (
              <Button
                variant="destructive"
                onClick={() => {
                  setIsClockedIn(!isClockedIn)
                }}
              >
                <HugeiconsIcon icon={CalendarRemove01Icon} className="size-4" />
                Clock Out
              </Button>
            ) : (
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={() => {
                  setIsClockedIn(!isClockedIn)
                }}
              >
                <HugeiconsIcon icon={Appointment01Icon} className="size-4" />
                Clock In
              </Button>
            )}
            <Avatar className="size-7">
              <AvatarImage src="https://github.com/shadcn.png" alt="John Doe" />
              <AvatarFallback>CN</AvatarFallback>
              <AvatarBadge className="bg-primary">
                <HugeiconsIcon icon={Tick01Icon} className="size-4" />
              </AvatarBadge>
            </Avatar>
          </div>
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}
