import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useMediaQuery } from '@heroui/react'
import Logo from '../atoms/Logo'
import SidebarToggle from '../atoms/SidebarToggle'
import SidebarNav from '../molecules/SidebarNav'

interface AppSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function AppSidebar({ isOpen, onClose }: AppSidebarProps) {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const sidebarRef = useRef<HTMLElement>(null)

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen && !isDesktop) onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, isDesktop, onClose])

  const sidebarContent = (
    <aside
      ref={sidebarRef}
      className="h-full flex flex-col bg-navy-800/95 backdrop-blur-xl border-r border-navy-600/30"
      aria-label="Menú lateral"
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-navy-600/20">
        <Logo />
        <div className="lg:hidden">
          <SidebarToggle isOpen onToggle={onClose} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <SidebarNav onNavigate={onClose} />
      </div>

      <div className="p-4 border-t border-navy-600/20">
        <p className="text-xs text-slate-600 text-center tracking-wide">TCOPOS v1.0</p>
      </div>
    </aside>
  )

  if (isDesktop) {
    return (
      <div className="fixed top-0 left-0 z-30 h-full w-64">
        {sidebarContent}
      </div>
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 bg-navy-900/70 backdrop-blur-sm lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 left-0 z-40 h-full w-64 shadow-2xl shadow-navy-900/50"
          >
            {sidebarContent}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
