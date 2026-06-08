import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useAuthStore } from '../store/authStore'

const MOCK_EMAIL = 'test@test.com'
const DELAY_MS = 800

interface LoginFormValues {
  email: string
  password: string
}

export function useLoginForm() {
  const navigate = useNavigate()
  const login = useAuthStore((s) => s.login)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormValues>({
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = useCallback(
    async (values: LoginFormValues) => {
      await new Promise((r) => setTimeout(r, DELAY_MS))

      if (values.email !== MOCK_EMAIL) {
        setError('email', { message: 'Este correo no está registrado' })
        return
      }

      if (values.password.length < 1) {
        setError('password', { message: 'La contraseña es requerida' })
        return
      }

      login('mock-token')
      toast.success('Bienvenido a TCOPOS')
      navigate('/dashboard', { replace: true })
    },
    [login, navigate, setError],
  )

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
  }
}
