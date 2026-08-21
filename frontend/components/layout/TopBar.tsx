'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Avatar } from '@/components/ui/Avatar'
import { Dropdown } from '@/components/ui/Dropdown'
import { useAuth } from '@/lib/hooks/useAuth'

interface TopBarProps {
  workspaceName?: string
  searchQuery?: string
  onSearchChange?: (query: string) => void
}

export function TopBar({ 
  workspaceName = "Dexter's Workspace",
  searchQuery = '',
  onSearchChange
}: TopBarProps) {
  const { user, logout } = useAuth()
  const router = useRouter()

  const displayName = user?.full_name || user?.name || user?.username || 'User';

  const userMenuItems = [
    { 
      label: 'Profile Settings', 
      onClick: () => router.push('/settings/profile') 
    },
    { 
      label: 'Appearance Settings', 
      onClick: () => router.push('/settings/appearance') 
    },
    { 
      label: 'Logout', 
      onClick: async () => {
        await logout();
        router.push('/login');
      } 
    }
  ]

  return (
    <div className="flex h-16 w-full items-center justify-between border-b border-outline-variant bg-surface px-6 shrink-0">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold text-on-surface">{workspaceName}</h2>
      </div>

      <div className="flex items-center gap-4 w-96 max-w-md">
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Search tasks by title or description..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-surface-container-high dark:bg-surface-dim rounded-full border border-outline-variant/60 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Dropdown
          align="right"
          trigger={
            <div className="flex items-center gap-2 cursor-pointer hover:bg-surface-dim p-1.5 rounded-full transition-colors">
              <Avatar 
                name={displayName} 
                src={user?.avatar_url} 
                fallback={displayName.charAt(0).toUpperCase()}
                size="sm" 
              />
              <span className="text-sm font-medium text-on-surface hidden md:inline">{displayName}</span>
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">expand_more</span>
            </div>
          }
          items={userMenuItems}
        />
      </div>
    </div>
  )
}
