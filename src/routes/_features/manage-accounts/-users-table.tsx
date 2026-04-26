import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Briefcase04Icon,
  Calendar04Icon,
  DashedLineCircleIcon,
  Ellipsis,
  StudentCardIcon,
  UserGroupIcon,
  UserIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

type AccountStatus = "Active" | "Inactive" | "Pending"

interface User {
  id: number
  name: string
  email: string
  avatar?: string
  position: string
  team: string
  role: "Leadership" | "Manager" | "Dev" | "Support" | "Lead" | "IC"
  status: AccountStatus
  dateJoined: string
  dateUpdated: string
}

const USERS: User[] = [
  {
    id: 1,
    name: "Maria Santos",
    email: "m.santos@stellar.ph",
    position: "Chief Executive Officer",
    team: "Executive",
    role: "Leadership",
    status: "Active",
    dateJoined: "2021-01-15",
    dateUpdated: "2024-11-02",
  },
  {
    id: 2,
    name: "James Reyes",
    email: "j.reyes@stellar.ph",
    position: "Engineering Manager",
    team: "Engineering",
    role: "Manager",
    status: "Active",
    dateJoined: "2021-03-10",
    dateUpdated: "2024-12-08",
  },
  {
    id: 3,
    name: "Carla Mendoza",
    email: "c.mendoza@stellar.ph",
    position: "Platform Developer",
    team: "Engineering",
    role: "Dev",
    status: "Active",
    dateJoined: "2022-06-01",
    dateUpdated: "2025-01-14",
  },
  {
    id: 4,
    name: "Daniel Cruz",
    email: "d.cruz@stellar.ph",
    position: "Platform Developer",
    team: "Engineering",
    role: "Dev",
    status: "Active",
    dateJoined: "2022-08-22",
    dateUpdated: "2025-02-03",
  },
  {
    id: 5,
    name: "Anna Villanueva",
    email: "a.villanueva@stellar.ph",
    position: "Support Specialist",
    team: "Customer Success",
    role: "Support",
    status: "Active",
    dateJoined: "2022-11-07",
    dateUpdated: "2025-03-01",
  },
  {
    id: 6,
    name: "Mark Lim",
    email: "m.lim@stellar.ph",
    position: "Team Lead",
    team: "Operations",
    role: "Lead",
    status: "Inactive",
    dateJoined: "2021-09-18",
    dateUpdated: "2024-09-30",
  },
  {
    id: 7,
    name: "Sofia Dela Cruz",
    email: "s.delacruz@stellar.ph",
    position: "Individual Contributor",
    team: "Operations",
    role: "IC",
    status: "Active",
    dateJoined: "2023-02-13",
    dateUpdated: "2025-03-21",
  },
  {
    id: 8,
    name: "Ryan Torres",
    email: "r.torres@stellar.ph",
    position: "Platform Developer",
    team: "Engineering",
    role: "Dev",
    status: "Pending",
    dateJoined: "2024-10-01",
    dateUpdated: "2024-10-01",
  },
  {
    id: 9,
    name: "Patricia Ramos",
    email: "p.ramos@stellar.ph",
    position: "Operations Manager",
    team: "Operations",
    role: "Manager",
    status: "Active",
    dateJoined: "2022-04-25",
    dateUpdated: "2025-01-09",
  },
  {
    id: 10,
    name: "Luis Garcia",
    email: "l.garcia@stellar.ph",
    position: "Individual Contributor",
    team: "Customer Success",
    role: "IC",
    status: "Inactive",
    dateJoined: "2023-07-30",
    dateUpdated: "2024-08-14",
  },
  {
    id: 11,
    name: "Bianca Aquino",
    email: "b.aquino@stellar.ph",
    position: "Support Specialist",
    team: "Customer Success",
    role: "Support",
    status: "Active",
    dateJoined: "2023-09-04",
    dateUpdated: "2025-02-18",
  },
  {
    id: 12,
    name: "Kevin Navarro",
    email: "k.navarro@stellar.ph",
    position: "Platform Developer",
    team: "Engineering",
    role: "Dev",
    status: "Active",
    dateJoined: "2023-11-20",
    dateUpdated: "2025-03-10",
  },
  {
    id: 13,
    name: "Rachel Flores",
    email: "r.flores@stellar.ph",
    position: "Team Lead",
    team: "Engineering",
    role: "Lead",
    status: "Active",
    dateJoined: "2022-01-17",
    dateUpdated: "2025-01-28",
  },
  {
    id: 14,
    name: "Jerome Castillo",
    email: "j.castillo@stellar.ph",
    position: "Individual Contributor",
    team: "Operations",
    role: "IC",
    status: "Pending",
    dateJoined: "2025-01-06",
    dateUpdated: "2025-01-06",
  },
  {
    id: 15,
    name: "Diana Pascual",
    email: "d.pascual@stellar.ph",
    position: "Operations Manager",
    team: "Executive",
    role: "Manager",
    status: "Active",
    dateJoined: "2021-06-28",
    dateUpdated: "2024-12-19",
  },
]

