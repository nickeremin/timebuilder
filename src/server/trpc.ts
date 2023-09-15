import { initTRPC } from "@trpc/server"

// Initializing tRPC server instance
const t = initTRPC.create()

// Base router and procedure helpers
export const router = t.router
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure
