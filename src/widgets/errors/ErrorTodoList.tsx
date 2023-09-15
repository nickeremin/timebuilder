"use client"

import { useErrorBoundary, type FallbackProps } from "react-error-boundary"

import { Button } from "@/shared/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/shared/components/ui/card"

interface ErrorTodoListProps extends FallbackProps {
  error: Error
}

const ErrorTodoList = ({ error, resetErrorBoundary }: ErrorTodoListProps) => {
  return (
    <Card>
      <CardHeader>Error occured in TodoList</CardHeader>
      <CardContent>Message: {error.message}</CardContent>
      <CardFooter>
        <Button onClick={() => resetErrorBoundary()}>Reset</Button>
      </CardFooter>
    </Card>
  )
}

export default ErrorTodoList
