import * as z from "zod"
import { useState } from "react"
import { toast } from "sonner"
import { Controller, useForm } from "react-hook-form"
import { createFileRoute, Link } from "@tanstack/react-router"
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Loading03Icon,
  ViewIcon,
  ViewOffIcon,
} from "@hugeicons/core-free-icons"
import { useSignIn } from "@/hooks/useSupabaseAuth"
import { LoginSchema } from "@/schemas/auth-schema"
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type FormData = z.infer<typeof LoginSchema>

export const Route = createFileRoute("/auth/signin")({
  component: RouteComponent,
})

function RouteComponent() {
  const signInWithEmail = useSignIn()
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const form = useForm<FormData>({
    resolver: standardSchemaResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: FormData) => {
    try {
      await signInWithEmail.mutateAsync(data)
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      )
    }
  }

  return (
    <Card className="px-4 py-6">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-bold">
          Login to your account
        </CardTitle>
        <CardDescription className="text-sm">
          Sign in to your stellar account to continue
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form id="signin-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldSet>
            <FieldGroup>
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
                      placeholder="Enter your email"
                      aria-invalid={fieldState.invalid}
                      autoFocus
                      tabIndex={1}
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
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <Link
                        className="ml-auto text-muted-foreground underline-offset-2 hover:underline"
                        to="/auth/signin"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                        {...field}
                        id="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="off"
                        placeholder="Enter your password"
                        aria-invalid={fieldState.invalid}
                        tabIndex={2}
                      />

                      <button
                        type="button"
                        className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {!showPassword ? (
                          <HugeiconsIcon
                            icon={ViewOffIcon}
                            strokeWidth={2}
                            className="h-4 w-4"
                          />
                        ) : (
                          <HugeiconsIcon
                            icon={ViewIcon}
                            strokeWidth={2}
                            className="h-4 w-4"
                          />
                        )}
                      </button>
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
            form="signin-form"
            disabled={signInWithEmail.isPending}
            className="mt-4 w-full font-semibold"
          >
            {signInWithEmail.isPending && (
              <HugeiconsIcon
                icon={Loading03Icon}
                strokeWidth={2}
                className="h-4 w-4 animate-spin"
              />
            )}{" "}
            {signInWithEmail.isPending ? "Signing in" : "Sign in"}
          </Button>
        </form>
      </CardContent>

      <p className="text-center text-muted-foreground">
        Don't have an account?{" "}
        <Link to="/" className="text-primary hover:underline">
          Request a new account
        </Link>
        .
      </p>
    </Card>
  )
}
