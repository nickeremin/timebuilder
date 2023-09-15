import { mountStoreDevtool } from "simple-zustand-devtools"
import { create } from "zustand"

import {
  createTodoSlice,
  createTodoTimerSlice,
  TodoSlice,
  TodoTimerSlice,
} from "./todo"
import { createTodoListSlice, TodoListSlice } from "./todo-list"

export const useBoundStore = create<
  TodoListSlice & TodoSlice & TodoTimerSlice
>()((...a) => ({
  ...createTodoListSlice(...a),
  ...createTodoSlice(...a),
  ...createTodoTimerSlice(...a),
}))

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("useBoundStore", useBoundStore)
}
