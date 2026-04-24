import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarGroup,
} from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Calendar03Icon,
  SortByDown02Icon,
  SortByUp02Icon,
  TransactionHistoryIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

type LeaveStatus = "Pending" | "Approved" | "Cancelled" | "Rejected"

type Approver = {
  name: string
  avatar_url: string | null
}

type LeaveHistoryItem = {
  id: number
  status: LeaveStatus
  leave_type: string
  approvers: Approver[]
  date_approved: string | null
  leave_date: string
  reason: string
}

const DUMMY_HISTORY: LeaveHistoryItem[] = [
  {
    id: 1,
    status: "Approved",
    leave_type: "Vacation Leave",
    approvers: [
      { name: "Carl James", avatar_url: "https://github.com/shadcn.png" },
      { name: "Maria Santos", avatar_url: null },
    ],
    date_approved: "2026-04-02",
    leave_date: "2026-04-07 – 2026-04-09",
    reason: "Family vacation out of town",
  },
  {
    id: 2,
    status: "Approved",
    leave_type: "Sick Leave",
    approvers: [{ name: "Maria Santos", avatar_url: null }],
    date_approved: "2026-03-21",
    leave_date: "2026-03-22",
    reason: "Fever and body aches",
  },
  {
    id: 3,
    status: "Pending",
    leave_type: "Emergency Leave",
    approvers: [
      { name: "Carl James", avatar_url: "https://github.com/shadcn.png" },
      { name: "James Reyes", avatar_url: null },
      { name: "Maria Santos", avatar_url: null },
    ],
    date_approved: null,
    leave_date: "2026-04-23",
    reason: "Family emergency situation",
  },
  {
    id: 4,
    status: "Rejected",
    leave_type: "Vacation Leave",
    approvers: [{ name: "James Reyes", avatar_url: null }],
    date_approved: "2026-03-10",
    leave_date: "2026-03-15 – 2026-03-17",
    reason: "Rest and personal errands",
  },
  {
    id: 5,
    status: "Approved",
    leave_type: "Sick Leave",
    approvers: [
      { name: "Maria Santos", avatar_url: null },
      { name: "Carl James", avatar_url: "https://github.com/shadcn.png" },
    ],
    date_approved: "2026-02-14",
    leave_date: "2026-02-15",
    reason: "Scheduled medical check-up",
  },
  {
    id: 6,
    status: "Cancelled",
    leave_type: "Vacation Leave",
    approvers: [
      { name: "Carl James", avatar_url: "https://github.com/shadcn.png" },
    ],
    date_approved: null,
    leave_date: "2026-02-20 – 2026-02-21",
    reason: "Personal travel plans",
  },
  {
    id: 7,
    status: "Approved",
    leave_type: "Emergency Leave",
    approvers: [
      { name: "James Reyes", avatar_url: null },
      { name: "Maria Santos", avatar_url: null },
    ],
    date_approved: "2026-01-29",
    leave_date: "2026-01-30",
    reason: "Immediate family hospitalization",
  },
  {
    id: 8,
    status: "Pending",
    leave_type: "Sick Leave",
    approvers: [{ name: "Maria Santos", avatar_url: null }],
    date_approved: null,
    leave_date: "2026-04-24",
    reason: "Migraine and dizziness",
  },
  {
    id: 9,
    status: "Approved",
    leave_type: "Maternity Leave",
    approvers: [
      { name: "Carl James", avatar_url: "https://github.com/shadcn.png" },
      { name: "James Reyes", avatar_url: null },
      { name: "Maria Santos", avatar_url: null },
    ],
    date_approved: "2026-01-05",
    leave_date: "2026-01-06 – 2026-02-03",
    reason: "Maternity leave",
  },
  {
    id: 10,
    status: "Rejected",
    leave_type: "Emergency Leave",
    approvers: [{ name: "James Reyes", avatar_url: null }],
    date_approved: "2026-03-05",
    leave_date: "2026-03-06",
    reason: "Urgent personal matter",
  },
  {
    id: 11,
    status: "Approved",
    leave_type: "Vacation Leave",
    approvers: [
      { name: "Maria Santos", avatar_url: null },
      { name: "Carl James", avatar_url: "https://github.com/shadcn.png" },
    ],
    date_approved: "2025-12-20",
    leave_date: "2025-12-26 – 2025-12-31",
    reason: "Christmas and New Year holiday",
  },
  {
    id: 12,
    status: "Cancelled",
    leave_type: "Sick Leave",
    approvers: [
      { name: "Carl James", avatar_url: "https://github.com/shadcn.png" },
    ],
    date_approved: null,
    leave_date: "2025-11-18",
    reason: "Stomach pain",
  },
]

