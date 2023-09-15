"use client"

import { useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { deleteVerificationToken, resetPassword } from "@/app/_actions/auth"
import { Icons } from "@/shared/components/Icons"
import { Button } from "@/shared/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form"
import { PasswordInput } from "@/shared/components/ui/password-input"
import { handleAuthError } from "@/shared/lib/utils"
import { resetPasswordSchema } from "@/shared/lib/validations/auth"

type Inputs = z.infer<typeof resetPasswordSchema>

const ResetPasswordStep2Form = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  // Initializing react-hook-form with zod
  const form = useForm<Inputs>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  const token = searchParams.get("token") || ""
  const callbackUrl = searchParams.get("callbackUrl") || "/"

  const onSubmit = ({ password }: Inputs) => {
    try {
      startTransition(async () => {
        await resetPassword(token, password)
        await deleteVerificationToken(token)
        toast.success("Password changed successufuly!")
        router.push(callbackUrl)
      })
    } catch (error) {
      handleAuthError(error)
    }
  }
  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Create new password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Confirm new password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending}>
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Reset Password
          <span className="sr-only">Reset password</span>
        </Button>
      </form>
    </Form>
  )
}

export default ResetPasswordStep2Form
