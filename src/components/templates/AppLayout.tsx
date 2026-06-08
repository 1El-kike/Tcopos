import { useState, useCallback } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import AppHeader from '../organisms/AppHeader'
import AppSidebar from '../organisms/AppSidebar'
import AppFooter from '../organisms/AppFooter'
import ThreeBackground from '../atoms/ThreeBackground'

export default function AppLayout() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = useCallback(() => setSidebarOpen((prev) => !prev), [])
  const closeSidebar = useCallback(() => setSidebarOpen(false), [])

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="min-h-screen flex flex-col">
      <ThreeBackground />
      <AppHeader sidebarOpen={sidebarOpen} onToggleSidebar={toggleSidebar} />
      <AppSidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      <main className="flex-1 pt-16 lg:pl-64">
        <div className="min-h-[calc(100vh-4rem-3rem)] bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90">
          <Outlet />
        </div>
      </main>

      <AppFooter />
    </div>
  )
}
