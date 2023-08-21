import { migrate } from "drizzle-orm/postgres-js/migrator"

import { db } from "."

export const migrateDB = async () => {
  console.log("DB is migrating...")
  await migrate(db, { migrationsFolder: "drizzle" })
  console.log("DB migrated!")
}

migrateDB()
