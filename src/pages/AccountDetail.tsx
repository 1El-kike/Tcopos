import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { motion } from 'motion/react'
import { Button, Input, Card, CardContent, TextField, Label, FieldError } from '@heroui/react'
import toast from 'react-hot-toast'
import { useAccount } from '../hooks/useAccounts'
import { useTransactions, useCreateTransaction } from '../hooks/useTransactions'

const TX_TYPES = [
  { value: 'deposit', label: 'Depósito' },
  { value: 'withdrawal', label: 'Retiro' },
  { value: 'payment', label: 'Pago' },
  { value: 'invoice', label: 'Factura' },
] as const

interface TransactionForm {
  type: string
  amount: string
  description: string
  category: string
}

function ArrowLeft() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
}

function SkeletonBlock({ className = '' }: { className?: string }) {
  return <div className={`bg-white/5 rounded-xl animate-pulse ${className}`} />
}

export default function AccountDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: account, isLoading: accountLoading } = useAccount(id!)
  const { data: transactions, isLoading: txLoading } = useTransactions()
  const createTx = useCreateTransaction()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TransactionForm>()

  const filteredTxs = transactions?.filter((tx) => tx.accountId === id) ?? []

  const onSubmit = async (values: TransactionForm) => {
    try {
      await createTx.mutateAsync({
        accountId: id!,
        type: values.type,
        amount: values.amount,
        description: values.description,
        category: values.category,
      })
      toast.success('Transacción creada correctamente')
      reset()
    } catch {
      toast.error('Error al crear la transacción')
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
        <p className="text-slate-400 text-lg">Cuenta no encontrada</p>
        <Button variant="secondary" onPress={() => navigate('/dashboard')}>
          Volver al dashboard
        </Button>
      </div>
    )
  }

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
          className="p-2 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Volver al dashboard"
        >
          <ArrowLeft />
        </button>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">{account.name}</h1>
          <p className="text-slate-400 text-sm">
            {account.currency} &middot; ID: {account.id}
          </p>
        </div>
      </motion.header>

      <motion.div variants={itemVariants}>
        <Card className="bg-white/5 border border-white/10 backdrop-blur-xl">
          <CardContent className="p-5 sm:p-6 space-y-6">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Nueva transacción
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm text-slate-300 font-medium">Tipo</span>
                  <select
                    {...register('type', { required: 'Selecciona un tipo' })}
                    className="h-10 rounded-xl bg-white/10 border border-white/20 text-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
                  >
                    <option value="" className="text-slate-900">Selecciona</option>
                    {TX_TYPES.map((t) => (
                      <option key={t.value} value={t.value} className="text-slate-900">
                        {t.label}
                      </option>
                    ))}
                  </select>
                  {errors.type && (
                    <p className="text-red-400 text-xs">{errors.type.message}</p>
                  )}
                </label>

                <TextField isInvalid={!!errors.amount}>
                  <Label className="text-slate-300 text-sm">Monto</Label>
                  <Input
                    {...register('amount', {
                      required: 'El monto es requerido',
                      min: { value: 0.01, message: 'Monto debe ser mayor a 0' },
                    })}
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    disabled={isSubmitting}
                    className="mt-1.5 text-white placeholder:text-slate-500"
                  />
                  {errors.amount && (
                    <FieldError className="text-red-400 text-xs mt-1">{errors.amount.message}</FieldError>
                  )}
                </TextField>
              </div>

              <TextField isInvalid={!!errors.description}>
                <Label className="text-slate-300 text-sm">Descripción</Label>
                <Input
                  {...register('description', {
                    required: 'La descripción es requerida',
                    minLength: { value: 3, message: 'Mínimo 3 caracteres' },
                  })}
                  placeholder="Ej: Pago de servicios"
                  disabled={isSubmitting}
                  className="mt-1.5 text-white placeholder:text-slate-500"
                />
                {errors.description && (
                  <FieldError className="text-red-400 text-xs mt-1">{errors.description.message}</FieldError>
                )}
              </TextField>

              <TextField isInvalid={!!errors.category}>
                <Label className="text-slate-300 text-sm">Categoría</Label>
                <Input
                  {...register('category', {
                    required: 'La categoría es requerida',
                  })}
                  placeholder="Ej: Alimentos, Transporte, etc."
                  disabled={isSubmitting}
                  className="mt-1.5 text-white placeholder:text-slate-500"
                />
                {errors.category && (
                  <FieldError className="text-red-400 text-xs mt-1">{errors.category.message}</FieldError>
                )}
              </TextField>

              <Button
                type="submit"
                variant="primary"
                className="w-full font-semibold"
                isPending={isSubmitting}
                isDisabled={isSubmitting}
                size="lg"
              >
                {isSubmitting ? 'Creando...' : 'Crear transacción'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="bg-white/5 border border-white/10 backdrop-blur-xl">
          <CardContent className="p-5 sm:p-6 space-y-4">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="9" y1="21" x2="9" y2="9" />
              </svg>
              Movimientos ({filteredTxs.length})
            </h2>

            {txLoading ? (
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <SkeletonBlock key={i} className="h-16" />
                ))}
              </div>
            ) : filteredTxs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-400">No hay transacciones registradas.</p>
                <p className="text-slate-500 text-sm mt-1">
                  Crea la primera usando el formulario de arriba.
                </p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar">
                {filteredTxs.map((tx) => (
                  <motion.div
                    key={tx.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-white font-medium truncate">
                        {tx.description}
                      </p>
                      <p className="text-slate-400 text-sm capitalize">
                        {tx.category} &middot; {tx.type}
                      </p>
                    </div>
                    <div className="text-right ml-4 flex-shrink-0">
                      <p className="text-white font-semibold tabular-nums">
                        {new Intl.NumberFormat('es-DO', {
                          style: 'currency',
                          currency: account.currency,
                        }).format(Number(tx.amount))}
                      </p>
                      <span
                        className={`text-xs font-medium capitalize ${
                          tx.type === 'deposit'
                            ? 'text-green-400'
                            : tx.type === 'withdrawal'
                              ? 'text-red-400'
                              : 'text-slate-400'
                        }`}
                      >
                        {tx.type === 'deposit'
                          ? 'Ingreso'
                          : tx.type === 'withdrawal'
                            ? 'Retiro'
                            : tx.type}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
