import { NavLink } from 'react-router-dom'
import type { ReactNode } from 'react'

interface NavItemProps {
  to: string
  icon: ReactNode
  label: string
  collapsed?: boolean
  onClick?: () => void
}

export default function NavItem({ to, icon, label, collapsed, onClick }: NavItemProps) {
  return (
    <NavLink
      to={to}
      end
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-xl transition-all duration-200 cursor-pointer group ${
          collapsed ? 'justify-center p-3' : 'px-4 py-2.5'
        } ${
          isActive
            ? 'bg-blue-500/15 text-blue-400 border border-blue-500/20'
            : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
        }`
      }
    >
      <span className="flex-shrink-0">{icon}</span>
      {!collapsed && (
        <span className="text-sm font-medium">{label}</span>
      )}
    </NavLink>
  )
}
