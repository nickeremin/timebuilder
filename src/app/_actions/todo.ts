"use server"

import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"
import { v4 as uuidv4 } from "uuid"

import { db } from "@/shared/db"
import {
  InsertTodo,
  SelectTodo,
  todoLists,
  todos,
  users,
} from "@/shared/db/schema"
import { Todo, TodoList } from "@/shared/types"

import { authOptions } from "../api/auth/[...nextauth]/route"

export const getTodosByUserId = async (userId: string) => {
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
    with: {
      todoLists: {
        with: {
          todos: true,
        },
      },
    },
  })

  if (!user) throw new Error("User not found!")

  const allTodos = user.todoLists.flatMap((todoList) => todoList.todos)

  return allTodos
}

export const getTodosByTodoListId = async (todoListId: string) => {
  const todoList = await db.query.todoLists.findFirst({
    where: eq(todoLists.id, todoListId),
    with: {
      todos: true,
    },
  })

  if (!todoList) throw new Error("Builder not found!")

  return todoList.todos
}

export const createTodo = async ({
  todoListId,
  description,
  plannedTime,
}: Omit<InsertTodo, "id">) => {
  const session = await getServerSession(authOptions)

  if (!session?.user) throw new Error("User is not authorized!")

  await db.insert(todos).values({
    id: uuidv4(),
    todoListId,
    description,
    plannedTime,
  })
}
