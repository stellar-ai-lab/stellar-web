import { createFileRoute, Link, Outlet, redirect } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { Saturn01Icon } from "@hugeicons/core-free-icons"
import { supabase } from "@/lib/supabase"

export const Route = createFileRoute("/auth")({
  beforeLoad: async () => {
    if (typeof window === "undefined") return

    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (session) {
      throw redirect({ to: "/" })
    }
  },
  component: AuthLayout,
})

function AuthLayout() {
  return (
    <div>
      <div className="relative flex min-h-screen w-full items-center justify-center bg-[#020617]">
        <div
          className="absolute inset-0 z-0"
          style={{
            background: `
       radial-gradient(ellipse 110% 70% at 25% 80%, rgba(147, 51, 234, 0.12), transparent 55%),
       radial-gradient(ellipse 130% 60% at 75% 15%, rgba(59, 130, 246, 0.10), transparent 65%),
       radial-gradient(ellipse 80% 90% at 20% 30%, rgba(236, 72, 153, 0.14), transparent 50%),
       radial-gradient(ellipse 100% 40% at 60% 70%, rgba(16, 185, 129, 0.08), transparent 45%),
       #000000
     `,
          }}
        />
        <div className="relative z-10 m-auto w-full max-w-sm">
          <div className="mx-auto mb-2 flex w-fit items-center gap-1 rounded-md p-2 text-muted">
            <HugeiconsIcon
              icon={Saturn01Icon}
              className="size-7"
              strokeWidth={2}
            />
            <span className="text-2xl font-medium">Stellar</span>
          </div>
          <Outlet />
        </div>

        <p className="absolute bottom-4 z-10 text-center text-xs text-muted-foreground [&>a]:text-primary-foreground [&>a]:underline-offset-4 [&>a]:hover:underline">
          By signing in, you agree to our{" "}
          <Link to="/" className="hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/" className="hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
