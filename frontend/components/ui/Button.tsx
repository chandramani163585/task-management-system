import React from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

export function Button({ 
  className = '', 
  variant = 'primary', 
  size = 'md', 
  children, 
  disabled, 
  isLoading = false,
  ...props 
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center rounded-card font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-container',
    secondary: 'border border-outline text-on-surface hover:bg-surface-dim',
    ghost: 'bg-transparent text-on-surface hover:bg-surface-dim',
    danger: 'bg-error text-white hover:bg-red-700 focus:ring-red-500'
  }
  
  const sizes = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 py-2',
    lg: 'h-12 px-6 text-lg'
  }

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`

  return (
    <button className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  )
}
