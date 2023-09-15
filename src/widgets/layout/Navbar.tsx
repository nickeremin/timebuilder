"use client"

import Link from "next/link"
import { signOut } from "next-auth/react"

import { Button } from "@/shared/components/ui/button"

const Navbar = () => {
  return (
    <div className="flex h-full items-center justify-center gap-8">
      <Link href="/auth/signin">Sign In</Link>
      <Link href="/auth/signup">Sign Up</Link>
      <Link href="/auth/signin">Verify Email</Link>
      <Button onClick={() => signOut()}>Sign Out</Button>
    </div>
  )
}

export default Navbar
