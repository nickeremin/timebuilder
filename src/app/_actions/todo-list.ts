"use server"

import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"
import { v4 as uuidv4 } from "uuid"

import { db } from "@/shared/db"
import { InsertTodoList, todoLists, users } from "@/shared/db/schema"
import { TodoList } from "@/shared/types"

import { authOptions } from "../api/auth/[...nextauth]/route"

export const getTodolistById = async (todoListId: string) => {
  const todoList = await db.query.todoLists.findFirst({
    where: eq(todoLists.id, todoListId),
    with: {
      todos: true,
    },
  })

  if (!todoList) throw new Error("Builder not found!")

  return todoList
}

export const getTodoListsByUserId = async (userId: string) => {
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
    with: {
      todoLists: true,
    },
  })

  if (!user) throw new Error("User not found!")

  return user.todoLists
}

export const createTodoList = async ({
  description,
}: Pick<InsertTodoList, "description">) => {
  const session = await getServerSession(authOptions)

  if (!session?.user) throw new Error("User is not authorized!")

  const userId = session.user.id

  await db.insert(todoLists).values({
    id: uuidv4(),
    userId,
    description,
  })
}
