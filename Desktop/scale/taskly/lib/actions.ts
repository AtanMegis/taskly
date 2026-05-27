"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import getDb from "./db"
import type { TaskStatus, TaskCategory } from "./types"

export async function createTask(formData: FormData) {
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const due_date = formData.get("due_date") as string
  const status = (formData.get("status") as TaskStatus) || "pending"
  const category = (formData.get("category") as TaskCategory) || "Other"

  if (!title?.trim()) {
    throw new Error("Task title is required")
  }

  const db = getDb()
  const result = db
    .prepare(
      `INSERT INTO tasks (title, description, due_date, status, category)
       VALUES (?, ?, ?, ?, ?)`
    )
    .run(title.trim(), description?.trim() || null, due_date || null, status, category)

  revalidatePath("/tasks")
  redirect(`/tasks/${result.lastInsertRowid}`)
}

export async function completeTask(id: number) {
  const db = getDb()
  db.prepare("UPDATE tasks SET status = 'completed', updated_at = datetime('now') WHERE id = ?").run(id)
  revalidatePath("/tasks")
}

export async function deleteTask(id: number) {
  const db = getDb()
  db.prepare("DELETE FROM tasks WHERE id = ?").run(id)
  revalidatePath("/tasks")
  revalidatePath(`/tasks/${id}`)
}

export async function updateTaskStatus(id: number, status: TaskStatus) {
  const db = getDb()
  db.prepare("UPDATE tasks SET status = ?, updated_at = datetime('now') WHERE id = ?").run(status, id)
  revalidatePath("/tasks")
  revalidatePath(`/tasks/${id}`)
}
