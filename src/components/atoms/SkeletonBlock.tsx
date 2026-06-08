interface SkeletonBlockProps {
  className?: string
}

export default function SkeletonBlock({ className = '' }: SkeletonBlockProps) {
  return <div className={`bg-navy-700/40 rounded-xl animate-pulse ${className}`} />
}
