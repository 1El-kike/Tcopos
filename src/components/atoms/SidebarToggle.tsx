import { MenuIcon, CloseIcon } from './Icons'

interface SidebarToggleProps {
  isOpen: boolean
  onToggle: () => void
}

export default function SidebarToggle({ isOpen, onToggle }: SidebarToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
      aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
    >
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </button>
  )
}
