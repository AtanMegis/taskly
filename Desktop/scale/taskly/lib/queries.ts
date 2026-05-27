import getDb from "./db"
import type { Task, TaskStats } from "./types"

export function getAllTasks(): Task[] {
  const db = getDb()
  return db.prepare("SELECT * FROM tasks ORDER BY created_at DESC").all() as Task[]
}

export function getTaskById(id: number): Task | null {
  const db = getDb()
  return (db.prepare("SELECT * FROM tasks WHERE id = ?").get(id) as Task) ?? null
}

export function getTaskStats(): TaskStats {
  const db = getDb()
  const rows = db
    .prepare(
      `SELECT
        COUNT(*) as total,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
        SUM(CASE WHEN status IN ('pending','in_progress') THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN status = 'overdue' THEN 1 ELSE 0 END) as overdue
      FROM tasks`
    )
    .get() as TaskStats
  return rows
}

export function getOtherTasks(excludeId: number): Task[] {
  const db = getDb()
  return db.prepare("SELECT * FROM tasks WHERE id != ? ORDER BY created_at DESC LIMIT 5").all(excludeId) as Task[]
}
