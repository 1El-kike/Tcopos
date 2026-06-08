import { motion } from 'motion/react'
import type { Account } from '../../services/types'
import heroWebp from '../../assets/images/cheatah.png'

interface GlobalBalanceCardProps {
  accounts: Account[]
  isLoading?: boolean
}

export default function GlobalBalanceCard({ accounts, isLoading }: GlobalBalanceCardProps) {
  if (isLoading) {
    return (
      <div className="relative rounded-2xl border border-navy-500/20 p-6 sm:p-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-800/90 via-navy-700/80 to-navy-800/95" />
        <div className="relative space-y-4 animate-pulse">
          <div className="h-4 bg-navy-500/20 rounded w-28" />
          <div className="h-9 bg-navy-500/20 rounded w-56" />
          <div className="flex gap-6 pt-1">
            <div className="h-4 bg-navy-500/20 rounded w-24" />
            <div className="h-4 bg-navy-500/20 rounded w-28" />
          </div>
        </div>
      </div>
    )
  }
  const totalBalance = accounts.reduce((sum, a) => sum + Number(a.balance), 0)
  const currencies = [...new Set(accounts.map((a) => a.currency))]
  const multiCurrency = currencies.length > 1

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative rounded-2xl border border-navy-500/20 p-6 sm:p-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-navy-800/90 via-navy-700/80 to-navy-800/95" />
      <img
        src={heroWebp}
        alt=""
         
        className="absolute right-0 top-1/2 -translate-y-1/2 h-full w-auto object-contain pointer-events-none"
      />
      <div className="absolute top-0 right-0 w-72 md:w-96 h-72 bg-navy-500/10 blur-[100px] rounded-full" />
      <div className="relative space-y-4">
        <div>
          <p className="text-xs text-gold-400 font-heading font-medium uppercase tracking-[0.15em]">
            Balance global
          </p>
          <p className="text-3xl sm:text-4xl font-heading font-bold text-slate-100 mt-2 tabular-nums tracking-wide">
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
        </div>
        <div className="flex flex-wrap gap-6 pt-1">
          <div>
            <span className="text-slate-500 text-sm">Cuentas: </span>
            <span className="text-slate-200 font-semibold text-sm">{accounts.length}</span>
          </div>
          <div>
            <span className="text-slate-500 text-sm">Divisas: </span>
            <span className="text-slate-200 font-semibold text-sm">{currencies.join(', ')}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
