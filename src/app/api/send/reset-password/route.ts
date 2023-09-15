import { NextRequest, NextResponse } from "next/server"

import EmailTemplate from "@/features/emails/EmailTemplate"
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
        url: "http://localhost:3000/auth/signin/reset-password/step2",
        name: "Click to change password",
      }),
    })

    console.log(data)

    return NextResponse.json(data)
  } catch (error) {
    handleError(error)
  }
}
