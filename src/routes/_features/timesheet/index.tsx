import { createFileRoute } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Audit01Icon,
  Beach02Icon,
  Calendar03Icon,
  News01Icon,
  StickyNote02Icon,
} from "@hugeicons/core-free-icons"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const Route = createFileRoute("/_features/timesheet/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <div className="flex flex-1 flex-row flex-nowrap gap-2 px-6">
        <Tabs defaultValue="overview" className="w-[400px]">
          <TabsList variant="line" className="h-10!">
            <TabsTrigger
              value="overview"
              className="hover:text-primary data-active:text-primary data-active:after:bg-primary"
            >
              <HugeiconsIcon icon={News01Icon} className="size-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="hover:text-primary data-active:text-primary data-active:after:bg-primary"
            >
              <HugeiconsIcon icon={Calendar03Icon} className="size-4" />
              Attendance
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="hover:text-primary data-active:text-primary data-active:after:bg-primary"
            >
              <HugeiconsIcon icon={Beach02Icon} className="size-4" />
              Leaves
            </TabsTrigger>
            <TabsTrigger
              value="team"
              className="hover:text-primary data-active:text-primary data-active:after:bg-primary"
            >
              <HugeiconsIcon icon={StickyNote02Icon} className="size-4" />
              Actuals
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="hover:text-primary data-active:text-primary data-active:after:bg-primary"
            >
              <HugeiconsIcon icon={Audit01Icon} className="size-4" />
              Manage Requests
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Separator className="w-full" />
    </div>
  )
}
