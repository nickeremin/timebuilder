"use client"

import React, { useRef } from "react"

import { Button } from "@/shared/components/ui/button"
import { useBoundStore } from "@/shared/state"
import { TodoList } from "@/shared/types"

interface TodoListTimerProps {
  todoList: TodoList
}

const TodoListTimer = ({ todoList }: TodoListTimerProps) => {
  const { activeTodoList, setActiveTodoList } = useBoundStore()
  const todoTimer = useRef<ReturnType<typeof setInterval> | null>(null)

  const handlePlay = () => {
    todoTimer.current = setInterval(() => {}, 1000)
  }

  const handlePause = () => {
    if (todoTimer.current) clearInterval(todoTimer.current)
  }

  return (
    <div className="flex w-fit items-center gap-4 rounded bg-blue-100 p-4">
      <p className="text-xl font-semibold text-blue-800">
        {JSON.stringify(activeTodoList?.id)}
      </p>
      <Button onClick={() => setActiveTodoList(todoList)}>Set Builder</Button>
      <Button onClick={() => setActiveTodoList(null)}>Delete Builder</Button>
    </div>
  )
}

export default TodoListTimer
