"use client"

import { useEffect, useState } from "react"
import dayjs from "dayjs"

import { Icons } from "@/shared/components/Icons"
import { Button } from "@/shared/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/shared/components/ui/card"
import { formatTime } from "@/shared/lib/utils"

interface TimerProps {
  seconds: number
}

const Timer = ({ seconds }: TimerProps) => {
  const [secondsLeft, setSecondsLeft] = useState(seconds)
  const [isPaused, setIsPaused] = useState(true)

  const tick = () => {
    setSecondsLeft((prev) => prev - 1)
  }

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        tick()
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [isPaused])

  return (
    <Card>
      <CardHeader>Timer</CardHeader>
      <CardContent>{formatTime(secondsLeft)}</CardContent>
      <CardFooter className="flex gap-4">
        <Button size="icon" onClick={() => setIsPaused((prev) => !prev)}>
          {isPaused ? <Icons.play /> : <Icons.pause />}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default Timer
