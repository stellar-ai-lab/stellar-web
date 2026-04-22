import * as z from "zod"
import { useState } from "react"
import { format } from "date-fns"
import { Controller, useForm } from "react-hook-form"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Calendar03Icon,
  FilterIcon,
  PlusSignIcon,
} from "@hugeicons/core-free-icons"
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema"
import { LeaveRequestSchema } from "@/schemas/attendance-schema"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "@/components/ui/textarea"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type FormData = z.infer<typeof LeaveRequestSchema>

export default function Leaves() {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)

  const form = useForm<FormData>({
    resolver: standardSchemaResolver(LeaveRequestSchema),
    defaultValues: {
      leave_type: "" as FormData["leave_type"],
      start_date: "",
      end_date: "",
      reason: "",
    },
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <Sheet>
      <div className="px-6 py-4">
        <div className="flex flex-row flex-nowrap gap-2">
          <SheetTrigger asChild>
            <Button>
              <HugeiconsIcon icon={PlusSignIcon} className="size-4" />
              New Leave Request
            </Button>
          </SheetTrigger>
          <Button variant="outline">
            <HugeiconsIcon icon={FilterIcon} className="size-4" />
            Filter
          </Button>
        </div>
      </div>

      <form id="leave-request-form" onSubmit={form.handleSubmit(onSubmit)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>File a Leave Request</SheetTitle>
            <SheetDescription>
              Fill in the details below to file your leave request.
            </SheetDescription>
          </SheetHeader>
          <div className="grid flex-1 auto-rows-min gap-6 px-6 py-4">
            <FieldSet>
              <FieldGroup>
                <Controller
                  name="leave_type"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor="leave_type">Leave Type</FieldLabel>
                      <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                        onOpenChange={(open) => {
                          if (!open) field.onBlur()
                        }}
                      >
                        <SelectTrigger
                          id="leave_type"
                          ref={field.ref}
                          className="w-full"
                          aria-invalid={fieldState.invalid}
                          autoFocus
                        >
                          <SelectValue placeholder="Select leave" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Common Leaves</SelectLabel>
                            <SelectItem value="VL">Vacation Leave</SelectItem>
                            <SelectItem value="SL">Sick Leave</SelectItem>
                            <SelectItem value="EL">Emergency Leave</SelectItem>
                          </SelectGroup>
                          <SelectSeparator />
                          <SelectGroup>
                            <SelectLabel>Special Leaves</SelectLabel>
                            <SelectItem value="ML">Maternity Leave</SelectItem>
                            <SelectItem value="PL">Paternity Leave</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {fieldState.error && (
                        <FieldError>{fieldState.error.message}</FieldError>
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="start_date"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor="start_date">Start Date</FieldLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            id="start_date"
                            ref={field.ref}
                            className="justify-start font-normal"
                            aria-invalid={fieldState.invalid}
                          >
                            <HugeiconsIcon
                              icon={Calendar03Icon}
                              className="size-4 text-muted-foreground"
                            />
                            {startDate ? (
                              format(startDate, "yyyy-MM-dd")
                            ) : (
                              <span>Pick start date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={startDate}
                            onSelect={(day) => {
                              setStartDate(day)
                              field.onChange(
                                day ? format(day, "yyyy-MM-dd") : ""
                              )
                              if (day && endDate && endDate < day) {
                                setEndDate(undefined)
                                form.setValue("end_date", "", {
                                  shouldValidate: true,
                                })
                              }
                            }}
                            defaultMonth={startDate}
                            disabled={{
                              before: new Date(Date.now() - 864e5),
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                      {fieldState.error && (
                        <FieldError>{fieldState.error.message}</FieldError>
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="end_date"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor="end_date">End Date</FieldLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            id="end_date"
                            ref={field.ref}
                            className="justify-start font-normal"
                            aria-invalid={fieldState.invalid}
                          >
                            <HugeiconsIcon
                              icon={Calendar03Icon}
                              className="size-4 text-muted-foreground"
                            />
                            {endDate ? (
                              format(endDate, "yyyy-MM-dd")
                            ) : (
                              <span>Pick end date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={endDate}
                            onSelect={(day) => {
                              setEndDate(day)
                              field.onChange(
                                day ? format(day, "yyyy-MM-dd") : ""
                              )
                            }}
                            defaultMonth={endDate ?? startDate}
                            disabled={{
                              before: startDate ?? new Date(Date.now() - 864e5),
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                      {fieldState.error && (
                        <FieldError>{fieldState.error.message}</FieldError>
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="reason"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor="reason">Reason</FieldLabel>
                      <Textarea
                        {...field}
                        id="reason"
                        autoComplete="reason"
                        placeholder="Enter reason for leave"
                        aria-invalid={fieldState.invalid}
                        className="h-32 resize-none"
                      />
                      {fieldState.error && (
                        <FieldError>{fieldState.error.message}</FieldError>
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </FieldSet>
          </div>
          <SheetFooter>
            <Button type="submit" form="leave-request-form">
              Submit Request
            </Button>
            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </form>
    </Sheet>
  )
}
