import { useForm } from 'react-hook-form'
import { Button, Input, TextField, Label, FieldError } from '@heroui/react'

const TX_TYPES = [
  { value: 'deposit', label: 'Depósito' },
  { value: 'withdrawal', label: 'Retiro' },
  { value: 'payment', label: 'Pago' },
  { value: 'invoice', label: 'Factura' },
] as const

export interface TransactionFormValues {
  type: string
  amount: string
  description: string
  category: string
}

interface TransactionFormProps {
  defaultValues?: Partial<TransactionFormValues>
  onSave: (values: TransactionFormValues) => Promise<void>
  onCancel?: () => void
  saveLabel?: string
  savingLabel?: string
}

export default function TransactionForm({
  defaultValues,
  onSave,
  onCancel,
  saveLabel = 'Crear transacción',
  savingLabel = 'Creando...',
}: TransactionFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TransactionFormValues>({
    defaultValues: {
      type: '',
      amount: '',
      description: '',
      category: '',
      ...defaultValues,
    },
  })

  return (
    <form onSubmit={handleSubmit(onSave)} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-slate-400 font-heading font-medium tracking-wide">Tipo</label>
          <select
            {...register('type', { required: 'Selecciona un tipo' })}
            className="h-10 w-full rounded-xl bg-navy-800/60 border border-navy-600/30 text-slate-200 px-3 text-sm outline-none focus:ring-2 focus:ring-blue-accent/50 transition-all cursor-pointer"
          >
            <option value="">Selecciona</option>
            {TX_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          {errors.type && (
            <p className="text-xs text-slate-400">{errors.type.message}</p>
          )}
        </div>

        <TextField isInvalid={!!errors.amount} className="w-full flex flex-col gap-1.5">
          <Label className="text-sm text-slate-400 font-heading font-medium tracking-wide">Monto</Label>
          <Input
            {...register('amount', {
              required: 'El monto es requerido',
              min: { value: 0.01, message: 'Monto debe ser mayor a 0' },
            })}
            type="number"
            step="0.01"
            placeholder="0.00"
            disabled={isSubmitting}
            className="bg-transparent text-slate-200 placeholder:text-slate-600"
          />
          {errors.amount && (
            <FieldError className="text-xs text-slate-400">{errors.amount.message}</FieldError>
          )}
        </TextField>
      </div>

      <TextField isInvalid={!!errors.description} className="w-full flex flex-col gap-1.5">
        <Label className="text-sm text-slate-400 font-heading font-medium tracking-wide">Descripción</Label>
        <Input
          {...register('description', {
            required: 'La descripción es requerida',
            minLength: { value: 3, message: 'Mínimo 3 caracteres' },
          })}
          placeholder="Ej: Pago de servicios"
          disabled={isSubmitting}
          className="bg-transparent text-slate-200 placeholder:text-slate-600"
        />
        {errors.description && (
          <FieldError className="text-xs text-slate-400">{errors.description.message}</FieldError>
        )}
      </TextField>

      <TextField isInvalid={!!errors.category} className="w-full flex flex-col gap-1.5">
        <Label className="text-sm text-slate-400 font-heading font-medium tracking-wide">Categoría</Label>
        <Input
          {...register('category', {
            required: 'La categoría es requerida',
          })}
          placeholder="Ej: Alimentos, Transporte, etc."
          disabled={isSubmitting}
          className="bg-transparent text-slate-200 placeholder:text-slate-600"
        />
        {errors.category && (
          <FieldError className="text-xs text-slate-400">{errors.category.message}</FieldError>
        )}
      </TextField>

      <div className="flex gap-3 pt-1">
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onPress={onCancel}
            isDisabled={isSubmitting}
            className="flex-1 h-10 font-heading tracking-wide bg-navy-800/60 text-slate-400 hover:text-slate-200 border border-navy-600/30"
          >
            Cancelar
          </Button>
        )}
        <Button
          type="submit"
          variant="primary"
          className={`h-10 font-heading font-semibold bg-gradient-to-r from-blue-accent to-navy-500 text-white hover:from-blue-light hover:to-blue-accent border-none tracking-wide ${
            onCancel ? 'flex-1' : 'w-full'
          }`}
          isPending={isSubmitting}
          isDisabled={isSubmitting}
          size="lg"
        >
          {isSubmitting ? savingLabel : saveLabel}
        </Button>
      </div>
    </form>
  )
}
