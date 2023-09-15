import { StateCreator } from "zustand"

import { TodoList } from "../types"

export interface TodoListSlice {
  activeTodoList: TodoList | null
  currentTodoList: TodoList | null
  setActiveTodoList: (payload: TodoList | null) => void
  setCurrentTodoList: (payload: TodoList | null) => void
}

export const createTodoListSlice: StateCreator<
  TodoListSlice,
  [],
  [],
  TodoListSlice
> = (set) => ({
  activeTodoList: null,
  currentTodoList: null,
  setActiveTodoList: (payload) => set((state) => ({ activeTodoList: payload })),
  setCurrentTodoList: (payload) =>
    set((state) => ({ currentTodoList: payload })),
})
