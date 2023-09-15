import { Suspense } from "react"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { ErrorBoundary } from "react-error-boundary"

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { ErrorTodoList } from "@/widgets/errors"
import { TodoLists } from "@/widgets/todos"

const BuildersPage = async () => {
  const session = await getServerSession(authOptions)

  if (!session) redirect("/auth/signin")

  const user = session.user

  return (
    <div className="flex flex-col gap-8 p-4">
      <h1 className="text-2xl font-semibold">All Builders</h1>
      <ErrorBoundary FallbackComponent={ErrorTodoList}>
        <Suspense fallback={<p>Loading...</p>}>
          <TodoLists userId={user.id} />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

export default BuildersPage
