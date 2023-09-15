import { ColumnDef } from "@tanstack/react-table"

import { Todo } from "@/shared/types"

export const todoColumns: ColumnDef<Todo>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "todoListId",
    header: "Builder ID",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "plannedTime",
    header: "Planned Time",
  },
]
