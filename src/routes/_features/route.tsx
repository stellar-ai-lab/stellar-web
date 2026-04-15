import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Appointment01Icon,
  CalendarRemove01Icon,
  Loading03Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons"
import { supabase } from "@/lib/supabase"
import { useClockIn, useTodayAttendanceStatus } from "@/hooks/useAttendance"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import HeaderBreadcrumb from "@/components/sidebar/breadcrumb"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

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
  const { data: attendanceStatus, isLoading } = useTodayAttendanceStatus()
  const { mutate: clockInMutation, isPending: isClockingIn } = useClockIn()

  const canClockIn = attendanceStatus?.can_clock_in ?? false
  const canClockOut = attendanceStatus?.can_clock_out ?? false

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex shrink-0 items-center gap-2 border-b bg-background px-6 py-2">
          <HeaderBreadcrumb />
          <div className="ml-auto flex items-center gap-4">
            {isLoading ? (
              <Skeleton className="h-6 w-24 rounded-sm" />
            ) : canClockOut && !canClockIn ? (
              <Button variant="destructive">
                <HugeiconsIcon icon={CalendarRemove01Icon} className="size-4" />
                Clock Out
              </Button>
            ) : (
              <Button
                className="bg-green-600 hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-600 disabled:opacity-50"
                disabled={(!canClockIn && !canClockOut) || isClockingIn}
                onClick={() => clockInMutation()}
              >
                {isClockingIn ? (
                  <HugeiconsIcon
                    icon={Loading03Icon}
                    strokeWidth={2}
                    className="size-4 animate-spin"
                  />
                ) : (
                  <HugeiconsIcon icon={Appointment01Icon} className="size-4" />
                )}
                {isClockingIn ? "Clocking in..." : "Clock In"}
              </Button>
            )}
            <Avatar className="size-7">
              <AvatarImage src="https://github.com/shadcn.png" alt="John Doe" />
              <AvatarFallback>CN</AvatarFallback>
              <AvatarBadge className="bg-primary">
                <HugeiconsIcon icon={Tick02Icon} className="size-4" />
              </AvatarBadge>
            </Avatar>
          </div>
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}
