interface DateRangeFilterProps {
  from: string
  to: string
  onChange: (range: { from: string; to: string }) => void
  onReset: () => void
}

export default function DateRangeFilter({ from, to, onChange, onReset }: DateRangeFilterProps) {
  const hasActiveFilter = from !== '' || to !== ''

  return (
    <div className="flex flex-wrap items-end gap-3">
      <div>
        <label htmlFor="date-from" className="block text-xs text-slate-400 mb-1 font-medium">
          Desde
        </label>
        <input
          id="date-from"
          type="date"
          value={from}
          onChange={(e) => onChange({ from: e.target.value, to })}
          className="h-9 rounded-lg bg-white/10 border border-white/20 text-white text-sm px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all [color-scheme:dark]"
        />
      </div>
      <div>
        <label htmlFor="date-to" className="block text-xs text-slate-400 mb-1 font-medium">
          Hasta
        </label>
        <input
          id="date-to"
          type="date"
          value={to}
          onChange={(e) => onChange({ from, to: e.target.value })}
          max={new Date().toISOString().split('T')[0]}
          className="h-9 rounded-lg bg-white/10 border border-white/20 text-white text-sm px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all [color-scheme:dark]"
        />
      </div>
      {hasActiveFilter && (
        <button
          type="button"
          onClick={onReset}
          className="h-9 px-3 rounded-lg text-xs font-medium text-slate-400 hover:text-white border border-white/10 hover:border-white/30 transition-all cursor-pointer"
        >
          Limpiar
        </button>
      )}
    </div>
  )
}
