"use client"

import Link from "next/link"

import { trpc } from "@/app/_trpc/client"
import TodoListPreview from "@/entities/todo-lists/TodoListPreview"

interface TodoListsProps {
  userId: string
}

const TodoLists = ({ userId }: TodoListsProps) => {
  const { data: todoLists } = trpc.todoList.getTodoListsByUserId.useQuery(
    { userId },
    {
      suspense: true,
    }
  )

  return (
    <div className="flex flex-col gap-4">
      {todoLists?.map((todoList, index) => (
        <Link key={index} href={`/dashboard/builders/${todoList.id}`}>
          <TodoListPreview
            id={todoList.id}
            description={todoList.description}
          />
        </Link>
      ))}
    </div>
  )
}

export default TodoLists
