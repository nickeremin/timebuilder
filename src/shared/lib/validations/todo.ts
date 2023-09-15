import * as z from "zod"

export const todoListSchema = z.object({
  description: z.string(),
})

export const todoSchema = z.object({
  description: z.string(),
  hours: z.string(),
  minutes: z.string(),
  seconds: z.string(),
  plannedTime: z.string(),
})
