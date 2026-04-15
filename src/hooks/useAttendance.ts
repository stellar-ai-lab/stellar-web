import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { clockIn, getTodayAttendanceStatus } from "@/services/attendanceService"
import { toast } from "sonner"

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
