import React, { Suspense } from "react"
import { getServerSession } from "next-auth"
import { getSession, useSession } from "next-auth/react"
import { ErrorBoundary } from "react-error-boundary"

import { ErrorTodoList } from "@/widgets/errors"
import { Timer } from "@/widgets/timer"
import { CreateTodoForm } from "@/features/forms"
import { TodoList } from "@/entities/todos"

import { authOptions } from "../api/auth/[...nextauth]/route"

const HomePage = async () => {
  const session = await getServerSession(authOptions)

  return <div className="m-12 flex gap-12">Main</div>
}

export default HomePage
