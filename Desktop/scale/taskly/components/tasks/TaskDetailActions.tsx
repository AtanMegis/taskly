"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle2, Trash2, ArrowLeft } from "lucide-react"
import { completeTask, deleteTask } from "@/lib/actions"
import type { TaskStatus } from "@/lib/types"

export default function TaskDetailActions({ taskId, status }: { taskId: number; status: TaskStatus }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const isCompleted = status === "completed"

  function handleComplete() {
    startTransition(async () => {
      await completeTask(taskId)
      router.refresh()
    })
  }

  function handleDelete() {
    startTransition(async () => {
      await deleteTask(taskId)
      router.push("/tasks")
    })
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => router.push("/tasks")}
        className="cursor-pointer flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 bg-white border border-slate-200 hover:border-slate-300 px-4 py-2 rounded-xl transition-all"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back
      </button>

      {!isCompleted && (
        <button
          onClick={handleComplete}
          disabled={isPending}
          className="flex items-center gap-2 text-sm text-teal-600 bg-teal-50 hover:bg-teal-100 border border-teal-200 px-4 py-2 rounded-xl transition-all disabled:opacity-50"
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          Complete
        </button>
      )}

      <button
        onClick={handleDelete}
        disabled={isPending}
        className="cursor-pointer flex items-center gap-2 text-sm text-red-500 bg-red-50 hover:bg-red-100 border border-red-200 px-4 py-2 rounded-xl transition-all disabled:opacity-50"
      >
        <Trash2 className="w-3.5 h-3.5" />
        Delete
      </button>
    </div>
  )
}
