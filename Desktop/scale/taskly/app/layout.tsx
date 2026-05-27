import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Taskly",
  description: "Clean task management",
  icons: {
    icon: "/check.png",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
