import { NextRequest, NextResponse } from "next/server"

import { EmailTemplate } from "@/shared/components/emails/templates"
import { resend } from "@/shared/config/resend"
import { handleError } from "@/shared/lib/utils"

export const POST = async (req: NextRequest) => {
  const { email, token } = await req.json()

  // Sending verification link to email
  try {
    const data = await resend.emails.send({
      from: "timebuilder@dall-e-clone.com",
      to: email,
      subject: "Verification Link",
      react: EmailTemplate({
        token,
        url: "http://localhost:3000/auth/verify-email",
        name: "Click to verify email",
      }),
    })

    console.log(data)

    return NextResponse.json(data)
  } catch (error) {
    handleError(error)
  }
}
