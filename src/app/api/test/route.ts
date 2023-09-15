import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { decode, getToken } from "next-auth/jwt"

import { env } from "@/shared/components/env.mjs"

export const GET = async (req: NextRequest) => {
  const cockieStore = cookies()
  const encodedToken = cockieStore.get("next-auth.session-token")?.value
  const decodedToken = await decode({
    token: encodedToken,
    secret: env.NEXTAUTH_SECRET,
  })
  console.log(decodedToken)
  //const token = await getToken({ req, secret: env.NEXTAUTH_SECRET })

  return NextResponse.json(decodedToken)
}
