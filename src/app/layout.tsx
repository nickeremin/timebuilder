import "./globals.css"

import type { Metadata } from "next"
import { Open_Sans } from "next/font/google"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import { Toaster } from "@/shared/components/ui/toaster"
import {
  AuthProvider,
  ThemeProvider,
  TRPCQueryProvider,
} from "@/shared/config/providers"

export const metadata: Metadata = {
  title: "Timebuilder",
}

const openSans = Open_Sans({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  style: "normal",
})

interface RootLayoutProps {
  children: React.ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" suppressHydrationWarning className={openSans.className}>
      <body>
        <TRPCQueryProvider>
          <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
            </ThemeProvider>
          </AuthProvider>
        </TRPCQueryProvider>
        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
      </body>
    </html>
  )
}

export default RootLayout
