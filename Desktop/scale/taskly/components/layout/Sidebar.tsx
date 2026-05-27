"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Plus, Settings, CheckSquare, PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { cn } from "@/lib/utils"

const NAV = [
  { label: "Dashboard", href: "/tasks", icon: LayoutDashboard },
  { label: "Create Task", href: "/tasks/new", icon: Plus },
  { label: "Settings", href: "/settings", icon: Settings },
]

interface SidebarProps {
  open: boolean
  onToggle: () => void
}

export default function Sidebar({ open, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const isActive = (href: string) => (href === "/tasks" ? pathname === "/tasks" : pathname.startsWith(href))

  return (
    <aside
      className={cn(
        "shrink-0 bg-white border-r border-slate-100 flex flex-col h-screen sticky top-0 transition-all duration-300 overflow-hidden",
        open ? "w-55" : "w-15"
      )}
    >
      {/* Logo + Toggle */}
      <div
        className={cn(
          "flex items-center border-b border-slate-100 min-h-24 transition-all duration-300",
          open ? "justify-between px-4" : "justify-center"
        )}
      >
        <Link
          href="/tasks"
          className={cn(
            "cursor-pointer flex items-center gap-2.5 pl-0 transition-all duration-300 overflow-hidden",
            open ? "opacity-100 w-auto" : "opacity-0 w-0 pointer-events-none"
          )}
        >
          <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center shrink-0">
            <CheckSquare className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-semibold text-slate-800 text-[17px] whitespace-nowrap">Taskly</span>
        </Link>
        <button
          onClick={onToggle}
          className="cursor-pointer w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-teal-600 hover:bg-teal-50 transition-all shrink-0"
          title={open ? "Collapse sidebar" : "Expand sidebar"}
        >
          {open ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 pt-4 space-y-0.5">
        {NAV.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            title={!open ? label : undefined}
            className={cn(
              "flex items-center rounded-xl text-sm font-medium transition-all duration-150 h-10",
              open ? "gap-3 px-3" : "justify-center px-0",
              isActive(href) ? "bg-teal-50 text-teal-700" : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
            )}
          >
            <Icon className={cn("w-4 h-4 shrink-0", isActive(href) ? "text-teal-600" : "text-slate-400")} />
            <span
              className={cn(
                "transition-all duration-300 overflow-hidden whitespace-nowrap",
                open ? "opacity-100 w-auto" : "opacity-0 w-0 pointer-events-none"
              )}
            >
              {label}
            </span>
          </Link>
        ))}
      </nav>

      {/* User */}
      <div className={cn("border-t border-slate-100 transition-all duration-300", open ? "px-4 py-4" : "px-2 py-4")}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white text-xs font-semibold shrink-0">
            SL
          </div>
          <div
            className={cn(
              "min-w-0 transition-all duration-300 overflow-hidden",
              open ? "opacity-100 w-auto" : "opacity-0 w-0 pointer-events-none"
            )}
          >
            <p className="text-sm font-medium text-slate-700 truncate whitespace-nowrap">Sarah Lin</p>
            <p className="text-xs text-teal-500 whitespace-nowrap">Pro Account</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
