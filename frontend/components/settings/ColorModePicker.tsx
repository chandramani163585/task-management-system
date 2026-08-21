import React from 'react';
import { useTheme } from '@/lib/hooks/useTheme';

export default function ColorModePicker() {
  const { colorMode, updateColorMode } = useTheme();
  
  const colors = [
    { id: 'amber', name: 'Amber', bg: 'bg-amber-500' },
    { id: 'blue', name: 'Blue', bg: 'bg-blue-500' },
    { id: 'pink', name: 'Pink', bg: 'bg-pink-500' },
    { id: 'rose', name: 'Rose', bg: 'bg-rose-500' },
    { id: 'emerald', name: 'Emerald', bg: 'bg-emerald-500' },
    { id: 'black', name: 'Black', bg: 'bg-slate-900 dark:bg-slate-100' },
  ] as const;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {colors.map(color => (
        <button
          key={color.id}
          onClick={() => updateColorMode(color.id)}
          className={`flex items-center gap-3 p-4 rounded-xl border ${colorMode === color.id ? 'border-primary ring-1 ring-primary bg-primary/5' : 'border-outline-variant hover:bg-surface-container-low'} transition-all`}
        >
          <div className={`w-8 h-8 rounded-full ${color.bg} shrink-0`}></div>
          <span className="font-label-md text-on-surface font-medium">{color.name}</span>
          {colorMode === color.id && (
            <span className="material-symbols-outlined ml-auto text-primary text-[20px]">check_circle</span>
          )}
        </button>
      ))}
    </div>
  );
}
