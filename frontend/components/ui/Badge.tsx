import React from 'react'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'priority' | 'label' | 'status'
  value: string
  color?: string
}

export function Badge({ variant = 'label', value, color, className = '', ...props }: BadgeProps) {
  let colorClasses = 'bg-surface-dim text-on-surface'
  
  if (variant === 'priority') {
    const p = value.toLowerCase()
    if (p === 'urgent') colorClasses = 'bg-priority-urgent text-white'
    else if (p === 'high') colorClasses = 'bg-priority-high text-white'
    else if (p === 'medium') colorClasses = 'bg-priority-medium text-white'
    else if (p === 'low') colorClasses = 'bg-priority-low text-white'
  } else if (variant === 'label' && color) {
    // Just a fallback since arbitrary hex isn't easily mapped without style prop
    colorClasses = 'text-white'
  }

  const baseClasses = 'inline-flex items-center rounded-chip px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider'

  return (
    <span 
      className={`${baseClasses} ${colorClasses} ${className}`} 
      style={variant === 'label' && color ? { backgroundColor: color } : undefined}
      {...props}
    >
      {value}
    </span>
  )
}
