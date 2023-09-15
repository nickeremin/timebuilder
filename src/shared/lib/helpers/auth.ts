import bcrypt from "bcrypt"
import { v4 as uuidv4 } from "uuid"

export const generateSessionToken = () => {
  return uuidv4()
}

export const fromDate = (time: number, date = Date.now()) => {
  return new Date(time * 1000 + date)
}

export const createRandomTokenString = (length: number) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"
  const charactersLength = characters.length

  let token = ""
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength)
    token += characters.charAt(randomIndex)
  }

  return token
}

export const encodePassword = (password: string) => {
  return bcrypt.hashSync(password, 10)
}

export const comparePassword = (password: string, hashedPassword: string) => {
  return bcrypt.compareSync(password, hashedPassword)
}
