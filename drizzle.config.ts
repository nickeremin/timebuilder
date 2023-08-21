import * as dotenv from "dotenv"
import type { Config } from "drizzle-kit"

dotenv.config({ path: ".env.local" })

export default {
  schema: "./src/shared/db/schema.ts",
  driver: "pg",
  out: "./drizzle",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || "",
  },
} satisfies Config
