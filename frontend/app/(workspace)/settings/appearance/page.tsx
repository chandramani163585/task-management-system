'use client';

import React from 'react';
import ColorModePicker from '@/components/settings/ColorModePicker';
import ThemePicker from '@/components/settings/ThemePicker';

export default function AppearancePage() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-6">
      <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface mb-8">Appearance</h1>
      
      <div className="mb-12">
        <h2 className="font-headline-sm text-on-surface mb-4">Theme</h2>
        <ThemePicker />
      </div>

      <div>
        <h2 className="font-headline-sm text-on-surface mb-4">Color Mode</h2>
        <ColorModePicker />
      </div>
    </div>
  );
}
