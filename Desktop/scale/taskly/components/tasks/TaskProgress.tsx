interface TaskProgressProps {
  completed: number
  total: number
}

export default function TaskProgress({ completed, total }: TaskProgressProps) {
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100)

  return (
    <div className="bg-white rounded-2xl border border-slate-100 px-6 py-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-slate-700">Overall Progress</span>
        <span className="text-sm font-semibold text-teal-600">{pct}%</span>
      </div>
      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-teal-500 rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
      </div>
      <p className="text-xs text-slate-400 mt-2.5">
        {completed} of {total} tasks completed
      </p>
    </div>
  )
}
