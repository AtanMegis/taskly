import { clsx, type ClassValue } from "clsx"
import type { TaskStatus, TaskCategory } from "./types"

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatDate(dateStr: string | null): string {
  if (!dateStr) return "No due date"
  const date = new Date(dateStr)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function formatDateTime(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function formatTime(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function formatShortDate(dateStr: string | null): string {
  if (!dateStr) return ""
  const date = new Date(dateStr)
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export const STATUS_CONFIG: Record<TaskStatus, { label: string; color: string; bg: string; dot: string }> = {
  pending: {
    label: "Pending",
    color: "text-amber-600",
    bg: "bg-amber-50 border border-amber-200",
    dot: "bg-amber-500",
  },
  completed: {
    label: "Done",
    color: "text-teal-600",
    bg: "bg-teal-50 border border-teal-200",
    dot: "bg-teal-500",
  },
  overdue: {
    label: "Overdue",
    color: "text-red-500",
    bg: "bg-red-50 border border-red-200",
    dot: "bg-red-500",
  },
  in_progress: {
    label: "In Progress",
    color: "text-amber-600",
    bg: "bg-amber-50 border border-amber-200",
    dot: "bg-amber-500",
  },
}

export const CATEGORY_COLORS: Record<TaskCategory, string> = {
  Design: "text-violet-600 bg-violet-50 border border-violet-200",
  Dev: "text-sky-600 bg-sky-50 border border-sky-200",
  Report: "text-orange-600 bg-orange-50 border border-orange-200",
  HR: "text-pink-600 bg-pink-50 border border-pink-200",
  Sales: "text-emerald-600 bg-emerald-50 border border-emerald-200",
  Other: "text-slate-600 bg-slate-50 border border-slate-200",
}
