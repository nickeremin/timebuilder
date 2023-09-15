"use client"

import { useRef, useState } from "react"

import { Icons } from "@/shared/components/Icons"
import { Button } from "@/shared/components/ui/button"
import { formatTime, getSecondsFromInterval } from "@/shared/lib/utils"
import { useBoundStore } from "@/shared/state"
import { Todo } from "@/shared/types"

interface TodoTimerProps {
  todo: Todo
}

const TodoTimer = ({ todo }: TodoTimerProps) => {
  const {
    currentRunningTodo,
    setCurrentRunningTodo,
    isPaused,
    setIsPaused,
    timerRefInterval,
    setTimerRefInterval,
  } = useBoundStore((state) => state)

  const [secondsLeft, setSecondsLeft] = useState(
    getSecondsFromInterval(todo.plannedTime)
  )

  const handlePlay = () => {
    if (currentRunningTodo !== todo) {
      if (timerRefInterval) clearInterval(timerRefInterval)
    }

    setIsPaused(false)
    setCurrentRunningTodo(todo)
    setTimerRefInterval(
      setInterval(() => {
        if (secondsLeft > 0) setSecondsLeft((s) => s - 1)
        else handlePause
      }, 1000)
    )
  }

  const handlePause = () => {
    if (currentRunningTodo === todo) {
      setIsPaused(true)
      setCurrentRunningTodo(null)
      if (timerRefInterval) clearInterval(timerRefInterval)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <p className="rounded bg-blue-100 p-4 text-xl text-blue-900">
          Planned time: {todo.plannedTime}
        </p>
        <div className="flex items-center justify-between rounded bg-green-100 p-4 text-xl text-green-900">
          Seconds left: {formatTime(secondsLeft)}
          <div className="flex gap-2">
            <Button onClick={handlePlay}>Play</Button>
            <Button onClick={handlePause}>Pause</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default TodoTimer
