interface UserAvatarProps {
  name: string
  size?: 'sm' | 'md'
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
}

export default function UserAvatar({ name, size = 'sm' }: UserAvatarProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-blue-accent to-navy-500 flex items-center justify-center text-white font-heading font-bold flex-shrink-0 tracking-wide`}
      aria-label={name}
    >
      {initials || 'U'}
    </div>
  )
}
