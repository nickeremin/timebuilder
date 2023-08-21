import "./globals.css"

import type { Metadata } from "next"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import { QueryProvider, ThemeProvider } from "@/shared/config/providers"

export const metadata: Metadata = {
  title: "Timebuilder",
}

interface RootLayoutProps {
  children: React.ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryProvider>
      </body>
    </html>
  )
}

export default RootLayout
