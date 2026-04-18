import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { createFileRoute } from "@tanstack/react-router"
import {
  ChatIcon,
  Csv01Icon,
  GoogleGeminiIcon,
  InformationCircleIcon,
  Pdf01Icon,
  UserAdd01Icon,
} from "@hugeicons/core-free-icons"
import CreateAccountForm from "./-create-account-form"
import UsersTable from "./-users-table"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export const Route = createFileRoute("/_features/manage-accounts/")({
  component: RouteComponent,
})

function RouteComponent() {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <div>
        <div className="flex flex-1 flex-row flex-nowrap gap-2 px-6 py-2">
          <AlertDialogTrigger asChild>
            <Button>
              <HugeiconsIcon icon={UserAdd01Icon} className="size-4" />
              Create new Account
            </Button>
          </AlertDialogTrigger>
          <Button variant="outline">
            <HugeiconsIcon icon={Csv01Icon} className="size-4 text-green-600" />
            Download CSV
          </Button>
          <Button variant="outline">
            <HugeiconsIcon
              icon={Pdf01Icon}
              className="size-4 text-destructive"
            />
            Download PDF
          </Button>
          <Button variant="secondary" className="ml-auto border-border">
            <HugeiconsIcon
              icon={InformationCircleIcon}
              className="size-4 text-muted-foreground"
            />
            Account Management Guide
          </Button>
          <Button className="bg-chart-2 text-muted">
            <HugeiconsIcon icon={ChatIcon} className="size-4" />
            Chat with Astra
            <HugeiconsIcon icon={GoogleGeminiIcon} className="size-4" />
          </Button>
        </div>
        <Separator className="w-full" />

        <UsersTable />
      </div>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-base font-medium text-primary">
            Create new Account
          </AlertDialogTitle>
          <AlertDialogDescription>
            By creating this account, you’ll be set as the creator. Managers
            will have permission to manage and update this account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <CreateAccountForm onSuccess={() => setOpen(false)} />
        <AlertDialogFooter>
          <AlertDialogCancel className="w-full">Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
