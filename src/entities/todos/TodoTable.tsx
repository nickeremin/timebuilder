"use client"

import React from "react"

import { trpc } from "@/app/_trpc/client"
import DataTable from "@/shared/components/data-table/data-table"
import { todoColumns } from "@/shared/components/data-table/data-table-columns"

interface TodoTableProps {
  userId: string
}

const TodoTable = ({ userId }: TodoTableProps) => {
  const { data: todos } = trpc.todo.getAllTodosByUserId.useQuery(
    {
      userId,
    },
    {
      suspense: true,
    }
  )

  return (
    <div className="container">
      <DataTable columns={todoColumns} data={todos!} pageCount={1} />
    </div>
  )
}

export default TodoTable
