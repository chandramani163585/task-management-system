'use client'

import { useEffect } from 'react'
import { useThemeStore } from '@/lib/store/themeStore'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, colorMode } = useThemeStore()

  useEffect(() => {
    const root = document.documentElement
    
    // Handle theme (dark mode class)
    if (theme === 'dark') {
      root.classList.add('dark')
      root.setAttribute('data-theme', 'dark')
    } else {
      root.classList.remove('dark')
      root.setAttribute('data-theme', 'light')
    }

    // Handle color mode
    root.setAttribute('data-color', colorMode)
  }, [theme, colorMode])

  return <>{children}</>
}
