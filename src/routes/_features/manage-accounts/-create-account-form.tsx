import * as z from "zod"
import { toast } from "sonner"
import { Controller, useForm } from "react-hook-form"
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Copy01Icon,
  Loading03Icon,
  UserAdd01Icon,
} from "@hugeicons/core-free-icons"
import { CreateAccountSchema } from "@/schemas/auth-schema"
import { useCreateAccount } from "@/hooks/useAccounts"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
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

type FormData = z.infer<typeof CreateAccountSchema>

interface CreateAccountFormProps {
  onSuccess?: () => void
}

export default function CreateAccountForm({
  onSuccess,
}: CreateAccountFormProps) {
  const { mutate: createAccount, isPending } = useCreateAccount()

  const form = useForm<FormData>({
    resolver: standardSchemaResolver(CreateAccountSchema),
    defaultValues: {
      email: "",
      password: "",
      role: undefined,
    },
  })

  const onSubmit = (data: FormData) => {
    createAccount(data, { onSuccess })
  }

  const copyTemporaryPassword = async (value: string) => {
    if (!value.trim()) {
      toast.error("Generate or enter a temporary password first")
      return
    }
    try {
      await navigator.clipboard.writeText(value)
      toast.success("Temporary password copied")
    } catch {
      toast.error("Could not copy to clipboard")
    }
  }

  const generateTemporaryPassword = (): string => {
    const digits = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")
    return `stellar@${digits}`
  }

  return (
    <div className="mt-2">
      <form id="create-account-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldSet>
          <FieldGroup>
            <Controller
              name="role"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="role">Role</FieldLabel>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                    onOpenChange={(open) => {
                      if (!open) field.onBlur()
                    }}
                  >
                    <SelectTrigger
                      id="role"
                      ref={field.ref}
                      className="w-full max-w-45"
                      aria-invalid={fieldState.invalid}
                      autoFocus
                      tabIndex={1}
                    >
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Admin</SelectLabel>
                        <SelectItem value="leadership">Leadership</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="developer">
                          Platform Developer
                        </SelectItem>
                        <SelectItem value="support">Support</SelectItem>
                      </SelectGroup>
                      <SelectSeparator />
                      <SelectGroup>
                        <SelectLabel>Normal User</SelectLabel>
                        <SelectItem value="lead">Team Lead</SelectItem>
                        <SelectItem value="ic">
                          Individual Contributor
                        </SelectItem>
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
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    autoComplete="email"
                    placeholder="Enter account email"
                    aria-invalid={fieldState.invalid}
                    tabIndex={2}
                  />
                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <div className="flex items-center">
                    <FieldLabel htmlFor="password">
                      Temporary Password
                    </FieldLabel>
                    <Button
                      type="button"
                      variant="link"
                      className="ml-auto"
                      onClick={() =>
                        field.onChange(generateTemporaryPassword())
                      }
                    >
                      Generate Password
                    </Button>
                  </div>
                  <div className="relative">
                    <Input
                      {...field}
                      id="password"
                      type="text"
                      autoComplete="off"
                      placeholder="User temporary password"
                      aria-invalid={fieldState.invalid}
                      maxLength={30}
                      tabIndex={3}
                    />

                    <Button
                      variant="link"
                      type="button"
                      className="absolute right-0 p-1.5 text-muted-foreground"
                      onClick={() => copyTemporaryPassword(field.value)}
                      aria-label="Copy temporary password"
                    >
                      <HugeiconsIcon icon={Copy01Icon} className="size-4" />
                    </Button>
                  </div>
                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </FieldSet>

        <Button
          type="submit"
          form="create-account-form"
          className="mt-4 w-full font-semibold"
          disabled={isPending}
          tabIndex={4}
        >
          {isPending ? (
            <>
              <HugeiconsIcon
                icon={Loading03Icon}
                className="size-4 animate-spin"
              />
              Creating account...
            </>
          ) : (
            <>
              <HugeiconsIcon icon={UserAdd01Icon} className="size-4" />
              Create new Account
            </>
          )}
        </Button>
      </form>
    </div>
  )
}
