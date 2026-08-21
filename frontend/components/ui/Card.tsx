import React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function Card({ children, className = '', onClick, ...props }: CardProps) {
  const hoverClass = onClick ? 'hover:shadow-md cursor-pointer transition-shadow' : ''
  return (
    <div 
      className={`rounded-card border border-outline-variant bg-surface p-card ${hoverClass} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  )
}
