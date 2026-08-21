import { useEffect } from 'react';
import { useThemeStore } from '../store/themeStore';
import { usersApi } from '../api/users';

export function useTheme() {
  const { theme, colorMode, setTheme, setColorMode } = useThemeStore();

  useEffect(() => {
    // Apply theme class to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Set color variable
    document.documentElement.setAttribute('data-color-mode', colorMode);
  }, [theme, colorMode]);

  const updateTheme = async (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    try {
      await usersApi.updateAppearance({ theme: newTheme });
    } catch (e) {
      // Silently fail if not logged in or backend error
    }
  };

  const updateColorMode = async (newColorMode: 'amber' | 'blue' | 'pink' | 'rose' | 'emerald' | 'black') => {
    setColorMode(newColorMode);
    try {
      await usersApi.updateAppearance({ color_mode: newColorMode });
    } catch (e) {
      // Silently fail
    }
  };

  return { theme, colorMode, updateTheme, updateColorMode };
}
