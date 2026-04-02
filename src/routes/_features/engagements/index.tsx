import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_features/engagements/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-1 flex-col gap-4 px-8 py-4">
      <div className="flex min-h-svh">
        <div className="flex max-w-md min-w-0 flex-col gap-4 text-xs leading-loose">
          <div>
            <h1 className="text-2xl font-bold">Engagement</h1>
            <p className="text-sm text-muted-foreground">
              Manage your engagements and settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
