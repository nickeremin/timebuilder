"use server"

import { and, eq, gt } from "drizzle-orm"
import { v4 as uuidv4 } from "uuid"

import { adapter, db } from "@/shared/db"
import { users, verificationTokens } from "@/shared/db/schema"
import { AuthError } from "@/shared/errors"
import {
  comparePassword,
  createRandomTokenString,
  encodePassword,
} from "@/shared/lib/helpers/auth"

export const registerUser = async (email: string, password: string) => {
  const isUserRegistered = await db.query.users.findFirst({
    where: eq(users.email, email),
  })

  if (isUserRegistered)
    throw new AuthError("User with this email is already registred!")

  const hashedPassword = encodePassword(password)

  const createdUsers = await db
    .insert(users)
    .values({
      id: uuidv4(),
      name: `User-${uuidv4().replace(/-/g, "").substring(0, 6)}`,
      email,
      role: "user",
      hashedPassword,
    })
    .returning()

  if (!createdUsers[0])
    throw new AuthError("An error occurred while registering a user!")

  return createdUsers[0]
}

export const loginUser = async (email: string, password: string) => {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  })

  if (!user) throw new AuthError("No user found with this email!")

  const isPasswordEqual = comparePassword(
    password,
    user.hashedPassword as string
  )

  if (!isPasswordEqual)
    throw new AuthError("Invalid password or email, please try again.")

  return user
}

export const checkEmail = async (email: string) => {
  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  })

  if (!existingUser) throw new AuthError("User with this email not found!")
}

export const verifyEmail = async (token: string) => {
  const verificationToken = await db.query.verificationTokens.findFirst({
    where: and(
      eq(verificationTokens.token, token),
      gt(verificationTokens.expires, new Date())
    ),
  })

  if (!verificationToken) throw new AuthError("Invalid verify email token!")

  const updatedUsers = await db
    .update(users)
    .set({
      emailVerified: new Date(),
    })
    .where(eq(users.id, verificationToken.identifier))
    .returning()

  if (!updatedUsers[0])
    throw new AuthError("An error occurred while verifying your email!")
}

export const resetPassword = async (token: string, password: string) => {
  const verificationToken = await db.query.verificationTokens.findFirst({
    where: and(
      eq(verificationTokens.token, token),
      gt(verificationTokens.expires, new Date())
    ),
  })

  if (!verificationToken) throw new AuthError("Invalid reset password token!")

  const hashedPassword = encodePassword(password)

  const updatedUsers = await db
    .update(users)
    .set({
      hashedPassword,
    })
    .where(eq(users.email, verificationToken.identifier))
    .returning()

  if (!updatedUsers[0])
    throw new AuthError("An error occurred while changing the password!")
}

export const createVerificationToken = async (identifier: string) => {
  const verificationToken = await adapter.createVerificationToken?.({
    identifier,
    token: createRandomTokenString(64),
    expires: new Date(Date.now() + 60 * 60 * 1000),
  })

  if (!verificationToken) throw new AuthError("Token not created!")

  return verificationToken.token
}

export const deleteVerificationToken = async (token: string) => {
  const deletedVerificationTokens = await db
    .delete(verificationTokens)
    .where(eq(verificationTokens.token, token))
    .returning()

  if (!deletedVerificationTokens[0]) throw new AuthError("Token not deleted!")
}
