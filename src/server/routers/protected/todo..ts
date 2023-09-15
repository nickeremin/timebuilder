import { protectedProcedure, router } from "@/server/trpc"
import * as z from "zod"

import {
  createTodo,
  getTodosByTodoListId,
  getTodosByUserId,
} from "@/app/_actions/todo"
import { todoSchema } from "@/shared/lib/validations/todo"

export const todoRouter = router({
  // Todo mutations
  createTodo: protectedProcedure
    .input(
      todoSchema
        .pick({ description: true, plannedTime: true })
        .extend({ todoListId: z.string() })
    )
    .mutation(async ({ input }) => {
      return await createTodo({ ...input })
    }),
  // Todo queries
  getTodosByUserId: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      return await getTodosByUserId(input.userId)
    }),
  getTodosByTodoListId: protectedProcedure
    .input(z.object({ todoListId: z.string() }))
    .query(async ({ input }) => {
      return await getTodosByTodoListId(input.todoListId)
    }),
})
