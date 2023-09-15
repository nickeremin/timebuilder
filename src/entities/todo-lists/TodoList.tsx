"use client"

import React from "react"

import { trpc } from "@/app/_trpc/client"
import { TodoCard } from "@/entities/todos"

interface TodoListProps {
  todoListId: string
}

const TodoList = ({ todoListId }: TodoListProps) => {
  const { data: todoList } = trpc.todoList.getTodoListById.useQuery(
    { todoListId },
    { suspense: true }
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-8">
        {todoList?.todos.map((todo) => <TodoCard key={todo.id} todo={todo} />)}
      </div>
    </div>
  )
}

export default TodoList
