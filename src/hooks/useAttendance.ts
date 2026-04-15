import { toast } from "sonner"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  clockIn,
  clockOut,
  getTodayAttendanceStatus,
} from "@/services/attendanceService"

export const attendanceKeys = {
  all: ["attendance"] as const,
  todayStatus: () => [...attendanceKeys.all, "today-status"] as const,
}

export function useTodayAttendanceStatus() {
  return useQuery({
    queryKey: attendanceKeys.todayStatus(),
    queryFn: getTodayAttendanceStatus,
  })
}

export function useClockIn() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: clockIn,
    onSuccess: () => {
      toast.success("Clocked in successfully")
      queryClient.invalidateQueries({ queryKey: attendanceKeys.todayStatus() })
    },
    onError: (error: Error) => {
      toast.error(error.message ?? "Failed to clock in")
    },
  })
}

export function useClockOut() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: clockOut,
    onSuccess: () => {
      toast.success("Clocked out successfully")
      queryClient.invalidateQueries({ queryKey: attendanceKeys.todayStatus() })
    },
    onError: (error: Error) => {
      toast.error(error.message ?? "Failed to clock out")
    },
  })
}
