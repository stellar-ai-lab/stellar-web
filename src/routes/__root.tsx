import type { ReactNode } from "react"
import { Toaster } from "sonner"
import {
  HeadContent,
  Link,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AuthProvider } from "@/hooks/useAuth"
import appCss from "../styles.css?url"
import { TooltipProvider } from "@/components/ui/tooltip"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
})

export const Route = createRootRoute({
  notFoundComponent: NotFound,
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Stellar - Team management platform from the future",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-3 text-center">
      <p className="text-7xl font-semibold tracking-tight">404</p>
      <p className="text-sm text-muted-foreground">
        This page doesn&apos;t exist.
      </p>
      <Link
        to="/"
        className="text-sm underline underline-offset-4 transition-opacity hover:opacity-70"
      >
        Go home
      </Link>
    </div>
  )
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <head>
          <HeadContent />
        </head>
        <body>
          <TooltipProvider>
            <AuthProvider>{children}</AuthProvider>
            <Toaster richColors position="top-center" />
            <Scripts />
          </TooltipProvider>
        </body>
      </html>
    </QueryClientProvider>
  )
}
