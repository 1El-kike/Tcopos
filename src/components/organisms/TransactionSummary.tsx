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
      <div className="bg-white/5 rounded-xl border border-white/10 p-4">
        <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Saldo actual</p>
        <p className="text-xl font-bold text-white mt-1 tabular-nums">{fmt(currentBalance)}</p>
      </div>
      <div className="bg-white/5 rounded-xl border border-green-500/20 p-4">
        <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Ingresos</p>
        <p className="text-xl font-bold text-green-400 mt-1 tabular-nums">{fmt(periodIncome)}</p>
      </div>
      <div className="bg-white/5 rounded-xl border border-red-500/20 p-4">
        <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Egresos</p>
        <p className="text-xl font-bold text-red-400 mt-1 tabular-nums">{fmt(periodExpenses)}</p>
      </div>
      <div className="bg-white/5 rounded-xl border border-white/10 p-4">
        <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Neto del período</p>
        <p
          className={`text-xl font-bold mt-1 tabular-nums ${
            periodNet >= 0 ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {fmt(periodNet)}
        </p>
      </div>
    </motion.div>
  )
}
