import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import api from '../services/api'
import type { Account, CreateAccountPayload } from '../services/types'

export const accountKeys = {
  all: ['accounts'] as const,
}

export function useAccounts() {
  return useQuery({
    queryKey: accountKeys.all,
    queryFn: async ({ signal }) => {
      const { data } = await api.get<Account[]>('/accounts', { signal })
      return data
    },
  })
}

export function useAccount(id: string) {
  return useQuery({
    queryKey: [...accountKeys.all, id],
    queryFn: async ({ signal }) => {
      const { data } = await api.get<Account>(`/accounts/${id}`, { signal })
      return data
    },
    enabled: !!id,
  })
}

export function useCreateAccount() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: CreateAccountPayload) => {
      const { data } = await api.post<Account>('/accounts', payload)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: accountKeys.all })
    },
    onError: () => {
      toast.error('Error al crear la cuenta')
    },
  })
}

export function useDeleteAccount() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/accounts/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: accountKeys.all })
    },
    onError: () => {
      toast.error('Error al eliminar la cuenta')
    },
  })
}
