"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { createTodoList } from "@/app/_actions/todo"
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
import { Textarea } from "@/shared/components/ui/textarea"
import { handleError } from "@/shared/lib/utils"
import { todoListSchema } from "@/shared/lib/validations/todo"

export type Inputs = z.infer<typeof todoListSchema>

interface CreateTodoListFormProps {
  userId: string
}

const CreateTodoListForm = ({ userId }: CreateTodoListFormProps) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [isPending, startTransition] = useTransition()
  const { mutate: createTodoList, isLoading: isTodoListCreating } =
    trpc.todo.createTodoList.useMutation({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [["todo", "getTodoListsByUserId"]],
        })
        toast.success("Builder was created successfully!")
      },
    })

  // Initializing react-hook-form with zod
  const form = useForm<Inputs>({
    resolver: zodResolver(todoListSchema),
    defaultValues: {
      description: "",
    },
  })

  const onSubmit = ({ description }: Inputs) => {
    startTransition(async () => {
      try {
        createTodoList({ userId, description })
      } catch (error) {
        handleError(error)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Description</FormLabel> */}
              <FormControl>
                <Textarea
                  placeholder="What's about your builder..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending}>
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Create Builder
          <span className="sr-only">Create a builder</span>
        </Button>
      </form>
    </Form>
  )
}

export default CreateTodoListForm
