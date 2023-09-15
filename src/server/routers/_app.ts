import { router } from "../trpc"
import { todoListRouter } from "./protected/todo-list"
import { todoRouter } from "./protected/todo."

export const appRouter = router({
  todo: todoRouter,
  todoList: todoListRouter,
})

export type AppRouter = typeof appRouter
