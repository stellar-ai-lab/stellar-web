import { createFileRoute, Link, Outlet, redirect } from "@tanstack/react-router"

import { supabase } from "@/lib/supabase"

export const Route = createFileRoute("/auth")({
  beforeLoad: async () => {
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
        {/* Magenta Orb Grid Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "#020617",
            backgroundImage: `
        linear-gradient(to right, rgba(71,85,105,0.15) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(71,85,105,0.15) 1px, transparent 1px),
        radial-gradient(circle at 50% 60%, rgba(236,72,153,0.15) 0%, rgba(168,85,247,0.05) 40%, transparent 70%)
      `,
            backgroundSize: "40px 40px, 40px 40px, 100% 100%",
          }}
        />
        <div className="relative z-10 m-auto w-full max-w-sm">
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
