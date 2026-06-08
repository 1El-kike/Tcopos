import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import type { Transaction, Account } from '../../services/types'

interface RecentTransactionsProps {
  transactions: Transaction[]
  accounts: Account[]
  isLoading: boolean
}

function SkeletonBlock({ className = '' }: { className?: string }) {
  return <div className={`bg-white/5 rounded-xl animate-pulse ${className}`} />
}

function getAccountName(accounts: Account[], accountId: string): string {
  return accounts.find((a) => a.id === accountId)?.name ?? accountId
}

function getAccountCurrency(accounts: Account[], accountId: string): string {
  return accounts.find((a) => a.id === accountId)?.currency ?? 'USD'
}

function getAccountColor(accounts: Account[], accountId: string): string {
  return accounts.find((a) => a.id === accountId)?.color ?? '#6366f1'
}

export default function RecentTransactions({
  transactions,
  accounts,
  isLoading,
}: RecentTransactionsProps) {
  const navigate = useNavigate()

  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonBlock key={i} className="h-14" />
        ))}
      </div>
    )
  }

  const sorted = [...transactions].sort((a, b) => b.date - a.date).slice(0, 8)

  if (sorted.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400">No hay transacciones recientes.</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {sorted.map((tx) => {
        const currency = getAccountCurrency(accounts, tx.accountId)
        const color = getAccountColor(accounts, tx.accountId)
        return (
          <motion.button
            key={tx.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(`/account/${tx.accountId}`)}
            className="w-full flex items-center gap-3 bg-white/5 hover:bg-white/10 rounded-xl p-3 transition-colors text-left cursor-pointer"
          >
            <div
              className="w-8 h-8 rounded-full flex-shrink-0 ring-2 ring-white/10"
              style={{ backgroundColor: color }}
            />
            <div className="min-w-0 flex-1">
              <p className="text-white text-sm font-medium truncate">{tx.description}</p>
              <p className="text-slate-500 text-xs truncate">
                {getAccountName(accounts, tx.accountId)} &middot; {tx.category}
              </p>
            </div>
            <div className="text-right flex-shrink-0 ml-2">
              <p className="text-white text-sm font-semibold tabular-nums">
                {new Intl.NumberFormat('es-DO', {
                  style: 'currency',
                  currency,
                }).format(Number(tx.amount))}
              </p>
              <span
                className={`text-xs font-medium ${
                  tx.type === 'deposit' ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {tx.type === 'deposit' ? 'Ingreso' : 'Egreso'}
              </span>
            </div>
          </motion.button>
        )
      })}
    </div>
  )
}
