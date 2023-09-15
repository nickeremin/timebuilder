import NextAuth, { DefaultSession, DefaultUser } from "next-auth"
import { DefaultJWT, JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string
      role?: string
      emailVerified: Date | null
    }
  }

  interface User extends DefaultUser {
    role?: string
    emailVerified: Date | null
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role?: string
    emailVerified: Date | null
  }
}
