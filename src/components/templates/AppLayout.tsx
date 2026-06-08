import { useState, useCallback } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import AppHeader from '../organisms/AppHeader'
import AppSidebar from '../organisms/AppSidebar'
import AppFooter from '../organisms/AppFooter'
import ThreeBackground from '../atoms/ThreeBackground'
import BackgroundEffects from '../atoms/BackgroundEffects'

export default function AppLayout() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = useCallback(() => setSidebarOpen((prev) => !prev), [])
  const closeSidebar = useCallback(() => setSidebarOpen(false), [])

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="min-h-screen flex flex-col bg-navy-900">
      <BackgroundEffects />
      <ThreeBackground />
      <AppHeader sidebarOpen={sidebarOpen} onToggleSidebar={toggleSidebar} />
      <AppSidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      <main className="flex-1 z-10 pt-16 lg:pl-64">
        <div className="min-h-[calc(100vh-4rem-3rem)]">
          <Outlet />
        </div>
      </main>

      <AppFooter />
    </div>
  )
}
