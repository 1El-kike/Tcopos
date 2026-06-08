import { Button } from '@heroui/react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import UserAvatar from '../atoms/UserAvatar'
import { LogOutIcon } from '../atoms/Icons'

export default function UserMenu() {
  const logout = useAuthStore((s) => s.logout)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    toast.success('Sesión cerrada')
    navigate('/', { replace: true })
  }

  return (
    <div className="flex items-center gap-3">
      <div className="hidden sm:flex items-center gap-2">
        <UserAvatar name="Usuario TCOPOS" />
        <div className="text-left">
          <p className="text-sm font-medium text-white leading-tight">Usuario</p>
          <p className="text-xs text-slate-400">test@test.com</p>
        </div>
      </div>
      <Button
        isIconOnly
        variant="ghost"
        onPress={handleLogout}
        className="text-slate-400 hover:text-red-400 transition-colors"
        aria-label="Cerrar sesión"
      >
        <LogOutIcon />
      </Button>
    </div>
  )
}
