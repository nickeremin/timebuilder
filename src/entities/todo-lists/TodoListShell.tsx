import React from "react"
import { cva, VariantProps } from "class-variance-authority"

import { cn } from "@/shared/lib/utils"

export const shellVariants = cva("grid items-center gap-8 pb-8 pt-6 md:py-8", {
  variants: {
    variant: {
      default: "container border rounded-md",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

interface TodoListShellProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof shellVariants> {
  as?: React.ElementType
}

const TodoListShell = ({
  className,
  as: Comp = "section",
  variant,
  ...props
}: TodoListShellProps) => {
  return (
    <Comp className={cn(shellVariants({ variant }), className)} {...props} />
  )
}

export default TodoListShell
