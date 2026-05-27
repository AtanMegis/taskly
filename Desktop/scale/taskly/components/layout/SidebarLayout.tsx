"use client"

import { useState } from "react"
import Sidebar from "./Sidebar"

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true)

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar open={open} onToggle={() => setOpen((o) => !o)} />
      <main className="flex-1 overflow-y-auto min-w-0 transition-all duration-300">{children}</main>
    </div>
  )
}
