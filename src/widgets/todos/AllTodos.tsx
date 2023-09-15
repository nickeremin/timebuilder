"use client"

import { trpc } from "@/app/_trpc/client"
import { TodoCard } from "@/entities/todos"

interface AllTodosProps {
  userId: string
}

const AllTodos = ({ userId }: AllTodosProps) => {
  const { data: todos } = trpc.todo.getAllTodosByUserId.useQuery(
    {
      userId,
    },
    { suspense: true }
  )

  return (
    <div className="flex flex-col gap-4">
      {todos?.map((todo, index) => (
        <TodoCard
          key={index}
          description={todo.description}
          plannedTime={todo.plannedTime}
        />
      ))}
    </div>
  )
}

export default AllTodos
