import { DrizzleAdapter } from "@auth/drizzle-adapter"
import * as dotenv from "dotenv"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

import * as schema from "./schema"

dotenv.config({ path: ".env.local" })

const connectionString = process.env.DATABASE_URL as string
const client = postgres(connectionString)
const db = drizzle(client, { schema })

const adapter = DrizzleAdapter(db)

export { db, adapter }
