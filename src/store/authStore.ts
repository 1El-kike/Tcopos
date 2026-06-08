import { create } from 'zustand'

const STORAGE_KEY = 'auth_token'

function loadToken(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

function saveToken(token: string | null) {
  if (token) {
    localStorage.setItem(STORAGE_KEY, token)
  } else {
    localStorage.removeItem(STORAGE_KEY)
  }
}

interface AuthState {
  token: string | null
  isAuthenticated: boolean
  login: (token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: loadToken(),
  isAuthenticated: !!loadToken(),
  login: (token) => {
    saveToken(token)
    set({ token, isAuthenticated: true })
  },
  logout: () => {
    saveToken(null)
    set({ token: null, isAuthenticated: false })
  },
}))
