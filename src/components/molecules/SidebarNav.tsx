import NavItem from '../atoms/NavItem'
import { DashboardIcon, AccountIcon } from '../atoms/Icons'

interface SidebarNavProps {
  collapsed?: boolean
  onNavigate?: () => void
}

export default function SidebarNav({ collapsed, onNavigate }: SidebarNavProps) {
  return (
    <nav className="space-y-1" aria-label="Navegación principal">
      <NavItem
        to="/dashboard"
        icon={<DashboardIcon />}
        label="Dashboard"
        collapsed={collapsed}
        onClick={onNavigate}
      />
      <NavItem
        to="/accounts"
        icon={<AccountIcon />}
        label="Cuentas"
        collapsed={collapsed}
        onClick={onNavigate}
      />
    </nav>
  )
}