const STATUS_STYLES: Record<LeaveStatus, string> = {
  Approved:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Pending:
    "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
  Rejected: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  Cancelled: "bg-muted text-muted-foreground",
}

const STATUS_DOT: Record<LeaveStatus, string> = {
  Approved: "bg-green-600",
  Pending: "bg-indigo-600",
  Rejected: "bg-red-600",
  Cancelled: "bg-muted-foreground",
}

function getInitials(name: string) {
  const parts = name.trim().split(" ")
  return parts.length >= 2
    ? `${parts[0][0]}${parts[parts.length - 1][0]}`
    : parts[0][0]
}

export default function LeavesHistory() {
  const [sort, setSort] = useState<"asc" | "desc">("asc")

  return (
    <>
      <div className="sticky top-0 z-10 flex flex-row flex-nowrap items-center justify-between border-b bg-background py-4">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <HugeiconsIcon icon={TransactionHistoryIcon} className="size-4" />
          <p>Request History</p>
        </div>
        <Button
          variant="outline"
          onClick={() => setSort(sort === "asc" ? "desc" : "asc")}
        >
          <HugeiconsIcon
            icon={sort === "asc" ? SortByDown02Icon : SortByUp02Icon}
            className="size-4"
          />
          Sort
        </Button>
      </div>

      {/* History list */}
      <div className="mt-3 flex flex-col gap-3">
        {[...DUMMY_HISTORY]
          .sort((a, b) =>
            sort === "desc"
              ? a.leave_date.localeCompare(b.leave_date)
              : b.leave_date.localeCompare(a.leave_date)
          )
          .map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-1 rounded-lg border p-3"
            >
              {/* Leave type + status */}
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium">{item.leave_type}</p>
                <span
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[item.status]}`}
                >
                  <span
                    className={`size-1.5 rounded-full ${STATUS_DOT[item.status]}`}
                  />
                  {item.status}
                </span>
              </div>

              {/* Reason */}
              <p className="line-clamp-2 text-xs text-muted-foreground">
                {item.reason}
              </p>

              {/* Approvers row */}
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Approver:</span>
                <AvatarGroup>
                  {item.approvers.map((approver) => (
                    <Tooltip key={approver.name}>
                      <TooltipTrigger asChild>
                        <Avatar size="sm" className="size-5 cursor-default">
                          <AvatarImage
                            src={approver.avatar_url ?? undefined}
                            alt={approver.name}
                          />
                          <AvatarFallback className="text-[9px]">
                            {getInitials(approver.name)}
                          </AvatarFallback>
                        </Avatar>
                      </TooltipTrigger>
                      <TooltipContent>{approver.name}</TooltipContent>
                    </Tooltip>
                  ))}
                </AvatarGroup>
              </div>

              {/* Date row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <HugeiconsIcon icon={Calendar03Icon} className="size-3.5" />
                  <span>{item.leave_date}</span>
                </div>
                {item.date_approved && (
                  <span className="text-xs text-muted-foreground">
                    Approved {item.date_approved}
                  </span>
                )}
              </div>
            </div>
          ))}
      </div>
    </>
  )
}
