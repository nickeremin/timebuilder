"use client"

import { ChangeEvent, useTransition } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { createTodo } from "@/app/_actions/todo"
import { trpc } from "@/app/_trpc/client"
//import { createTodo } from "@/app/_actions/todo"
import { Icons } from "@/shared/components/Icons"
import { Button } from "@/shared/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form"
import { Input } from "@/shared/components/ui/input"
import { Textarea } from "@/shared/components/ui/textarea"
import { handleError } from "@/shared/lib/utils"
import { todoSchema } from "@/shared/lib/validations/todo"

export type Inputs = z.infer<typeof todoSchema>

interface CreateTodoFormProps {
  todoListId: string
}

const CreateTodoForm = ({ todoListId }: CreateTodoFormProps) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [isPending, startTransition] = useTransition()
  const { mutate: createTodo, isLoading: isTodoCreating } =
    trpc.todo.createTodo.useMutation({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [["todo", "getTodosByTodoListId"]],
        })
        toast.success("Time was created successfully!")
      },
    })

  // Initializing react-hook-form with zod
  const form = useForm<Inputs>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      description: "",
      hours: "",
      minutes: "",
      seconds: "",
      plannedTime: "",
    },
  })

  const onSubmit = ({ description, hours, minutes, seconds }: Inputs) => {
    startTransition(async () => {
      try {
        const plannedTime = (
          parseInt(hours) * 3600 +
          parseInt(minutes) * 60 +
          parseInt(seconds)
        ).toString()
        createTodo({ todoListId, description, plannedTime })
      } catch (error) {
        handleError(error)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="grid max-w-lg gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe your duty..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="hours"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hours</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="minutes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Minutes</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="seconds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Seconds</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button disabled={isPending || isTodoCreating}>
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Create Time
          <span className="sr-only">Create a time</span>
        </Button>
      </form>
    </Form>
  )
}

export default CreateTodoForm
