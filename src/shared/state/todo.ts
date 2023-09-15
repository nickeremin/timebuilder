import { useRef } from "react"
import { StateCreator } from "zustand"

import { Todo } from "../types"

export interface TodoSlice {
  activeTodo: Todo | null
  setActiveTodo: (payload: Todo | null) => void
}

export interface TodoTimerSlice {
  currentRunningTodo: Todo | null
  isPaused: boolean
  timerRefInterval: NodeJS.Timeout | null
  setCurrentRunningTodo: (todo: Todo | null) => void
  setIsPaused: (mode: boolean) => void
  setTimerRefInterval: (interval: NodeJS.Timeout | null) => void
}

export const createTodoSlice: StateCreator<TodoSlice, [], [], TodoSlice> = (
  set
) => ({
  activeTodo: null,
  setActiveTodo: (payload) => set((state) => ({ activeTodo: payload })),
})

export const createTodoTimerSlice: StateCreator<
  TodoTimerSlice,
  [],
  [],
  TodoTimerSlice
> = (set) => ({
  currentRunningTodo: null,
  isPaused: true,
  timerRefInterval: null,
  setCurrentRunningTodo: (todo) =>
    set((state) => ({ currentRunningTodo: todo })),
  setIsPaused: (mode) => set((state) => ({ isPaused: mode })),
  setTimerRefInterval: (interval) =>
    set((state) => ({ timerRefInterval: interval })),
})
