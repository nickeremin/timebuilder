import React from "react"

function ContinueAuthWith() {
  return (
    <div className="relative my-5">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground">
          или продолжите
        </span>
      </div>
    </div>
  )
}

export default ContinueAuthWith
