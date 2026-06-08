import { motion } from 'motion/react'
import { useAccounts } from '../hooks/useAccounts'
import AccountGrid from '../components/organisms/AccountGrid'

export default function Accounts() {
  const { data: accounts, isLoading, isError } = useAccounts()

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6 sm:space-y-8">
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-1"
      >
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-gold-400 tracking-wide">Cuentas</h1>
        <p className="text-slate-500 text-sm mt-1 font-heading tracking-wide">
          {accounts?.length ?? 0} cuentas registradas
        </p>
      </motion.header>

      {isError ? (
        <div className="text-center py-20 bg-navy-700/20 rounded-2xl border border-navy-600/20">
          <svg className="mx-auto mb-3 text-red-400" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p className="text-slate-500 font-heading tracking-wide">Error al cargar las cuentas. Intenta de nuevo.</p>
        </div>
      ) : (
        <AccountGrid accounts={accounts} isLoading={isLoading} />
      )}
    </div>
  )
}
