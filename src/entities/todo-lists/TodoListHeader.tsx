"use client"

import { useEffect } from "react"

import { trpc } from "@/app/_trpc/client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { useBoundStore } from "@/shared/state"

import { TodoListTimer } from "../timers"
import TodoListToolbar from "./TodoListToolbar"

interface TodoListHeaderProps {
  todoListId: string
}

const TodoListHeader = ({ todoListId }: TodoListHeaderProps) => {
  const { data: todoList } = trpc.todoList.getTodoListById.useQuery(
    {
      todoListId,
    },
    {
      suspense: true,
    }
  )

  const { currentTodoList, setCurrentTodoList } = useBoundStore(
    (state) => state
  )

  if (!todoList) return null

  useEffect(() => {
    setCurrentTodoList(todoList)
  }, [todoList])

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Builder name placeholder</CardTitle>
        <CardDescription>{todoList.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <TodoListToolbar />
        <TodoListTimer todoList={todoList} />
      </CardContent>
    </Card>
  )
}

export default TodoListHeader
