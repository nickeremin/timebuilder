"use client"

import React from "react"
import { useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"

import { SignInForm } from "@/features/forms"
import { Button } from "@/shared/components/ui/button"

const SignInPage = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"

  return (
    <div>
      {/* <Button
        onClick={() =>
          signIn("discord", {
            redirect: false,
            callbackUrl,
          })
        }
      >
        Google
      </Button> */}
      <SignInForm />
    </div>
  )
}

export default SignInPage
