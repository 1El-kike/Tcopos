import { motion } from 'motion/react'
import type { Account } from '../../services/types'

interface GlobalBalanceCardProps {
  accounts: Account[]
}

export default function GlobalBalanceCard({ accounts }: GlobalBalanceCardProps) {
  const totalBalance = accounts.reduce((sum, a) => sum + Number(a.balance), 0)
  const currencies = [...new Set(accounts.map((a) => a.currency))]
  const multiCurrency = currencies.length > 1

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-blue-600/20 via-blue-500/10 to-violet-600/20 rounded-2xl border border-blue-500/20 p-6 sm:p-8"
    >
      <p className="text-sm text-slate-400 font-medium uppercase tracking-wide">
        Balance global
      </p>
      <p className="text-3xl sm:text-4xl font-bold text-white mt-2 tabular-nums tracking-tight">
        {multiCurrency ? (
          <span className="text-lg sm:text-xl text-slate-300">
            {accounts.length} cuentas &middot; {currencies.length} divisas
          </span>
        ) : (
          new Intl.NumberFormat('es-DO', {
            style: 'currency',
            currency: currencies[0],
          }).format(totalBalance)
        )}
      </p>
      <div className="flex flex-wrap gap-6 mt-4 text-sm">
        <div>
          <span className="text-slate-400">Cuentas: </span>
          <span className="text-white font-semibold">{accounts.length}</span>
        </div>
        <div>
          <span className="text-slate-400">Divisas: </span>
          <span className="text-white font-semibold">{currencies.join(', ')}</span>
        </div>
      </div>
    </motion.div>
  )
}
