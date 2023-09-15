import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { CreateTodoListForm } from "@/features/forms"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"

const DashboardPage = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.user) redirect("/auth/signin")

  const user = session.user

  return (
    <div className="flex gap-16 p-12">
      <div className="flex flex-col gap-8">
        <Card>
          <CardHeader>
            <CardTitle>
              {!!user ? user.name : "user is not authorized"}
            </CardTitle>
            <CardDescription>
              Email: {!!user ? user.email : "email is undefined"}
            </CardDescription>
          </CardHeader>
        </Card>
        <div>
          <h1 className="mb-4 text-xl font-bold">Manage your builders</h1>
          <CreateTodoListForm userId={user.id} />
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
