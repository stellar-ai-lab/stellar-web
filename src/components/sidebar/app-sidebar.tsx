import { useState } from "react"
import { useNavigate } from "@tanstack/react-router"
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
      url: "#",
      icon: <HugeiconsIcon icon={Home01Icon} />,
      isActive: true,
    },
    {
      title: "Timesheet",
      url: "#",
      icon: <HugeiconsIcon icon={Calendar03Icon} />,
      isActive: false,
    },
    {
      title: "Trainings",
      url: "#",
      icon: <HugeiconsIcon icon={Target02Icon} />,
      isActive: false,
    },
    {
      title: "Engagement",
      url: "#",
      icon: <HugeiconsIcon icon={Chat01Icon} />,
      isActive: false,
    },
    {
      title: "Directory",
      url: "#",
      icon: <HugeiconsIcon icon={UserGroupIcon} />,
      isActive: false,
    },
    {
      title: "Analytics",
      url: "#",
      icon: <HugeiconsIcon icon={Chart01Icon} />,
      isActive: false,
    },
    {
      title: "AI",
      url: "#",
      icon: <HugeiconsIcon icon={ArtificialIntelligence08Icon} />,
      isActive: false,
    },
  ],
  adminNav: [
    {
      title: "Manage Accounts",
      url: "/manage-account",
      icon: <HugeiconsIcon icon={IdentityCardIcon} />,
      isActive: true,
    },
    {
      title: "AI Agent",
      url: "#",
      icon: <HugeiconsIcon icon={AiBrain01Icon} />,
      isActive: false,
    },
    {
      title: "Projects",
      url: "#",
      icon: <HugeiconsIcon icon={StartUp02Icon} />,
      isActive: false,
    },
    {
      title: "Game",
      url: "#",
      icon: <HugeiconsIcon icon={PuzzleIcon} />,
      isActive: false,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Note: I'm using state to show active item.
  // IRL you should use the url/router.
  const navigate = useNavigate()
  const [activeItem, setActiveItem] = useState(data.navMain[0])

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
                    onClick={() => setActiveItem(item)}
                    isActive={activeItem?.title === item.title}
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
                    onClick={() => navigate({ to: item.url })}
                    isActive={activeItem?.title === item.title}
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
