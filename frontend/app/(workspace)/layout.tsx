'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import WorkspaceShell from '@/components/layout/WorkspaceShell';

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isHydrated } = useAuth();
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted && isHydrated && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isHydrated, hasMounted, router]);

  // Wait until client has mounted and store has hydrated from localStorage
  if (!hasMounted || !isHydrated) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-surface">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <WorkspaceShell>
      {children}
    </WorkspaceShell>
  );
}
