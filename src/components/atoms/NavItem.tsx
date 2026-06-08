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
            ? 'bg-navy-600/40 text-blue-light border border-navy-500/30'
            : 'text-slate-500 hover:text-blue-light hover:bg-navy-700/50 border border-transparent'
        }`
      }
    >
      <span className="flex-shrink-0">{icon}</span>
      {!collapsed && (
        <span className="text-sm font-heading font-medium tracking-wide">{label}</span>
      )}
    </NavLink>
  )
}
