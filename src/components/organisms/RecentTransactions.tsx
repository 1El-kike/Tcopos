import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import type { Transaction, Account } from '../../services/types'

interface RecentTransactionsProps {
  transactions: Transaction[]
  accounts: Account[]
  isLoading: boolean
}

function SkeletonBlock({ className = '' }: { className?: string }) {
  return <div className={`bg-navy-700/40 rounded-xl animate-pulse ${className}`} />
}

function getAccountName(accounts: Account[], accountId: string): string {
  return accounts.find((a) => a.id === accountId)?.name ?? accountId
}

function getAccountCurrency(accounts: Account[], accountId: string): string {
  return accounts.find((a) => a.id === accountId)?.currency ?? 'USD'
}

function getAccountColor(accounts: Account[], accountId: string): string {
  return accounts.find((a) => a.id === accountId)?.color ?? '#1e3a8a'
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
      <div className="text-center py-12 space-y-2">
        <svg className="mx-auto text-slate-600" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
        </svg>
        <p className="text-slate-500 font-heading tracking-wide">No hay transacciones recientes.</p>
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
            className="w-full flex items-center gap-3 bg-navy-700/40 hover:bg-navy-600/40 rounded-xl p-3 transition-colors text-left cursor-pointer border border-navy-600/20 hover:border-blue-accent/20"
          >
            <div
              className="w-8 h-8 rounded-full flex-shrink-0 ring-2 ring-navy-500/20"
              style={{ backgroundColor: color }}
            />
            <div className="min-w-0 flex-1">
              <p className="text-slate-200 text-sm font-heading font-medium truncate tracking-wide">{tx.description}</p>
              <p className="text-slate-500 text-xs truncate">
                {getAccountName(accounts, tx.accountId)} &middot; {tx.category}
              </p>
            </div>
            <div className="text-right flex-shrink-0 ml-2">
              <p className="text-slate-100 text-sm font-heading font-semibold tabular-nums tracking-wide">
                {new Intl.NumberFormat('es-DO', {
                  style: 'currency',
                  currency,
                }).format(Number(tx.amount))}
              </p>
              <span
                className={`text-xs font-heading font-medium tracking-wide ${
                  tx.type === 'deposit' ? 'text-blue-light' : 'text-slate-500'
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
