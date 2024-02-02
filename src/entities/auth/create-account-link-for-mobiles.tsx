import React from "react"
import Link from "next/link"

function CreateAccountLinkForMobiles() {
  return (
    //  Create new account link for small devices
    <div className="flex h-[100px] items-center justify-center border-t bg-background p-8 lg:border-none">
      <Link
        href="/signup"
        className="underline-link whitespace-nowrap text-link lg:hidden"
      >
        У вас нет учетной записи? Создать Аккаунт
      </Link>
    </div>
  )
}

export default CreateAccountLinkForMobiles
