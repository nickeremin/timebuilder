import React from "react"

import {
  formatTime,
  getSecondsFromInterval,
  getTimeFromTodoList,
} from "@/shared/lib/utils"
import { useBoundStore } from "@/shared/state"

const TodoListToolbar = () => {
  const {
    currentTodoList,
    activeTodoList,
    setCurrentTodoList,
    setActiveTodoList,
  } = useBoundStore((state) => state)

  if (!currentTodoList) return null

  const allPlannedTime = getTimeFromTodoList(currentTodoList.todos)

  return (
    <div className="flex w-fit rounded bg-blue-200 p-4">
      <p className="font-semibold">
        Time: {formatTime(Number(allPlannedTime))}
      </p>
    </div>
  )
}

export default TodoListToolbar
