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
      className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-200 hover:bg-navy-700/50 transition-colors cursor-pointer"
      aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
    >
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </button>
  )
}
