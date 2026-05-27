export default function DashboardLoading() {
  return (
    <div className="flex flex-col h-full">
      {/* Header skeleton */}
      <div className="flex items-center justify-between px-8 py-5 border-b border-slate-100 bg-white">
        <div className="space-y-2">
          <div className="h-5 w-32 bg-slate-100 rounded-lg animate-pulse" />
          <div className="h-3 w-48 bg-slate-100 rounded-lg animate-pulse" />
        </div>
        <div className="h-9 w-28 bg-slate-100 rounded-xl animate-pulse" />
      </div>

      <div className="flex-1 px-8 py-6 space-y-5">
        {/* Stats skeleton */}
        <div className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-100 px-5 py-4 flex items-center gap-4 h-18"
            >
              <div className="w-10 h-10 bg-slate-100 rounded-xl animate-pulse" />
              <div className="space-y-2">
                <div className="h-5 w-10 bg-slate-100 rounded animate-pulse" />
                <div className="h-3 w-20 bg-slate-100 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        {/* Progress skeleton */}
        <div className="bg-white rounded-2xl border border-slate-100 px-6 py-5 h-22">
          <div className="flex justify-between mb-3">
            <div className="h-4 w-32 bg-slate-100 rounded animate-pulse" />
            <div className="h-4 w-10 bg-slate-100 rounded animate-pulse" />
          </div>
          <div className="h-2.5 bg-slate-100 rounded-full animate-pulse" />
        </div>

        {/* Task list skeleton */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-50">
            <div className="flex gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-8 w-20 bg-slate-100 rounded-lg animate-pulse" />
              ))}
            </div>
            <div className="h-8 w-44 bg-slate-100 rounded-xl animate-pulse" />
          </div>
          <div className="divide-y divide-slate-50">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-3.5">
                <div className="w-5 h-5 rounded-full bg-slate-100 animate-pulse shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/5 bg-slate-100 rounded animate-pulse" />
                  <div className="h-3 w-1/4 bg-slate-100 rounded animate-pulse" />
                </div>
                <div className="flex gap-2">
                  <div className="h-5 w-16 bg-slate-100 rounded-md animate-pulse" />
                  <div className="h-5 w-12 bg-slate-100 rounded-md animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
