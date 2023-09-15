import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { Session, type AuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"

import { loginUser } from "@/app/_actions/auth"
import { env } from "@/shared/components/env.mjs"
import { db } from "@/shared/db"

export const authOptions: AuthOptions = {
  adapter: DrizzleAdapter(db),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "awesomeuser@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null

        const user = await loginUser(credentials.email, credentials.password)

        if (!user) return null

        return user
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ account, token, user }) => {
      if (user)
        return {
          ...token,
          role: user.role,
          emailVerified: user.emailVerified,
        }
      return token
    },
    session: async ({ session, token, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          role: token.role,
          emailVerified: token.emailVerified,
        },
      }
    },
  },
  secret: env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
