import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_features/manage-accounts/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex min-h-svh p-6">
        <div className="flex max-w-md min-w-0 flex-col gap-4 text-xs leading-loose">
          <div>
            <h1 className="text-2xl font-bold">Manage Accounts</h1>
            <p className="text-sm text-muted-foreground">
              Manage your accounts and settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
