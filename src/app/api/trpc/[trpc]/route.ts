import { NextRequest } from "next/server"
import { appRouter } from "@/server/routers/_app"
import { fetchRequestHandler } from "@trpc/server/adapters/fetch"

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => ({}),
  })

export { handler as GET, handler as POST }
