import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { HugeiconsIcon } from "@hugeicons/react"
import { createFileRoute } from "@tanstack/react-router"
import {
  ChatIcon,
  Csv01Icon,
  GoogleGeminiIcon,
  InformationCircleIcon,
  UserAdd01Icon,
} from "@hugeicons/core-free-icons"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import CreateAccountForm from "@/routes/_features/manage-accounts/create-account-form"

export const Route = createFileRoute("/_features/manage-accounts/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Sheet>
      <div>
        <div className="flex flex-1 flex-row flex-nowrap items-center gap-2 px-6 py-2">
          <SheetTrigger asChild>
            <Button>
              <HugeiconsIcon icon={UserAdd01Icon} className="size-4" />
              Create new Account
            </Button>
          </SheetTrigger>
          <Button variant="secondary" className="border-border">
            <HugeiconsIcon icon={Csv01Icon} className="size-4 text-green-600" />
            Export to CSV
          </Button>
          <Button variant="outline" className="ml-auto">
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
      </div>

      <SheetContent className="min-w-md" side="right">
        <SheetHeader>
          <SheetTitle className="text-base font-medium text-primary">
            Create new Account
          </SheetTitle>
          <SheetDescription className="text-sm/relaxed text-muted-foreground">
            By creating this account, you’ll be set as the creator. Managers
            will have permission to manage and update this account.
          </SheetDescription>
        </SheetHeader>
        <CreateAccountForm />
        <SheetFooter>
          <Button>
            <HugeiconsIcon icon={UserAdd01Icon} className="size-4" />
            Create new Account
          </Button>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
