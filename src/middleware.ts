import { NextResponse } from "next/server"
import {
  NextMiddlewareWithAuth,
  NextRequestWithAuth,
  withAuth,
} from "next-auth/middleware"

export default withAuth(
  (req: NextRequestWithAuth) => {
    // console.log(req.nextUrl.pathname)
    // console.log(req.nextauth.token)
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = { matcher: ["/extra", "/client"] }
