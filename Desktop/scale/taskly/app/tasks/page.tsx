import { getAllTasks, getTaskStats } from "@/lib/queries"
import Header from "@/components/layout/Header"
import TaskStatsCards from "@/components/tasks/TaskStatsCards"
import TaskProgress from "@/components/tasks/TaskProgress"
import TaskList from "@/components/tasks/TaskList"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const [tasks, stats] = await Promise.all([getAllTasks(), getTaskStats()])
  return (
    <div className="flex flex-col h-full">
      <Header title="Dashboard" showNewTask />
      <div className="flex-1 px-8 py-6 space-y-5">
        <TaskStatsCards stats={stats} />
        <TaskProgress completed={stats.completed} total={stats.total} />
        <TaskList tasks={tasks} />
      </div>
    </div>
  )
}
