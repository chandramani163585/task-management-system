'use client'

import React from 'react'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'
import { usePathname } from 'next/navigation'

interface WorkspaceShellProps {
  children: React.ReactNode
}

export function WorkspaceShell({ children }: WorkspaceShellProps) {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      <Sidebar currentPath={pathname} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
export default WorkspaceShell;
