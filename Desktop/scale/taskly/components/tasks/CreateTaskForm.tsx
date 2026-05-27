"use client"

import { useRouter } from "next/navigation"
import { Save, X, Plus } from "lucide-react"

import { createTask } from "@/lib/actions"

const CATEGORIES = ["Design", "Dev", "Report", "HR", "Sales", "Other"]
const STATUSES = [
  { value: "pending", label: "Pending" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
]

export default function CreateTaskForm() {
  const router = useRouter()

  return (
    <div className="max-w-xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center">
          <Plus className="w-5 h-5 text-teal-500" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-800">New Task</h2>
          <p className="text-xs text-teal-500">Fill in the details below to create a new task</p>
        </div>
      </div>

      <form action={createTask} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Task Title <span className="text-red-400">*</span>
          </label>
          <input
            name="title"
            required
            placeholder="Enter task title..."
            className="w-full px-4 py-2.5 bg-teal-50/30 border border-teal-100 rounded-xl text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-200 focus:border-teal-300 transition-all"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Description <span className="text-slate-400 font-normal">(optional)</span>
          </label>
          <textarea
            name="description"
            rows={4}
            placeholder="Add a short description or notes..."
            className="w-full px-4 py-2.5 bg-teal-50/30 border border-teal-100 rounded-xl text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-200 focus:border-teal-300 transition-all resize-none"
          />
        </div>

        {/* Due Date + Status */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Due Date <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <input
              name="due_date"
              type="date"
              className="w-full px-4 py-2.5 bg-teal-50/30 border border-teal-100 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-200 focus:border-teal-300 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Status</label>
            <select
              name="status"
              defaultValue="pending"
              className="w-full px-4 py-2.5 bg-teal-50/30 border border-teal-100 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-200 focus:border-teal-300 transition-all appearance-none cursor-pointer"
            >
              {STATUSES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Category</label>
          <select
            name="category"
            defaultValue="Other"
            className="w-full px-4 py-2.5 bg-teal-50/30 border border-teal-100 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-200 focus:border-teal-300 transition-all appearance-none cursor-pointer"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-1">
          <button
            type="submit"
            className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors shadow-sm shadow-teal-200"
          >
            <Save className="w-4 h-4" />
            Save Task
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-600 text-sm font-medium px-5 py-2.5 rounded-xl border border-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
