export interface Account {
  id: string
  name: string
  balance: string
  currency: string
  color: string
  createdAt: number
}

export interface Transaction {
  id: string
  accountId: string
  name: string
  amount: string
  type: string
  description: string
  date: number
  category: string
}

export interface CreateAccountPayload {
  name: string
  balance?: string
  currency?: string
  color?: string
}

export interface CreateTransactionPayload {
  accountId: string
  name?: string
  amount: string
  type: string
  description: string
  category: string
  date?: number
}

export type UpdateTransactionPayload = Partial<Omit<CreateTransactionPayload, 'accountId'>>
