import { clsx, type ClassValue } from "clsx"
import { toast } from "sonner"
import { twMerge } from "tailwind-merge"
import * as z from "zod"

import { Todo } from "../types"

//import { AuthError } from "../errors"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  const formattedHours = hours.toString().padStart(2, "0")
  const formattedMinutes = minutes.toString().padStart(2, "0")
  const formattedSeconds = remainingSeconds.toString().padStart(2, "0")

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
}

export const getSecondsFromInterval = (interval: string) => {
  const timeArr = interval.split(":").reverse()
  return timeArr.reduce(
    (time, item, index) => time + Math.pow(60, index) * parseInt(item),
    0
  )
}

export const getTimeFromTodoList = (todos: Todo[]) => {
  return todos.reduce(
    (time, todo) => time + getSecondsFromInterval(todo.plannedTime),
    0
  )
}

export const handleError = (error: unknown) => {
  const unknownError = "Something went wrong, please try again later."

  if (error instanceof z.ZodError) {
    const errors = error.issues.map((issue) => {
      return issue.message
    })
    return toast(errors.join("\n"))
  } else if (error instanceof Error) {
    return toast(error.message)
  } else {
    return toast(unknownError)
  }
}

export const handleAuthError = (error: unknown) => {
  const unknownError = "Something went wrong, please try again later."

  if (error instanceof z.ZodError) {
    const errors = error.issues.map((issue) => {
      return issue.message
    })
    return toast(errors.join("\n"))
    // } else if (error instanceof AuthError) {
    //   return toast(error.message)
  } else if (error instanceof Error) {
    return toast(error.message)
  } else {
    return toast(unknownError)
  }
}
