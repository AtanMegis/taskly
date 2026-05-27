import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Tag, Hash, CheckCircle2, Edit2 } from "lucide-react"
import { getTaskById, getOtherTasks } from "@/lib/queries"
import { cn, STATUS_CONFIG, formatDateTime, formatTime, formatShortDate } from "@/lib/utils"
import Header from "@/components/layout/Header"
import TaskDetailActions from "@/components/tasks/TaskDetailActions"

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const task = getTaskById(Number(id))
  return {
    title: task ? `${task.title} · Taskly` : "Task Not Found · Taskly",
  }
}

export default async function TaskDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const taskId = Number(id)
  const task = getTaskById(taskId)

  if (!task) notFound()

  const otherTasks = getOtherTasks(taskId)
  const statusCfg = STATUS_CONFIG[task.status]

  return (
    <div className="flex flex-col h-full">
      <Header title="Task Detail" />
      <div className="flex-1 px-8 py-6">
        <div className="max-w-xl mx-auto space-y-5">
          {/* Header row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center">
                <Tag className="w-4.5 h-4.5 text-teal-500" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-slate-800">Task Detail</h2>
                <p className="text-xs text-teal-500">Viewing task information</p>
              </div>
            </div>
            <Link
              href="/tasks"
              className="flex items-center gap-2 text-sm text-slate-500 hover:text-teal-600 bg-white border border-slate-200 hover:border-teal-200 px-4 py-2 rounded-xl transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Dashboard
            </Link>
          </div>

          {/* Task card */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <h1 className="text-lg font-semibold text-slate-800 leading-tight">{task.title}</h1>
              <span
                className={cn(
                  "shrink-0 px-3 py-1 rounded-lg text-xs font-medium border",
                  statusCfg.bg,
                  statusCfg.color
                )}
              >
                {task.status === "in_progress" ? "In Progress" : statusCfg.label}
              </span>
            </div>

            {task.description && <p className="text-sm text-slate-500 leading-relaxed mb-5">{task.description}</p>}

            <div className="grid grid-cols-2 gap-4 mt-4">
              {/* Due Date */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center shrink-0 mt-0.5">
                  <Calendar className="w-4 h-4 text-teal-500" />
                </div>
                <div>
                  <p className="text-xs text-teal-500 font-medium">Due Date</p>
                  <p className="text-sm font-medium text-slate-700 mt-0.5">
                    {task.due_date ? formatDateTime(task.due_date) : "Not set"}
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-500" />
                </div>
                <div>
                  <p className="text-xs text-teal-500 font-medium">Status</p>
                  <p className="text-sm font-medium text-slate-700 mt-0.5">
                    {task.status === "in_progress" ? "In Progress" : statusCfg.label}
                  </p>
                </div>
              </div>

              {/* Created At */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-teal-500" />
                </div>
                <div>
                  <p className="text-xs text-teal-500 font-medium">Created At</p>
                  <p className="text-sm font-medium text-slate-700 mt-0.5">{formatDateTime(task.created_at)}</p>
                  <p className="text-xs text-slate-400">{formatTime(task.created_at)}</p>
                </div>
              </div>

              {/* Last Updated */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center shrink-0 mt-0.5">
                  <Edit2 className="w-4 h-4 text-teal-500" />
                </div>
                <div>
                  <p className="text-xs text-teal-500 font-medium">Last Updated</p>
                  <p className="text-sm font-medium text-slate-700 mt-0.5">{formatDateTime(task.updated_at)}</p>
                  <p className="text-xs text-slate-400">{formatTime(task.updated_at)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions + Task ID */}
          <div className="flex items-center justify-between">
            <TaskDetailActions taskId={task.id} status={task.status} />
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Hash className="w-3.5 h-3.5 text-teal-400" />
              <span>
                Task ID: <span className="text-teal-500 font-medium">#TK-{String(task.id).padStart(5, "0")}</span>
              </span>
            </div>
          </div>

          {/* Other Tasks */}
          {otherTasks.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-sm font-semibold text-slate-700">Other Tasks</h3>
                <span className="text-xs text-slate-400">— Quick overview</span>
              </div>
              <div className="space-y-2">
                {otherTasks.map((t) => {
                  const cfg = STATUS_CONFIG[t.status]
                  return (
                    <Link
                      key={t.id}
                      href={`/tasks/${t.id}`}
                      className="flex items-center justify-between bg-white rounded-xl border border-slate-100 px-4 py-3 hover:border-teal-200 hover:shadow-sm transition-all group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={cn("w-2 h-2 rounded-full shrink-0", cfg.dot)} />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-slate-700 truncate group-hover:text-teal-700">
                            {t.title}
                          </p>
                          {t.due_date && (
                            <p className="text-xs text-slate-400 mt-0.5">Due: {formatShortDate(t.due_date)}</p>
                          )}
                        </div>
                      </div>
                      <span
                        className={cn("shrink-0 px-2.5 py-0.5 rounded-md text-xs font-medium ml-3", cfg.bg, cfg.color)}
                      >
                        {cfg.label}
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
