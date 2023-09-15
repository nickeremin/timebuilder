import * as z from "zod"

import { Icons } from "../components/Icons"
import { SelectTodo, SelectTodoList } from "../db/schema"

export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
  label?: string
  description?: string
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}

export type SidebarNavItem = NavItemWithChildren

export type TodoList = SelectTodoList & { todos: Todo[] }
export type Todo = SelectTodo
