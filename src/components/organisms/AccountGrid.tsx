import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import type { Account } from '../../services/types'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: 'easeOut' as const } },
}

const skeletonVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
}

const skeletonItemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
}

function SkeletonCard() {
  return (
    <div className="bg-navy-700/40 rounded-2xl p-5 space-y-4 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-navy-500/20" />
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-navy-500/20 rounded w-3/4" />
          <div className="h-3 bg-navy-500/20 rounded w-1/3" />
        </div>
      </div>
      <div className="h-7 bg-navy-500/20 rounded w-1/2" />
    </div>
  )
}

interface AccountGridProps {
  accounts?: Account[]
  isLoading: boolean
}

export default function AccountGrid({ accounts, isLoading }: AccountGridProps) {
  const navigate = useNavigate()

  if (isLoading) {
    return (
      <motion.div
        variants={skeletonVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div key={i} variants={skeletonItemVariants}>
            <SkeletonCard />
          </motion.div>
        ))}
      </motion.div>
    )
  }

  if (!accounts || accounts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20"
      >
        <svg className="mx-auto mb-4 text-slate-600" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
        </svg>
        <p className="text-slate-500 text-lg font-heading tracking-wide">No hay cuentas disponibles</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {accounts.map((account) => (
        <motion.div
          key={account.id}
          variants={cardVariants}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.98 }}
        >
          <button
            type="button"
            onClick={() => navigate(`/account/${account.id}`)}
            className="w-full text-left bg-navy-700/40 hover:bg-navy-600/40 border border-navy-600/30 hover:border-blue-accent/30 rounded-2xl p-5 space-y-4 transition-all duration-200 cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex-shrink-0 ring-2 ring-navy-500/30 group-hover:ring-blue-accent/30 transition-all"
                style={{ backgroundColor: account.color }}
              />
              <div className="min-w-0 flex-1">
                <p className="text-slate-200 font-heading font-semibold truncate group-hover:text-blue-light transition-colors tracking-wide">
                  {account.name}
                </p>
                <p className="text-slate-500 text-sm">{account.currency}</p>
              </div>
            </div>
            <p className="text-2xl font-heading font-bold text-slate-100 tabular-nums tracking-wide">
              {new Intl.NumberFormat('es-DO', {
                style: 'currency',
                currency: account.currency,
              }).format(Number(account.balance))}
            </p>
          </button>
        </motion.div>
      ))}
    </motion.div>
  )
}
