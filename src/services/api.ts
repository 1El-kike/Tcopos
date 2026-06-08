import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { useAuthStore } from '../store/authStore'

export interface ApiError {
  message: string
  status: number
  errors?: Record<string, string[]>
}

function handleSessionExpired(): void {
  useAuthStore.getState().logout()
  window.location.href = '/'
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/api',
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string; errors?: Record<string, string[]> }>) => {
    if (error.response) {
      const { status, data } = error.response

      if (status === 401) {
        handleSessionExpired()
      }

      const apiError: ApiError = {
        message: data?.message ?? 'Ha ocurrido un error inesperado',
        status,
        errors: data?.errors,
      }

      return Promise.reject(apiError)
    }

    if (error.code === 'ECONNABORTED') {
      return Promise.reject<ApiError>({
        message: 'La solicitud tardó demasiado. Intenta de nuevo.',
        status: 0,
      })
    }

    if (!error.response) {
      return Promise.reject<ApiError>({
        message: 'Error de conexión. Verifica tu red.',
        status: 0,
      })
    }

    return Promise.reject<ApiError>({
      message: 'Ha ocurrido un error inesperado',
      status: 0,
    })
  },
)

export function setToken(token: string | null): void {
  if (token) {
    useAuthStore.getState().login(token)
  } else {
    useAuthStore.getState().logout()
  }
}

export default api
