import Link from "next/link"
import { ArrowLeft, SearchX } from "lucide-react"

export default function TaskNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 px-8">
      <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
        <SearchX className="w-7 h-7 text-slate-400" />
      </div>
      <div className="text-center">
        <h2 className="text-base font-semibold text-slate-800 mb-1">Task not found</h2>
        <p className="text-sm text-slate-400">This task doesn&apos;t exist or has been deleted.</p>
      </div>
      <Link
        href="/tasks"
        className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>
    </div>
  )
}
