"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { Todo } from "@/shared/types"

import { TodoTimer } from "../timers"

interface TodoCardProps {
  todo: Todo
}

const TodoCard = ({ todo }: TodoCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Todo Card</CardTitle>
        <CardDescription>{todo.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <TodoTimer todo={todo} />
      </CardContent>
    </Card>
  )
}

export default TodoCard
