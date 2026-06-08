import { useState } from 'react'
import { motion } from 'motion/react'
import toast from 'react-hot-toast'
import type { Transaction } from '../../services/types'
import { useDeleteTransaction } from '../../hooks/useTransactions'

interface TransactionListProps {
  transactions: Transaction[]
  isLoading: boolean
  currency: string
  onEdit?: (tx: Transaction) => void
}

function SkeletonBlock({ className = '' }: { className?: string }) {
  return <div className={`bg-navy-700/40 rounded-xl animate-pulse ${className}`} />
}

function EditIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}

export default function TransactionList({ transactions, isLoading, currency, onEdit }: TransactionListProps) {
  const deleteTx = useDeleteTransaction()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    try {
      await deleteTx.mutateAsync(id)
      toast.success('Transacción eliminada')
    } catch {
      toast.error('Error al eliminar la transacción')
    } finally {
      setDeletingId(null)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonBlock key={i} className="h-16" />
        ))}
      </div>
    )
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-12 space-y-1">
        <p className="text-slate-500 font-heading tracking-wide">No hay transacciones registradas.</p>
        <p className="text-slate-600 text-sm tracking-wide">
          Crea la primera usando el formulario de arriba.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar">
      {transactions.map((tx) => (
        <motion.div
          key={tx.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center justify-between bg-navy-700/40 hover:bg-navy-600/40 rounded-xl p-3 sm:p-4 transition-colors group border border-navy-600/20 hover:border-blue-accent/20"
        >
          <div className="min-w-0 flex-1">
            <p className="text-slate-200 font-heading font-medium truncate text-sm sm:text-base tracking-wide">{tx.description}</p>
            <p className="text-slate-500 text-xs capitalize tracking-wide">
              {tx.category} &middot; {tx.type}
            </p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 ml-3">
            <div className="text-right">
              <p className="text-slate-100 font-heading font-semibold tabular-nums text-sm tracking-wide">
                {new Intl.NumberFormat('es-DO', {
                  style: 'currency',
                  currency,
                }).format(Number(tx.amount))}
              </p>
              <span
                className={`text-xs font-heading font-medium capitalize tracking-wide ${
                  tx.type === 'deposit'
                    ? 'text-blue-light'
                    : tx.type === 'withdrawal'
                      ? 'text-slate-500'
                      : 'text-slate-500'
                }`}
              >
                {tx.type === 'deposit'
                  ? 'Ingreso'
                  : tx.type === 'withdrawal'
                    ? 'Retiro'
                    : tx.type}
              </span>
            </div>
            <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {onEdit && (
                <button
                  type="button"
                  onClick={() => onEdit(tx)}
                  className="p-1.5 rounded-lg hover:bg-navy-500/30 text-slate-500 hover:text-blue-light transition-colors cursor-pointer"
                  aria-label="Editar transacción"
                >
                  <EditIcon />
                </button>
              )}
              <button
                type="button"
                onClick={() => handleDelete(tx.id)}
                disabled={deletingId === tx.id}
                className="p-1.5 rounded-lg hover:bg-navy-500/30 text-slate-500 hover:text-blue-light transition-colors cursor-pointer disabled:opacity-40"
                aria-label="Eliminar transacción"
              >
                <TrashIcon />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
