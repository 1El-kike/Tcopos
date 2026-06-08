import Logo from '../atoms/Logo'
import SidebarToggle from '../atoms/SidebarToggle'
import UserMenu from '../molecules/UserMenu'

interface AppHeaderProps {
  sidebarOpen: boolean
  onToggleSidebar: () => void
}

export default function AppHeader({ sidebarOpen, onToggleSidebar }: AppHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-navy-800/80 backdrop-blur-xl border-b border-navy-600/30">
      <div className="flex items-center justify-between h-full px-4 lg:pl-72">
        <div className="flex items-center gap-3">
          <SidebarToggle isOpen={sidebarOpen} onToggle={onToggleSidebar} />
          <div className="lg:hidden">
            <Logo />
          </div>
        </div>
        <UserMenu />
      </div>
    </header>
  )
}
