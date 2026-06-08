import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { Button, Card, CardContent } from '@heroui/react'
import toast from 'react-hot-toast'
import { useAccount } from '../hooks/useAccounts'
import { useTransactions, useCreateTransaction, useUpdateTransaction } from '../hooks/useTransactions'
import { ChevronLeftIcon } from '../components/atoms/Icons'
import SkeletonBlock from '../components/atoms/SkeletonBlock'
import SectionHeader from '../components/atoms/SectionHeader'
import TransactionForm, { type TransactionFormValues } from '../components/molecules/TransactionForm'
import DateRangeFilter from '../components/molecules/DateRangeFilter'
import TransactionSummary from '../components/organisms/TransactionSummary'
import TransactionList from '../components/organisms/TransactionList'
import CategoryChart from '../components/organisms/CategoryChart'
import type { Transaction } from '../services/types'

function toTimestamp(dateStr: string): number {
  return new Date(dateStr).getTime()
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
}

function EditIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

function ListIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  )
}

function ChartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 20V10" />
      <path d="M18 20V4" />
      <path d="M6 20v-6" />
    </svg>
  )
}

export default function AccountDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: account, isLoading: accountLoading } = useAccount(id!)
  const { data: transactions, isLoading: txLoading } = useTransactions()
  const [dateRange, setDateRange] = useState<{ from: string; to: string }>({ from: '', to: '' })
  const [editingTx, setEditingTx] = useState<Transaction | null>(null)
  const createTx = useCreateTransaction()
  const updateTx = useUpdateTransaction()

  const handleEdit = (tx: Transaction) => {
    setEditingTx(tx)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const cancelEdit = () => setEditingTx(null)

  const accountTxs = transactions?.filter((tx) => tx.accountId === id) ?? []

  const filteredTxs = accountTxs.filter((tx) => {
    if (dateRange.from && tx.date < toTimestamp(dateRange.from)) return false
    if (dateRange.to && tx.date > toTimestamp(dateRange.to + 'T23:59:59')) return false
    return true
  })

  const periodIncome = filteredTxs
    .filter((tx) => tx.type === 'deposit')
    .reduce((sum, tx) => sum + Number(tx.amount), 0)

  const periodExpenses = filteredTxs
    .filter((tx) => tx.type !== 'deposit')
    .reduce((sum, tx) => sum + Number(tx.amount), 0)

  const handleSave = async (values: TransactionFormValues) => {
    try {
      if (editingTx) {
        await updateTx.mutateAsync({
          id: editingTx.id,
          type: values.type,
          amount: values.amount,
          description: values.description,
          category: values.category,
        })
        toast.success('Transacción actualizada correctamente')
        setEditingTx(null)
      } else {
        await createTx.mutateAsync({
          accountId: id!,
          type: values.type,
          amount: values.amount,
          description: values.description,
          category: values.category,
        })
        toast.success('Transacción creada correctamente')
      }
    } catch {
      toast.error(editingTx ? 'Error al actualizar la transacción' : 'Error al crear la transacción')
    }
  }

  if (accountLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
        <div className="flex items-center gap-4">
          <SkeletonBlock className="w-9 h-9" />
          <div className="space-y-2">
            <SkeletonBlock className="h-7 w-48" />
            <SkeletonBlock className="h-4 w-32" />
          </div>
        </div>
        <SkeletonBlock className="h-64" />
        <SkeletonBlock className="h-96" />
      </div>
    )
  }

  if (!account) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center space-y-4">
        <p className="text-slate-500 text-lg font-heading tracking-wide">Cuenta no encontrada</p>
        <Button variant="secondary" onPress={() => navigate('/dashboard')} className="font-heading tracking-wide">
          Volver al dashboard
        </Button>
      </div>
    )
  }

  const formDefaultValues = editingTx
    ? {
        type: editingTx.type,
        amount: editingTx.amount,
        description: editingTx.description,
        category: editingTx.category,
      }
    : undefined

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6 sm:space-y-8"
    >
      <motion.header variants={itemVariants} className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className="p-2 rounded-xl hover:bg-navy-700/50 text-slate-500 hover:text-slate-200 transition-colors cursor-pointer"
          aria-label="Volver al dashboard"
        >
          <ChevronLeftIcon />
        </button>
        <div className="space-y-0.5">
          <h1 className="text-xl sm:text-2xl font-heading font-bold text-gold-400 tracking-wide">{account.name}</h1>
          <p className="text-slate-500 text-sm font-heading tracking-wide">
            {account.currency} &middot; ID: {account.id}
          </p>
        </div>
      </motion.header>

      <motion.div variants={itemVariants}>
        <TransactionSummary
          currentBalance={Number(account.balance)}
          periodIncome={periodIncome}
          periodExpenses={periodExpenses}
          currency={account.currency}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="bg-navy-700/40 border border-navy-600/30 backdrop-blur-xl">
          <CardContent className="p-5 sm:p-6 space-y-6">
            <SectionHeader
              icon={<EditIcon />}
              title={editingTx ? 'Editar transacción' : 'Nueva transacción'}
            >
              {editingTx && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="text-xs text-slate-500 hover:text-slate-200 border border-navy-600/30 hover:border-navy-500/50 rounded-lg px-3 py-1.5 transition-all cursor-pointer font-heading tracking-wide"
                >
                  Cancelar
                </button>
              )}
            </SectionHeader>

            <TransactionForm
              key={editingTx?.id ?? 'new'}
              defaultValues={formDefaultValues}
              onSave={handleSave}
              onCancel={cancelEdit}
              saveLabel={editingTx ? 'Actualizar transacción' : 'Crear transacción'}
              savingLabel={editingTx ? 'Actualizando...' : 'Creando...'}
            />
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="bg-navy-700/40 border border-navy-600/30 backdrop-blur-xl">
          <CardContent className="p-5 sm:p-6 space-y-4">
            <SectionHeader icon={<ListIcon />} title={`Movimientos (${filteredTxs.length})`}>
              <DateRangeFilter
                from={dateRange.from}
                to={dateRange.to}
                onChange={setDateRange}
                onReset={() => setDateRange({ from: '', to: '' })}
              />
            </SectionHeader>

            <TransactionList
              transactions={filteredTxs}
              isLoading={txLoading}
              currency={account.currency}
              onEdit={handleEdit}
            />
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="bg-navy-700/40 border border-navy-600/30 backdrop-blur-xl">
          <CardContent className="p-5 sm:p-6">
            <SectionHeader icon={<ChartIcon />} title="Ingresos / Egresos por categoría" />
            <CategoryChart transactions={filteredTxs} currency={account.currency} />
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
