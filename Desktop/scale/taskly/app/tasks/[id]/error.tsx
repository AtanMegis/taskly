"use client"

import Link from "next/link"
import { AlertTriangle, ArrowLeft, RefreshCcw } from "lucide-react"

export default function TaskDetailError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 px-8">
      <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center">
        <AlertTriangle className="w-7 h-7 text-red-400" />
      </div>
      <div className="text-center">
        <h2 className="text-base font-semibold text-slate-800 mb-1">Task not found</h2>
        <p className="text-sm text-slate-400 max-w-sm">{error.message || "This task doesn't exist or was deleted."}</p>
      </div>
      <div className="flex items-center gap-3">
        <Link
          href="/tasks"
          className="flex items-center gap-2 text-sm text-slate-600 bg-white border border-slate-200 px-4 py-2 rounded-xl transition-colors hover:bg-slate-50"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        <button
          onClick={reset}
          className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
        >
          <RefreshCcw className="w-4 h-4" />
          Try again
        </button>
      </div>
    </div>
  )
}
