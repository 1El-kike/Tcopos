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
        <label htmlFor="date-from" className="block text-xs text-slate-500 mb-1 font-heading font-medium tracking-wide">
          Desde
        </label>
        <input
          id="date-from"
          type="date"
          value={from}
          onChange={(e) => onChange({ from: e.target.value, to })}
          className="h-9 rounded-lg bg-navy-800/60 border border-navy-600/30 text-slate-200 text-sm px-3 focus:outline-none focus:ring-2 focus:ring-blue-accent/50 transition-all [color-scheme:dark]"
        />
      </div>
      <div>
        <label htmlFor="date-to" className="block text-xs text-slate-500 mb-1 font-heading font-medium tracking-wide">
          Hasta
        </label>
        <input
          id="date-to"
          type="date"
          value={to}
          onChange={(e) => onChange({ from, to: e.target.value })}
          max={new Date().toISOString().split('T')[0]}
          className="h-9 rounded-lg bg-navy-800/60 border border-navy-600/30 text-slate-200 text-sm px-3 focus:outline-none focus:ring-2 focus:ring-blue-accent/50 transition-all [color-scheme:dark]"
        />
      </div>
      {hasActiveFilter && (
        <button
          type="button"
          onClick={onReset}
          className="h-9 px-3 rounded-lg text-xs font-heading font-medium text-slate-500 hover:text-slate-200 border border-navy-600/30 hover:border-navy-500/50 transition-all cursor-pointer tracking-wide"
        >
          Limpiar
        </button>
      )}
    </div>
  )
}
