import Link from "next/link"
import { Bell, Plus } from "lucide-react"

interface HeaderProps {
  title: string
  showNewTask?: boolean
}

export default function Header({ title, showNewTask = false }: HeaderProps) {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  return (
    <header className="flex items-center justify-between px-8 py-5 border-b border-slate-100 bg-white sticky top-0 z-10 min-h-24">
      <div>
        <h1 className="text-xl font-semibold text-slate-800">{title}</h1>
        <p className="text-xs text-teal-500 mt-0.5">{today}</p>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative w-9 h-9 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center transition-colors">
          <Bell className="w-4 h-4 text-slate-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-teal-500 rounded-full border-2 border-white" />
        </button>

        {showNewTask && (
          <Link
            href="/tasks/new"
            className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors shadow-sm shadow-teal-200"
          >
            <Plus className="w-4 h-4" />
            New Task
          </Link>
        )}
      </div>
    </header>
  )
}
