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
    <div className="bg-white/5 rounded-2xl p-5 space-y-4 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/10" />
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-white/10 rounded w-3/4" />
          <div className="h-3 bg-white/10 rounded w-1/3" />
        </div>
      </div>
      <div className="h-7 bg-white/10 rounded w-1/2" />
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
        <p className="text-slate-400 text-lg">No hay cuentas disponibles</p>
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
            className="w-full text-left bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 rounded-2xl p-5 space-y-4 transition-all duration-200 cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex-shrink-0 ring-2 ring-white/10 group-hover:ring-blue-500/30 transition-all"
                style={{ backgroundColor: account.color }}
              />
              <div className="min-w-0 flex-1">
                <p className="text-white font-semibold truncate group-hover:text-blue-300 transition-colors">
                  {account.name}
                </p>
                <p className="text-slate-400 text-sm">{account.currency}</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-white tabular-nums tracking-tight">
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
