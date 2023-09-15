import React from "react"
import { Heading, Link } from "@react-email/components"

interface EmailTemplateProps {
  token: string
  url: string
  name: string
}

const EmailTemplate = ({ token, url, name }: EmailTemplateProps) => {
  return (
    <div>
      <Heading>Hi, there!</Heading>
      <Link href={`${url}?token=${token}`}>{name}</Link>
    </div>
  )
}

export default EmailTemplate
