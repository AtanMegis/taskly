"use client"

import { useState, useTransition, useOptimistic } from "react"
import Link from "next/link"
import { CheckCircle2, Circle, Trash2, ChevronRight, Search } from "lucide-react"
import { completeTask, deleteTask } from "@/lib/actions"
import { cn, STATUS_CONFIG, CATEGORY_COLORS, formatShortDate } from "@/lib/utils"
import type { Task, TaskStatus } from "@/lib/types"

type FilterTab = "all" | TaskStatus

const TABS: { key: FilterTab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "completed", label: "Completed" },
  { key: "overdue", label: "Overdue" },
]

export default function TaskList({ tasks: initialTasks }: { tasks: Task[] }) {
  const [activeTab, setActiveTab] = useState<FilterTab>("all")
  const [search, setSearch] = useState("")
  const [, startTransition] = useTransition()

  const [optimisticTasks, updateOptimistic] = useOptimistic(
    initialTasks,
    (state: Task[], action: { type: "complete" | "delete"; id: number }) => {
      if (action.type === "complete") {
        return state.map((t) => (t.id === action.id ? { ...t, status: "completed" as TaskStatus } : t))
      }
      if (action.type === "delete") {
        return state.filter((t) => t.id !== action.id)
      }
      return state
    }
  )

  const filtered = optimisticTasks.filter((t) => {
    const matchTab =
      activeTab === "all" || t.status === activeTab || (activeTab === "pending" && t.status === "in_progress")
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase())
    return matchTab && matchSearch
  })

  function handleComplete(id: number) {
    startTransition(async () => {
      updateOptimistic({ type: "complete", id })
      await completeTask(id)
    })
  }

  function handleDelete(id: number) {
    startTransition(async () => {
      updateOptimistic({ type: "delete", id })
      await deleteTask(id)
    })
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
      {/* Tabs + Search */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-slate-50">
        <div className="flex items-center gap-1">
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={cn(
                "cursor-pointer px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-150",
                activeTab === key
                  ? "bg-teal-500 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 pr-4 py-1.5 bg-slate-50 border border-slate-100 rounded-xl text-sm text-slate-600 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-200 focus:border-teal-300 w-48 transition-all"
          />
        </div>
      </div>

      {/* Task Items */}
      <div className="divide-y divide-slate-50">
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-slate-400 text-sm">No tasks found</p>
          </div>
        ) : (
          filtered.map((task) => (
            <TaskItem key={task.id} task={task} onComplete={handleComplete} onDelete={handleDelete} />
          ))
        )}
      </div>
    </div>
  )
}

function TaskItem({
  task,
  onComplete,
  onDelete,
}: {
  task: Task
  onComplete: (id: number) => void
  onDelete: (id: number) => void
}) {
  const isCompleted = task.status === "completed"
  const isOverdue = task.status === "overdue"
  const statusCfg = STATUS_CONFIG[task.status]

  return (
    <div className="flex items-center gap-4 px-5 py-3.5 group hover:bg-slate-50/60 transition-colors">
      {/* Checkbox */}
      <button
        onClick={() => !isCompleted && onComplete(task.id)}
        disabled={isCompleted}
        className={cn(
          "shrink-0 transition-all duration-200",
          isCompleted ? "text-teal-500 cursor-default" : "text-slate-200 hover:text-teal-400 cursor-pointer"
        )}
      >
        {isCompleted ? (
          <CheckCircle2 className="w-5 h-5" />
        ) : (
          <Circle className={cn("w-5 h-5", isOverdue && "text-red-300 hover:text-red-400")} />
        )}
      </button>

      {/* Title + date */}
      <div className="flex-1 min-w-0">
        <p
          className={cn("text-sm font-medium truncate", isCompleted ? "line-through text-slate-400" : "text-slate-700")}
        >
          {task.title}
        </p>
        <p
          className={cn(
            "text-xs mt-0.5",
            isCompleted ? "text-slate-400" : isOverdue ? "text-red-400" : "text-slate-400"
          )}
        >
          {isCompleted
            ? `Completed: ${formatShortDate(task.updated_at)}`
            : task.due_date
              ? `Due: ${formatShortDate(task.due_date)}${isOverdue ? " · Overdue" : ""}`
              : "No due date"}
        </p>
      </div>

      {/* Status + Category + Arrow */}
      <div className="flex items-center gap-2 shrink-0">
        <span className={cn("px-2.5 py-0.5 rounded-md text-xs font-medium", statusCfg.bg, statusCfg.color)}>
          {statusCfg.label}
        </span>
        <span className={cn("px-2.5 py-0.5 rounded-md text-xs font-medium", CATEGORY_COLORS[task.category])}>
          {task.category}
        </span>

        {/* Delete button - visible on hover */}
        <button
          onClick={(e) => {
            e.preventDefault()
            onDelete(task.id)
          }}
          className="cursor-pointer opacity-0 group-hover:opacity-100 p-1 text-slate-300 hover:text-red-400 transition-all ml-1"
          title="Delete task"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>

        <Link href={`/tasks/${task.id}`} className="text-slate-300 hover:text-teal-500 transition-colors">
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
