import type { AdapterAccount } from "@auth/core/adapters"
import {
  relations,
  type InferInsertModel,
  type InferSelectModel,
} from "drizzle-orm"
import {
  boolean,
  integer,
  interval,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from "drizzle-orm/pg-core"

// START: Timebuilder schemas
export const todos = pgTable("todo", {
  id: text("id").notNull().primaryKey(),
  todoListId: text("todo_list_id").notNull(),
  description: text("description").notNull(),
  plannedTime: interval("planned_time").notNull(),
})

export type SelectTodo = InferSelectModel<typeof todos>
export type InsertTodo = InferInsertModel<typeof todos>

export const todosRelations = relations(todos, ({ one }) => ({
  todoList: one(todoLists, {
    fields: [todos.todoListId],
    references: [todoLists.id],
  }),
}))

export const todoLists = pgTable("todo_list", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id").notNull(),
  description: text("description").notNull(),
})

export type SelectTodoList = InferSelectModel<typeof todoLists>
export type InsertTodoList = InferInsertModel<typeof todoLists>

export const todoListsRelations = relations(todoLists, ({ one, many }) => ({
  user: one(users, {
    fields: [todoLists.userId],
    references: [users.id],
  }),
  todos: many(todos),
}))
// END: Timebuilder schemas

// START: Next Auth adapter schemas
export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  hashedPassword: text("hashed_password"),
  role: text("role").notNull().default("user"),
  image: text("image"),
})

export const usersRelations = relations(users, ({ many }) => ({
  todoLists: many(todoLists),
}))

export type SelectUser = InferSelectModel<typeof users>
export type InsertUser = InferInsertModel<typeof users>

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  })
)

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  })
)
// END: Next Auth adapter schemas
