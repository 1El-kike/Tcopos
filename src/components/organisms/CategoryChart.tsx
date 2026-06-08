import { useMemo } from 'react'
import { Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import type { Transaction } from '../../services/types'

ChartJS.register(ArcElement, Tooltip, Legend)

const INCOME_COLORS = [
  '#3b82f6', '#2563eb', '#60a5fa', '#93bbfd', '#1d4ed8',
]

const EXPENSE_COLORS = [
  '#1e3a8a', '#162a50', '#0f1a3e', '#334155', '#475569',
]

interface CategoryChartProps {
  transactions: Transaction[]
  currency: string
}

export default function CategoryChart({ transactions, currency }: CategoryChartProps) {
  const { incomeByCategory, expenseByCategory } = useMemo(() => {
    const income: Record<string, number> = {}
    const expense: Record<string, number> = {}

    for (const tx of transactions) {
      const amt = Number(tx.amount)
      if (tx.type === 'deposit') {
        income[tx.category] = (income[tx.category] ?? 0) + amt
      } else {
        expense[tx.category] = (expense[tx.category] ?? 0) + amt
      }
    }

    return { incomeByCategory: income, expenseByCategory: expense }
  }, [transactions])

  const incomeCategories = Object.keys(incomeByCategory)
  const expenseCategories = Object.keys(expenseByCategory)
  const hasData = incomeCategories.length > 0 || expenseCategories.length > 0

  if (!hasData) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500 font-heading tracking-wide">No hay datos para mostrar en el gráfico.</p>
      </div>
    )
  }

  const fmt = (n: number) =>
    new Intl.NumberFormat('es-DO', { style: 'currency', currency }).format(n)

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#94a3b8',
          padding: 16,
          usePointStyle: true,
          font: { size: 11, family: 'Outfit, sans-serif' },
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx: { parsed: number; label: string }) =>
            `${ctx.label}: ${fmt(ctx.parsed)}`,
        },
      },
    },
  }

  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {incomeCategories.length > 0 && (
        <div>
          <h3 className="text-sm font-heading font-semibold text-blue-light mb-3 text-center tracking-wide">
            Ingresos por categoría
          </h3>
          <div className="h-56">
            <Doughnut
              data={{
                labels: incomeCategories,
                datasets: [
                  {
                    data: Object.values(incomeByCategory),
                    backgroundColor: INCOME_COLORS.slice(0, incomeCategories.length),
                    borderWidth: 1,
                    borderColor: '#1e3a8a',
                  },
                ],
              }}
              options={chartOptions}
            />
          </div>
        </div>
      )}

      {expenseCategories.length > 0 && (
        <div>
          <h3 className="text-sm font-heading font-semibold text-slate-400 mb-3 text-center tracking-wide">
            Egresos por categoría
          </h3>
          <div className="h-56">
            <Doughnut
              data={{
                labels: expenseCategories,
                datasets: [
                  {
                    data: Object.values(expenseByCategory),
                    backgroundColor: EXPENSE_COLORS.slice(0, expenseCategories.length),
                    borderWidth: 1,
                    borderColor: '#0a1628',
                  },
                ],
              }}
              options={chartOptions}
            />
          </div>
        </div>
      )}
    </div>
  )
}
