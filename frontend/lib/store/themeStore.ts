import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeState {
  theme: 'light' | 'dark'
  colorMode: 'amber' | 'blue' | 'pink' | 'rose' | 'emerald' | 'black'
  setTheme: (theme: 'light' | 'dark') => void
  setColorMode: (colorMode: 'amber' | 'blue' | 'pink' | 'rose' | 'emerald' | 'black') => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',
      colorMode: 'blue',
      setTheme: (theme) => set({ theme }),
      setColorMode: (colorMode) => set({ colorMode }),
    }),
    {
      name: 'theme-storage',
    }
  )
)
