import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../services/api'
import type { Transaction, CreateTransactionPayload, UpdateTransactionPayload } from '../services/types'

export const transactionKeys = {
  all: ['transactions'] as const,
}

export function useTransactions() {
  return useQuery({
    queryKey: transactionKeys.all,
    queryFn: async ({ signal }) => {
      const { data } = await api.get<Transaction[]>('/transactions', { signal })
      return data
    },
  })
}

export function useTransaction(id: string) {
  return useQuery({
    queryKey: [...transactionKeys.all, id],
    queryFn: async ({ signal }) => {
      const { data } = await api.get<Transaction>(`/transactions/${id}`, {
        signal,
      })
      return data
    },
    enabled: !!id,
  })
}

export function useCreateTransaction() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: CreateTransactionPayload) => {
      const { data } = await api.post<Transaction>('/transactions', payload)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: transactionKeys.all })
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
    },
  })
}

export function useUpdateTransaction() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, ...payload }: UpdateTransactionPayload & { id: string }) => {
      const { data } = await api.put<Transaction>(`/transactions/${id}`, payload)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: transactionKeys.all })
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
    },
  })
}

export function useDeleteTransaction() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/transactions/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: transactionKeys.all })
    },
  })
}
