import React from 'react';
import { useTheme } from '@/lib/hooks/useTheme';

export default function ThemePicker() {
  const { theme, updateTheme } = useTheme();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <button
        onClick={() => updateTheme('light')}
        className={`flex flex-col items-center gap-4 p-8 rounded-2xl border ${theme === 'light' ? 'border-primary ring-2 ring-primary bg-primary/5' : 'border-outline-variant hover:bg-surface-container-low'} transition-all`}
      >
        <span className="material-symbols-outlined text-5xl text-on-surface">light_mode</span>
        <span className="font-label-lg text-on-surface font-semibold text-lg">Light Mode</span>
      </button>

      <button
        onClick={() => updateTheme('dark')}
        className={`flex flex-col items-center gap-4 p-8 rounded-2xl border ${theme === 'dark' ? 'border-primary ring-2 ring-primary bg-primary/5' : 'border-outline-variant hover:bg-surface-container-low'} transition-all`}
      >
        <span className="material-symbols-outlined text-5xl text-on-surface">dark_mode</span>
        <span className="font-label-lg text-on-surface font-semibold text-lg">Dark Mode</span>
      </button>
    </div>
  );
}
