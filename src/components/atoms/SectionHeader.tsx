import type { ReactNode } from 'react'

interface SectionHeaderProps {
  icon: ReactNode
  title: string
  children?: ReactNode
}

export default function SectionHeader({ icon, title, children }: SectionHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <h2 className="text-lg font-heading font-semibold text-gold-400 flex items-center gap-2 tracking-wide">
        {icon}
        {title}
      </h2>
      {children}
    </div>
  )
}
