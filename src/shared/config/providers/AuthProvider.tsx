"use client"

import { SessionProvider, type SessionProviderProps } from "next-auth/react"

const AuthProvider = ({ children }: SessionProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>
}

export default AuthProvider
