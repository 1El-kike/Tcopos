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
  const { data: accounts, isLoading: accountsLoading, isError: accountsError } = useAccounts()
  const { data: transactions, isLoading: txLoading, isError: txError } = useTransactions()

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
        className="space-y-1"
      >
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-gold-400 tracking-wide">
          Dashboard
        </h1>
        <p className="text-slate-500 text-sm font-heading tracking-wide">
          Resumen general de tus finanzas
        </p>
      </motion.header>

      {accounts && accounts.length > 0 && (
        <GlobalBalanceCard accounts={accounts} isLoading={accountsLoading} />
      )}

      {accountsError && (
        <div className="text-center py-12 bg-navy-700/20 rounded-2xl border border-navy-600/20">
          <svg className="mx-auto mb-3 text-red-400" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p className="text-slate-500 font-heading tracking-wide">Error al cargar las cuentas. Intenta de nuevo.</p>
        </div>
      )}

      <section className="space-y-4">
        <h2 className="text-lg font-heading font-semibold text-gold-400 flex items-center gap-2 tracking-wide">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="9" y1="21" x2="9" y2="9" />
          </svg>
          Últimos movimientos
        </h2>
        {txError ? (
          <div className="text-center py-12 bg-navy-700/20 rounded-2xl border border-navy-600/20">
            <svg className="mx-auto mb-3 text-red-400" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p className="text-slate-500 font-heading tracking-wide">Error al cargar las transacciones. Intenta de nuevo.</p>
          </div>
        ) : (
          <RecentTransactions
            transactions={transactions ?? []}
            accounts={accounts ?? []}
            isLoading={txLoading}
          />
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-heading font-semibold text-gold-400 flex items-center gap-2 tracking-wide">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 20V10" />
            <path d="M12 20V4" />
            <path d="M6 20v-6" />
          </svg>
          Mis Cuentas
        </h2>
        <AccountGrid accounts={accounts} isLoading={accountsLoading} />
      </section>

      <Card className="bg-navy-700/40 border border-navy-600/30 backdrop-blur-xl">
        <CardContent className="p-5 sm:p-6 space-y-4">
          <h2 className="text-lg font-heading font-semibold text-gold-400 flex items-center gap-2 tracking-wide">
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

      <div className="relative h-48 sm:h-64 rounded-2xl overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-r from-navy-800/90 via-navy-800/60 to-transparent flex items-center p-6 sm:p-10">
          <div className="space-y-2">
            <p className="text-xs text-gold-400 font-heading uppercase tracking-[0.15em]">TCOPOS Finance</p>
            <p className="text-xl sm:text-2xl font-heading font-bold text-slate-100 tracking-wide">
              Control total de tus finanzas
            </p>
            <p className="text-sm text-slate-500 font-heading tracking-wide">
              Gestiona múltiples cuentas y divisas en un solo lugar
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}
