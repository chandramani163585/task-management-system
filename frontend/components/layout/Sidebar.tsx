'use client'

import React from 'react'
import Link from 'next/link'
import { useThemeStore } from '@/lib/store/themeStore'
import { useAuth } from '@/lib/hooks/useAuth'
import { usersApi } from '@/lib/api/users'
import { Avatar } from '@/components/ui/Avatar'

interface SidebarProps {
  currentPath?: string
}

export function Sidebar({ currentPath = '/tasks' }: SidebarProps) {
  const { theme, setTheme, colorMode, setColorMode } = useThemeStore()
  const { user } = useAuth()

  const links = [
    { label: 'Tasks', href: '/tasks', icon: 'grid_view' },
    { label: 'Board', href: '/tasks/board', icon: 'view_column' },
    { label: 'Settings', href: '/settings/profile', icon: 'settings' },
  ]

  const handleThemeChange = async (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    try {
      await usersApi.updateAppearance({ theme: newTheme });
    } catch (e) {
      // Background sync
    }
  }

  const handleColorChange = async (newColor: any) => {
    setColorMode(newColor);
    try {
      await usersApi.updateAppearance({ color_mode: newColor });
    } catch (e) {
      // Background sync
    }
  }

  const displayName = user?.full_name || user?.name || user?.username || 'User';
  const displayEmail = user?.email || 'user@example.com';

  return (
    <div className="flex h-full w-[240px] flex-col border-r border-outline-variant bg-surface shrink-0">
      <div className="p-4 border-b border-outline-variant flex items-center justify-between">
        <Link href="/tasks" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-primary rounded flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-[18px]">change_history</span>
          </div>
          <h1 className="text-xl font-bold text-on-surface tracking-tight">Pyramid</h1>
        </Link>
      </div>
      
      <nav className="flex-1 space-y-1 p-3">
        {links.map(link => {
          const isActive = currentPath === link.href || (link.href !== '/tasks' && currentPath.startsWith(link.href))
          return (
            <Link
              key={link.label}
              href={link.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-primary/10 text-primary font-semibold border-l-2 border-primary' 
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-dim'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">{link.icon}</span>
              {link.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-outline-variant p-4 space-y-4">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Theme</label>
          <div className="flex gap-2">
            <button 
              onClick={() => handleThemeChange('light')} 
              className={`flex-1 text-xs py-1.5 rounded-lg font-medium transition-all ${theme === 'light' ? 'bg-primary text-white shadow-sm' : 'bg-surface-dim text-on-surface hover:bg-surface-dim/80'}`}
            >
              Light
            </button>
            <button 
              onClick={() => handleThemeChange('dark')} 
              className={`flex-1 text-xs py-1.5 rounded-lg font-medium transition-all ${theme === 'dark' ? 'bg-primary text-white shadow-sm' : 'bg-surface-dim text-on-surface hover:bg-surface-dim/80'}`}
            >
              Dark
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Accent Color</label>
          <select 
            value={colorMode} 
            onChange={(e) => handleColorChange(e.target.value as any)}
            className="w-full rounded-lg text-sm px-3 py-1.5 border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {['amber', 'blue', 'pink', 'rose', 'emerald', 'black'].map(c => (
              <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
            ))}
          </select>
        </div>

        <Link href="/settings/profile" className="flex items-center gap-3 pt-3 border-t border-outline-variant hover:opacity-80 transition-opacity">
          <Avatar 
            name={displayName} 
            src={user?.avatar_url} 
            fallback={displayName.charAt(0).toUpperCase()} 
            size="sm" 
          />
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-on-surface truncate">{displayName}</span>
            <span className="text-xs text-on-surface-variant truncate">{displayEmail}</span>
          </div>
        </Link>
      </div>
    </div>
  )
}
