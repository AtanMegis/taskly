export default function TaskDetailLoading() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-8 py-5 border-b border-slate-100 bg-white">
        <div className="space-y-2">
          <div className="h-5 w-32 bg-slate-100 rounded-lg animate-pulse" />
          <div className="h-3 w-40 bg-slate-100 rounded-lg animate-pulse" />
        </div>
        <div className="h-9 w-9 rounded-full bg-slate-100 animate-pulse" />
      </div>

      <div className="flex-1 px-8 py-6">
        <div className="max-w-xl mx-auto space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-slate-100 rounded-xl animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 w-24 bg-slate-100 rounded animate-pulse" />
                <div className="h-3 w-36 bg-slate-100 rounded animate-pulse" />
              </div>
            </div>
            <div className="h-9 w-40 bg-slate-100 rounded-xl animate-pulse" />
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
            <div className="flex justify-between">
              <div className="h-6 w-2/3 bg-slate-100 rounded animate-pulse" />
              <div className="h-7 w-24 bg-slate-100 rounded-lg animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-slate-100 rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-slate-100 rounded animate-pulse" />
              <div className="h-4 w-4/5 bg-slate-100 rounded animate-pulse" />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-8 h-8 bg-slate-100 rounded-lg animate-pulse shrink-0" />
                  <div className="space-y-2">
                    <div className="h-3 w-16 bg-slate-100 rounded animate-pulse" />
                    <div className="h-4 w-28 bg-slate-100 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
