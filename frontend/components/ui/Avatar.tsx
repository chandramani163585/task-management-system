import React from 'react'

interface AvatarProps {
  src?: string | null
  name?: string | null
  fallback?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export function Avatar({ src, name, fallback, size = 'md', className = '' }: AvatarProps) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-24 h-24 text-2xl',
  }

  // If a direct fallback string is provided, use it; otherwise derive initials from name
  const initials =
    fallback ??
    (name
      ? name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .substring(0, 2)
          .toUpperCase()
      : '?')

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center rounded-full bg-primary text-white overflow-hidden ${sizes[size]} ${className}`}
    >
      {src ? (
        <img src={src} alt={name ?? fallback ?? 'avatar'} className="w-full h-full object-cover" />
      ) : (
        <span className="font-semibold">{initials}</span>
      )}
    </div>
  )
}

