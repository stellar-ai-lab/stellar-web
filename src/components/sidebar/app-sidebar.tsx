import { useNavigate, useRouterState } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { Separator } from "@/components/ui/separator"
import { NavUser } from "@/components/sidebar/nav-user"
import {
  AiBrain01Icon,
  ArtificialIntelligence08Icon,
  Calendar03Icon,
  Chart01Icon,
  Chat01Icon,
  Home01Icon,
  IdentityCardIcon,
  PuzzleIcon,
  Saturn01Icon,
  StartUp02Icon,
  Target02Icon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: <HugeiconsIcon icon={Home01Icon} />,
    },
    {
      title: "Timesheet",
      url: "#",
      icon: <HugeiconsIcon icon={Calendar03Icon} />,
    },
    {
      title: "Trainings",
      url: "#",
      icon: <HugeiconsIcon icon={Target02Icon} />,
    },
    {
      title: "Engagement",
      url: "#",
      icon: <HugeiconsIcon icon={Chat01Icon} />,
    },
    {
      title: "Directory",
      url: "#",
      icon: <HugeiconsIcon icon={UserGroupIcon} />,
    },
    {
      title: "Analytics",
      url: "#",
      icon: <HugeiconsIcon icon={Chart01Icon} />,
    },
    {
      title: "AI",
      url: "#",
      icon: <HugeiconsIcon icon={ArtificialIntelligence08Icon} />,
    },
  ],
  adminNav: [
    {
      title: "Manage Accounts",
      url: "/manage-accounts",
      icon: <HugeiconsIcon icon={IdentityCardIcon} />,
    },
    {
      title: "AI Agent",
      url: "#",
      icon: <HugeiconsIcon icon={AiBrain01Icon} />,
    },
    {
      title: "Projects",
      url: "#",
      icon: <HugeiconsIcon icon={StartUp02Icon} />,
    },
    {
      title: "Game",
      url: "#",
      icon: <HugeiconsIcon icon={PuzzleIcon} />,
    },
  ],
}

function isPathActive(pathname: string, url: string) {
  if (url === "#") return false
  if (url === "/") return pathname === "/"
  return pathname.startsWith(url)
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate()
  const { location } = useRouterState()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
              <a href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <HugeiconsIcon icon={Saturn01Icon} className="size-5" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="px-1.5 md:px-0">
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    variant="outline"
                    tooltip={{
                      children: item.title,
                      hidden: false,
                    }}
                    onClick={() =>
                      item.url !== "#" && navigate({ to: item.url })
                    }
                    isActive={isPathActive(location.pathname, item.url)}
                    className="bg-transparent px-2.5 hover:bg-chart-1/20 hover:text-primary data-[active=true]:bg-chart-1/50 data-[active=true]:text-primary md:px-2"
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <Separator className="my-2" />
            <SidebarMenu>
              {data.adminNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    variant="outline"
                    tooltip={{
                      children: item.title,
                      hidden: false,
                    }}
                    onClick={() =>
                      item.url !== "#" && navigate({ to: item.url })
                    }
                    isActive={isPathActive(location.pathname, item.url)}
                    className="bg-transparent px-2.5 hover:bg-chart-1/20 hover:text-primary data-[active=true]:bg-chart-1/50 data-[active=true]:text-primary md:px-2"
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
