import React from "react"
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Tailwind,
  Text,
} from "@react-email/components"

import { buttonVariants } from "@/shared/components/ui/button"
import { cn } from "@/shared/lib/utils"

interface EmailTemplateProps {
  token: string
  url: string
  name: string
}

const EmailTemplate = ({ token, url, name }: EmailTemplateProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="mx-auto my-12 bg-blue-300 font-sans">
          <Container className="rounded-lg p-8 text-center shadow-xl">
            <Heading className="pt-4 text-xl">Welcome, User</Heading>
            <Text>This is test email message...</Text>
            <Link href={`${url}?token=${token}`}>
              <Button className={cn(buttonVariants())}>{name}</Button>
            </Link>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default EmailTemplate