const ROLE_LABELS: Record<User["role"], string> = {
  Leadership: "Leadership",
  Manager: "Manager",
  Dev: "Platform Developer",
  Support: "Support",
  Lead: "Team Lead",
  IC: "Individual Contributor",
}

const ROLE_COLORS: Record<User["role"], string> = {
  Leadership: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  Manager: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Dev: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
  Support: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Lead: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  IC: "bg-muted text-muted-foreground",
}

const STATUS_COLORS: Record<AccountStatus, string> = {
  Active: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Inactive: "bg-muted text-muted-foreground",
  Pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
}

const STATUS_DOT: Record<AccountStatus, string> = {
  Active: "bg-emerald-500",
  Inactive: "bg-muted-foreground",
  Pending: "bg-amber-500",
}

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

function UserRowActions({ user }: { user: User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          className="text-muted-foreground hover:text-foreground"
        >
          <span className="sr-only">Open actions for {user.name}</span>
          <HugeiconsIcon icon={Ellipsis} className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onSelect={() => {
            void navigator.clipboard
              .writeText(String(user.id))
              .then(() => toast.success("User ID copied"))
              .catch(() => toast.error("Could not copy"))
          }}
        >
          Copy user ID
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => {
            void navigator.clipboard
              .writeText(user.email)
              .then(() => toast.success("Email copied"))
              .catch(() => toast.error("Could not copy"))
          }}
        >
          Copy email
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => toast.message("View profile")}>
          View profile
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => toast.message("Edit account")}>
          Edit account
        </DropdownMenuItem>
        <DropdownMenuItem
          variant="destructive"
          onSelect={() => toast.message("Deactivate user")}
        >
          Deactivate
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default function UsersTable() {
  return (
    <div className="px-6 py-4">
      <div className="rounded-sm border">
        <Table className="[&_td]:border-r [&_th]:border-r [&_td:last-child]:border-r-0 [&_th:last-child]:border-r-0">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-6 text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <HugeiconsIcon icon={UserIcon} className="size-4" />
                  Name
                </div>
              </TableHead>
              <TableHead className="text-muted-foreground">
                Email
              </TableHead>
              <TableHead className="text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <HugeiconsIcon icon={Briefcase04Icon} className="size-4" />
                  Position
                </div>
              </TableHead>
              <TableHead className="text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <HugeiconsIcon icon={UserGroupIcon} className="size-4" />
                  Team
                </div>
              </TableHead>
              <TableHead className="text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <HugeiconsIcon icon={StudentCardIcon} className="size-4" />
                  Role
                </div>
              </TableHead>
              <TableHead className="text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <HugeiconsIcon
                    icon={DashedLineCircleIcon}
                    className="size-4"
                  />
                  Status
                </div>
              </TableHead>
              <TableHead className="text-muted-foreground">
                <div className="flex items-center justify-center gap-1.5">
                  <HugeiconsIcon icon={Calendar04Icon} className="size-4" />
                  Date Joined
                </div>
              </TableHead>
              <TableHead className="pr-6 text-muted-foreground">
                <div className="flex items-center justify-center gap-1.5">
                  <HugeiconsIcon icon={Calendar04Icon} className="size-4" />
                  Last Updated
                </div>
              </TableHead>
              <TableHead className="w-12 pr-6 text-right">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {USERS.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="pl-6">
                  <div className="flex items-center gap-2">
                    <Avatar size="sm">
                      {user.avatar && (
                        <AvatarImage src={user.avatar} alt={user.name} />
                      )}
                      <AvatarFallback className="text-xs font-medium">
                        {initials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-foreground">
                      {user.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {user.email}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {user.position}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {user.team}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${ROLE_COLORS[user.role]}`}
                  >
                    {ROLE_LABELS[user.role]}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[user.status]}`}
                  >
                    <span
                      className={`size-1.5 rounded-full ${STATUS_DOT[user.status]}`}
                    />
                    {user.status}
                  </span>
                </TableCell>
                <TableCell className="text-center text-muted-foreground">
                  {formatDate(user.dateJoined)}
                </TableCell>
                <TableCell className="pr-6 text-center text-muted-foreground">
                  {formatDate(user.dateUpdated)}
                </TableCell>
                <TableCell className="pr-6 text-right">
                  <UserRowActions user={user} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
