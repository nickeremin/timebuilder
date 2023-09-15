import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"

import { CreateTodoForm } from "@/features/forms"
import { TodoList, TodoListHeader, TodoListShell } from "@/entities/todo-lists"

interface BuilderPageProps {
  params: {
    todoListId: string
  }
}

const BuilderPage = ({ params }: BuilderPageProps) => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-semibold">Manage your builder</h1>
      <TodoListShell>
        <ErrorBoundary fallback={<p>Something went wrong...</p>}>
          <Suspense fallback={<p>Loading...</p>}>
            <TodoListHeader todoListId={params.todoListId} />
          </Suspense>
        </ErrorBoundary>
        <CreateTodoForm todoListId={params.todoListId} />
        <ErrorBoundary fallback={<p>Something went wrong...</p>}>
          <Suspense fallback={<p>Loading...</p>}>
            <TodoList todoListId={params.todoListId} />
          </Suspense>
        </ErrorBoundary>
      </TodoListShell>
    </div>
  )
}

export default BuilderPage
