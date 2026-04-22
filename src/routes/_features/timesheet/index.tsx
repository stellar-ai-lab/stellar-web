import { useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Audit01Icon,
  Calendar03Icon,
  CalendarBlock01Icon,
  News01Icon,
  StickyNote02Icon,
} from "@hugeicons/core-free-icons"
import Overview from "@/routes/_features/timesheet/-overview"
import Attendance from "@/routes/_features/timesheet/-attendance"
import Leaves from "@/routes/_features/timesheet/-leaves"
import Actuals from "@/routes/_features/timesheet/-actuals"
import ManageRequests from "@/routes/_features/timesheet/-manage-requests"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const Route = createFileRoute("/_features/timesheet/")({
  component: RouteComponent,
})

function RouteComponent() {
  const [activeTab, setActiveTab] = useState<string>("overview")

  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="gap-y-0">
        <TabsList variant="line" className="h-10! px-6">
          <TabsTrigger
            value="overview"
            className="hover:text-primary data-active:text-primary data-active:after:bg-primary"
          >
            <HugeiconsIcon icon={News01Icon} className="size-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="attendance"
            className="hover:text-primary data-active:text-primary data-active:after:bg-primary"
          >
            <HugeiconsIcon icon={Calendar03Icon} className="size-4" />
            Attendance
          </TabsTrigger>
          <TabsTrigger
            value="leaves"
            className="hover:text-primary data-active:text-primary data-active:after:bg-primary"
          >
            <HugeiconsIcon icon={CalendarBlock01Icon} className="size-4" />
            Leaves
          </TabsTrigger>
          <TabsTrigger
            value="actuals"
            className="hover:text-primary data-active:text-primary data-active:after:bg-primary"
          >
            <HugeiconsIcon icon={StickyNote02Icon} className="size-4" />
            Actuals
          </TabsTrigger>
          <TabsTrigger
            value="manage-requests"
            className="hover:text-primary data-active:text-primary data-active:after:bg-primary"
            disabled
          >
            <HugeiconsIcon icon={Audit01Icon} className="size-4" />
            Manage Requests
          </TabsTrigger>
        </TabsList>

        <Separator className="w-full" />

        <TabsContent value="overview">
          <Overview />
        </TabsContent>

        <TabsContent value="attendance">
          <Attendance />
        </TabsContent>

        <TabsContent value="leaves">
          <Leaves isActive={activeTab === "leaves"} />
        </TabsContent>

        <TabsContent value="actuals">
          <Actuals />
        </TabsContent>

        <TabsContent value="manage-requests">
          <ManageRequests />
        </TabsContent>
      </Tabs>
    </div>
  )
}
