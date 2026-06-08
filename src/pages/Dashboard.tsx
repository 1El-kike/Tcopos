import { useMemo } from 'react'
import { motion } from 'motion/react'
import { Card, CardContent } from '@heroui/react'
import { useAccounts } from '../hooks/useAccounts'
import { useTransactions } from '../hooks/useTransactions'
import AccountGrid from '../components/organisms/AccountGrid'
import GlobalBalanceCard from '../components/organisms/GlobalBalanceCard'
import RecentTransactions from '../components/organisms/RecentTransactions'
import CategoryChart from '../components/organisms/CategoryChart'

export default function Dashboard() {
  const { data: accounts, isLoading: accountsLoading } = useAccounts()
  const { data: transactions, isLoading: txLoading } = useTransactions()

  const chartCurrency = useMemo(() => {
    if (!accounts || accounts.length === 0) return 'USD'
    const currencies = [...new Set(accounts.map((a) => a.currency))]
    return currencies.length === 1 ? currencies[0] : 'USD'
  }, [accounts])

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6 sm:space-y-8">
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          Dashboard
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Resumen general de tus finanzas
        </p>
      </motion.header>

      {accounts && accounts.length > 0 && (
        <GlobalBalanceCard accounts={accounts} />
      )}

      <section>
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="9" y1="21" x2="9" y2="9" />
          </svg>
          Últimos movimientos
        </h2>
        <RecentTransactions
          transactions={transactions ?? []}
          accounts={accounts ?? []}
          isLoading={txLoading}
        />
      </section>

      <section>
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 20V10" />
            <path d="M12 20V4" />
            <path d="M6 20v-6" />
          </svg>
          Mis Cuentas
        </h2>
        <AccountGrid accounts={accounts} isLoading={accountsLoading} />
      </section>

      <Card className="bg-white/5 border border-white/10 backdrop-blur-xl">
        <CardContent className="p-5 sm:p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 20V10" />
              <path d="M18 20V4" />
              <path d="M6 20v-6" />
            </svg>
            Ingresos / Egresos por categoría
          </h2>
          <CategoryChart transactions={transactions ?? []} currency={chartCurrency} />
        </CardContent>
      </Card>
    </div>
  )
}
