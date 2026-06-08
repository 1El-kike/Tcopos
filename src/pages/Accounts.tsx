import { motion } from 'motion/react'
import { useAccounts } from '../hooks/useAccounts'
import AccountGrid from '../components/organisms/AccountGrid'

export default function Accounts() {
  const { data: accounts, isLoading } = useAccounts()

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

      <AccountGrid accounts={accounts} isLoading={isLoading} />
    </div>
  )
}
