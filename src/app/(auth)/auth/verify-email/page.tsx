"use client"

import React, { useEffect, useTransition } from "react"
import { useSearchParams } from "next/navigation"
import { toast } from "sonner"

import { deleteVerificationToken, verifyEmail } from "@/app/_actions/auth"
import { handleAuthError } from "@/shared/lib/utils"

const VerifyEmailPage = () => {
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const token = searchParams.get("token") as string

  useEffect(() => {
    startTransition(async () => {
      try {
        await verifyEmail(token)
        await deleteVerificationToken(token)
        toast.success("Email verified successfuly!")
      } catch (error) {
        handleAuthError(error)
      }
    })
  }, [token])

  return <div>{isPending ? <p>Loading...</p> : <p>Verificated</p>}</div>
}

export default VerifyEmailPage
