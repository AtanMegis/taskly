import { Layers, CheckCircle2, Clock, AlertTriangle } from "lucide-react"
import type { TaskStats } from "@/lib/types"

interface StatsCardProps {
  icon: React.ReactNode
  value: number
  label: string
  iconBg: string
}

function StatsCard({ icon, value, label, iconBg }: StatsCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 px-5 py-4 flex items-center gap-4 shadow-sm">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}>{icon}</div>
      <div>
        <p className="text-2xl font-bold text-slate-800 leading-tight">{value}</p>
        <p className="text-xs text-slate-400 mt-0.5">{label}</p>
      </div>
    </div>
  )
}

export default function TaskStatsCards({ stats }: { stats: TaskStats }) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <StatsCard
        icon={<Layers className="w-5 h-5 text-teal-500" />}
        value={stats.total}
        label="Total Tasks"
        iconBg="bg-teal-50"
      />
      <StatsCard
        icon={<CheckCircle2 className="w-5 h-5 text-emerald-500" />}
        value={stats.completed}
        label="Completed"
        iconBg="bg-emerald-50"
      />
      <StatsCard
        icon={<Clock className="w-5 h-5 text-amber-500" />}
        value={stats.pending}
        label="Pending"
        iconBg="bg-amber-50"
      />
      <StatsCard
        icon={<AlertTriangle className="w-5 h-5 text-red-400" />}
        value={stats.overdue}
        label="Overdue"
        iconBg="bg-red-50"
      />
    </div>
  )
}
