import Database from "better-sqlite3"
import path from "path"
import fs from "fs"

const DB_DIR = path.join(process.cwd(), ".data")
const DB_PATH = path.join(DB_DIR, "taskly.db")

if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true })
}

let db: Database.Database

function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH)
    db.pragma("journal_mode = WAL")
    db.pragma("foreign_keys = ON")
    initDb(db)
  }
  return db
}

function initDb(db: Database.Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      title       TEXT    NOT NULL,
      description TEXT,
      due_date    TEXT,
      status      TEXT    NOT NULL DEFAULT 'pending'
                          CHECK (status IN ('pending','completed','overdue','in_progress')),
      category    TEXT    NOT NULL DEFAULT 'Other'
                          CHECK (category IN ('Design','Dev','Report','HR','Sales','Other')),
      created_at  TEXT    NOT NULL DEFAULT (datetime('now')),
      updated_at  TEXT    NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TRIGGER IF NOT EXISTS tasks_updated_at
    AFTER UPDATE ON tasks
    BEGIN
      UPDATE tasks SET updated_at = datetime('now') WHERE id = NEW.id;
    END;
  `)

  // Seed data if empty
  const count = (db.prepare("SELECT COUNT(*) as count FROM tasks").get() as { count: number }).count
  if (count === 0) {
    const insert = db.prepare(`
      INSERT INTO tasks (title, description, due_date, status, category, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `)
    const now = new Date().toISOString()
    const past = (days: number) => {
      const d = new Date()
      d.setDate(d.getDate() - days)
      return d.toISOString().split("T")[0]
    }
    const future = (days: number) => {
      const d = new Date()
      d.setDate(d.getDate() + days)
      return d.toISOString().split("T")[0]
    }

    const seedTasks = [
      [
        "Design landing page wireframes",
        "Create wireframes for the new marketing landing page.",
        future(3),
        "pending",
        "Design",
      ],
      [
        "Set up project repository",
        "Initialize Git repo, configure CI/CD, and add README.",
        past(3),
        "completed",
        "Dev",
      ],
      ["Write Q2 progress report", "Summarize team achievements and blockers for Q2.", past(7), "overdue", "Report"],
      ["Review pull requests from team", "Review and merge open PRs from the dev team.", future(6), "pending", "Dev"],
      [
        "Onboard new team member",
        "Set up accounts, share documentation, and conduct walkthrough.",
        past(5),
        "completed",
        "HR",
      ],
      [
        "Prepare client presentation deck",
        "Create slides for the upcoming client review meeting.",
        future(9),
        "pending",
        "Sales",
      ],
      [
        "Design new onboarding flow for mobile app",
        "Create a comprehensive onboarding experience for new users on the mobile application. This includes wireframing, prototyping, and final design handoff to the development team. Focus on simplicity and clarity to reduce drop-off rates during sign-up.",
        future(14),
        "in_progress",
        "Design",
      ],
      [
        "Update API documentation",
        "Update REST API docs with new endpoints and examples.",
        past(2),
        "completed",
        "Dev",
      ],
      [
        "Set up CI/CD pipeline for staging",
        "Configure GitHub Actions for automated staging deployments.",
        future(7),
        "pending",
        "Dev",
      ],
      [
        "Conduct user interviews",
        "Interview 5 users about the onboarding experience.",
        future(10),
        "pending",
        "Design",
      ],
      ["Fix authentication bug", "Investigate and resolve the JWT refresh token issue.", past(1), "completed", "Dev"],
      [
        "Quarterly team retrospective",
        "Facilitate the Q2 retrospective session with the team.",
        past(4),
        "completed",
        "HR",
      ],
      [
        "Draft privacy policy update",
        "Update privacy policy to comply with new regulations.",
        future(20),
        "pending",
        "Report",
      ],
      ["Performance audit", "Run Lighthouse audits and fix performance bottlenecks.", past(10), "overdue", "Dev"],
    ]

    for (const task of seedTasks) {
      insert.run(...task, now, now)
    }
  }
}

export default getDb
