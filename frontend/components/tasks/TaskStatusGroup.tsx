'use client';

import React, { useState } from 'react';

interface TaskStatusGroupProps {
  title: string;
  count: number;
  isOpenByDefault?: boolean;
  children: React.ReactNode;
  onAddTask?: () => void;
}

export default function TaskStatusGroup({ title, count, isOpenByDefault = true, children, onAddTask }: TaskStatusGroupProps) {
  const [isOpen, setIsOpen] = useState(isOpenByDefault);

  return (
    <div className={`flex flex-col gap-3 ${!isOpen ? 'opacity-70' : ''}`}>
      <div 
        className="flex items-center gap-2 cursor-pointer group w-fit" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`material-symbols-outlined text-on-surface-variant text-sm transition-transform group-hover:text-primary ${!isOpen ? '-rotate-90' : ''}`}>
          arrow_drop_down
        </span>
        <h3 className="font-headline-md text-headline-md font-semibold text-on-surface group-hover:text-primary transition-colors">
          {title}
        </h3>
        <span className="bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded-full text-xs font-medium ml-1">
          {count}
        </span>
      </div>
      
      {isOpen && (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-surface-container-low text-on-surface-variant font-label-md text-label-md border-b border-outline-variant">
                  <th className="py-3 px-4 font-medium w-2/5">Task</th>
                  <th className="py-3 px-4 font-medium w-1/6">Priority</th>
                  <th className="py-3 px-4 font-medium w-1/6">Members</th>
                  <th className="py-3 px-4 font-medium w-1/6">Due Date</th>
                  <th className="py-3 px-4 font-medium w-16 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="font-body-md text-body-md divide-y divide-outline-variant/50">
                {children}
              </tbody>
            </table>
          </div>
          <div 
            className="p-3 border-t border-outline-variant/50 hover:bg-surface-container-low transition-colors cursor-pointer text-on-surface-variant flex items-center gap-2 font-label-md text-label-md"
            onClick={onAddTask}
          >
            <span className="material-symbols-outlined text-lg">add</span>
            Add Task
          </div>
        </div>
      )}
    </div>
  );
}
