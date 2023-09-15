import { protectedProcedure, router } from "@/server/trpc"
import * as z from "zod"

import {
  createTodoList,
  getTodolistById,
  getTodoListsByUserId,
} from "@/app/_actions/todo-list"
import { todoListSchema } from "@/shared/lib/validations/todo"

export const todoListRouter = router({
  // Todo list mutations
  createTodoList: protectedProcedure
    .input(todoListSchema.extend({ userId: z.string() }))
    .mutation(async ({ input }) => {
      return await createTodoList({ ...input })
    }),
  // Todo list queries
  getTodoListById: protectedProcedure
    .input(z.object({ todoListId: z.string() }))
    .query(async ({ input }) => {
      return await getTodolistById(input.todoListId)
    }),
  getTodoListsByUserId: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      return await getTodoListsByUserId(input.userId)
    }),
})
