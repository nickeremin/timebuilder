import React from "react"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"

interface TodoListPreviewProps {
  id: string
  description: string
}

const TodoListPreview = ({ id, description }: TodoListPreviewProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>ID: {id}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  )
}

export default TodoListPreview
