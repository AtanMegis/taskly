export type TaskStatus = "pending" | "completed" | "overdue" | "in_progress"

export type TaskCategory = "Design" | "Dev" | "Report" | "HR" | "Sales" | "Other"

export interface Task {
  id: number
  title: string
  description: string | null
  due_date: string | null
  status: TaskStatus
  category: TaskCategory
  created_at: string
  updated_at: string
}

export interface CreateTaskInput {
  title: string
  description?: string
  due_date?: string
  status?: TaskStatus
  category?: TaskCategory
}

export interface TaskStats {
  total: number
  completed: number
  pending: number
  overdue: number
}
