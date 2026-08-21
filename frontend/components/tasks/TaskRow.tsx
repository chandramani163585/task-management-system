'use client';

import React, { useState } from 'react';
import { Task } from '@/lib/types';
import { Avatar } from '@/components/ui/Avatar';
import { Dropdown } from '@/components/ui/Dropdown';
import Link from 'next/link';

interface TaskRowProps {
  task: Task;
  onStatusChange?: (status: string) => void;
  onDelete?: () => void;
}

export default function TaskRow({ task, onStatusChange, onDelete }: TaskRowProps) {
  const priorityColors = {
    low: 'bg-surface-container-high text-on-surface-variant',
    medium: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
    high: 'bg-error-container text-error',
    urgent: 'bg-error text-on-error',
  };

  const priorityIcons = {
    low: 'signal_cellular_alt_1_bar',
    medium: 'signal_cellular_alt_2_bar',
    high: 'signal_cellular_alt',
    urgent: 'warning',
  };

  const menuItems = [
    {
      label: 'Mark as To Do',
      onClick: () => onStatusChange?.('todo'),
    },
    {
      label: 'Mark as Doing',
      onClick: () => onStatusChange?.('doing'),
    },
    {
      label: 'Mark as Completed',
      onClick: () => onStatusChange?.('completed'),
    },
    {
      label: 'Delete Task',
      onClick: () => onDelete?.(),
    },
  ];

  return (
    <tr className="hover:bg-surface-container-lowest transition-colors group">
      <td className="py-3.5 px-4 font-medium">
        <Link href={`/tasks/${task.id}`} className="text-on-surface hover:text-primary font-semibold transition-colors flex items-center gap-2">
          {task.status === 'completed' && (
            <span className="material-symbols-outlined text-green-600 text-[18px]">check_circle</span>
          )}
          <span className={task.status === 'completed' ? 'line-through text-on-surface-variant' : ''}>
            {task.title}
          </span>
        </Link>
      </td>
      <td className="py-3.5 px-4">
        <div className={`flex w-fit items-center gap-1 font-label-sm text-label-sm px-2 py-1 rounded ${priorityColors[task.priority] || priorityColors.medium}`}>
          <span className="material-symbols-outlined text-[14px]">
            {priorityIcons[task.priority] || priorityIcons.medium}
          </span>
          <span className="capitalize">{task.priority}</span>
        </div>
      </td>
      <td className="py-3.5 px-4">
        <div className="flex -space-x-2">
          {task.assignees?.slice(0, 3).map((user) => (
            <Avatar 
              key={user.id} 
              src={user.avatar_url} 
              fallback={user.full_name?.substring(0, 2).toUpperCase() || user.name?.substring(0, 2).toUpperCase() || 'U'} 
              size="sm" 
              className="border-2 border-surface"
            />
          ))}
          {task.assignees && task.assignees.length > 3 && (
            <div className="w-8 h-8 rounded-full border-2 border-surface bg-surface-container-highest flex items-center justify-center text-[10px] font-bold text-on-surface-variant z-10">
              +{task.assignees.length - 3}
            </div>
          )}
          {(!task.assignees || task.assignees.length === 0) && (
            <div className="w-8 h-8 rounded-full border border-dashed border-outline-variant flex items-center justify-center text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px]">person</span>
            </div>
          )}
        </div>
      </td>
      <td className="py-3.5 px-4 text-on-surface-variant text-sm">
        {task.due_date ? new Date(task.due_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}
      </td>
      <td className="py-3.5 px-4 text-center">
        <Dropdown
          align="right"
          trigger={
            <button className="text-outline hover:text-on-surface-variant transition-colors opacity-80 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-surface-variant">
              <span className="material-symbols-outlined text-lg">more_horiz</span>
            </button>
          }
          items={menuItems}
        />
      </td>
    </tr>
  );
}
