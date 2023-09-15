import { Suspense } from "react"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { ErrorBoundary } from "react-error-boundary"

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { TodoTable } from "@/entities/todos"

const StatisticsPage = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.user) redirect("/auth/signin")

  const user = session.user

  return (
    <div className="flex flex-col gap-8 p-4">
      <h1 className="text-2xl font-semibold">All Times</h1>
      <ErrorBoundary fallback={<p>Something went wrong...</p>}>
        <Suspense fallback={<p>Loading...</p>}>
          <TodoTable userId={user.id} />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

export default StatisticsPage
