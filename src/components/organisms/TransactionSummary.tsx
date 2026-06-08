import { motion } from 'motion/react'

interface TransactionSummaryProps {
  currentBalance: number
  periodIncome: number
  periodExpenses: number
  currency: string
}

export default function TransactionSummary({
  currentBalance,
  periodIncome,
  periodExpenses,
  currency,
}: TransactionSummaryProps) {
  const periodNet = periodIncome - periodExpenses
  const fmt = (n: number) =>
    new Intl.NumberFormat('es-DO', { style: 'currency', currency }).format(n)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-2 sm:grid-cols-4 gap-3"
    >
      <div className="bg-navy-700/40 rounded-xl border border-navy-600/30 p-4 space-y-1">
        <p className="text-xs text-slate-500 font-heading font-medium uppercase tracking-[0.12em]">Saldo actual</p>
        <p className="text-xl font-heading font-bold text-slate-100 tabular-nums tracking-wide">{fmt(currentBalance)}</p>
      </div>
      <div className="bg-navy-700/40 rounded-xl border border-navy-500/20 p-4 space-y-1">
        <p className="text-xs text-slate-500 font-heading font-medium uppercase tracking-[0.12em]">Ingresos</p>
        <p className="text-xl font-heading font-bold text-blue-light tabular-nums tracking-wide">{fmt(periodIncome)}</p>
      </div>
      <div className="bg-navy-700/40 rounded-xl border border-navy-600/30 p-4 space-y-1">
        <p className="text-xs text-slate-500 font-heading font-medium uppercase tracking-[0.12em]">Egresos</p>
        <p className="text-xl font-heading font-bold text-slate-400 tabular-nums tracking-wide">{fmt(periodExpenses)}</p>
      </div>
      <div className="bg-navy-700/40 rounded-xl border border-navy-600/30 p-4 space-y-1">
        <p className="text-xs text-slate-500 font-heading font-medium uppercase tracking-[0.12em]">Neto del período</p>
        <p
          className={`text-xl font-heading font-bold tabular-nums tracking-wide ${
            periodNet >= 0 ? 'text-blue-light' : 'text-slate-400'
          }`}
        >
          {fmt(periodNet)}
        </p>
      </div>
    </motion.div>
  )
}
