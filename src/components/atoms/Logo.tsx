import { Link } from 'react-router-dom'

interface LogoProps {
  collapsed?: boolean
}

export default function Logo({ collapsed }: LogoProps) {
  return (
    <Link
      to="/dashboard"
      className="flex items-center gap-2.5 text-white no-underline group"
    >
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-accent to-navy-500 flex items-center justify-center flex-shrink-0 text-sm font-bold group-hover:shadow-lg group-hover:shadow-blue-accent/20 transition-shadow tracking-wide">
        T
      </div>
      {!collapsed && (
        <span className="text-lg font-heading font-bold tracking-wide text-gold-400">
          TCOPOS
        </span>
      )}
    </Link>
  )
}
