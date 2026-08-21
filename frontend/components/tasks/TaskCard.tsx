'use client';

import React from 'react';
import { Task } from '@/lib/types';
import { Avatar } from '@/components/ui/Avatar';
import { Dropdown } from '@/components/ui/Dropdown';
import Link from 'next/link';

interface TaskCardProps {
  task: Task;
  onStatusChange?: (status: string) => void;
  onDelete?: () => void;
}

export default function TaskCard({ task, onStatusChange, onDelete }: TaskCardProps) {
  const isCompleted = task.status === 'completed';
  
  const getDateStr = () => {
    if (!task.due_date) return null;
    const date = new Date(task.due_date);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  };

  const priorityColors = {
    urgent: 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400',
    high: 'bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400',
    medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-400',
    low: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  };

  const menuItems = [
    {
      label: 'Move to To Do',
      onClick: () => onStatusChange?.('todo'),
    },
    {
      label: 'Move to Doing',
      onClick: () => onStatusChange?.('doing'),
    },
    {
      label: 'Move to Completed',
      onClick: () => onStatusChange?.('completed'),
    },
    {
      label: 'Delete Card',
      onClick: () => onDelete?.(),
    },
  ];

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', task.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div 
      draggable
      onDragStart={handleDragStart}
      className={`bg-surface rounded-xl border border-outline-variant p-4 hover:border-primary/50 hover:shadow-md transition-all cursor-grab active:cursor-grabbing group relative overflow-hidden ${
        isCompleted ? 'opacity-85 hover:opacity-100' : ''
      }`}
    >
      {task.status === 'doing' && (
        <div className="absolute inset-y-0 left-0 w-1.5 bg-primary"></div>
      )}
      
      <div className="relative z-10 pl-1">
        <div className="flex justify-between items-start mb-2 gap-2">
          <Link href={`/tasks/${task.id}`} className="flex-1">
            <h3 className={`font-label-md text-label-md font-semibold text-on-surface leading-snug hover:text-primary transition-colors ${
              isCompleted ? 'line-through text-on-surface-variant' : ''
            }`}>
              {task.title}
            </h3>
          </Link>
          
          <Dropdown
            align="right"
            trigger={
              <button className="text-on-surface-variant opacity-70 group-hover:opacity-100 p-1 rounded hover:bg-surface-dim transition-all">
                <span className="material-symbols-outlined text-[18px]">more_horiz</span>
              </button>
            }
            items={menuItems}
          />
        </div>

        {task.description && (
          <p className="text-xs text-on-surface-variant line-clamp-2 mb-3">
            {task.description}
          </p>
        )}
        
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-outline-variant/40">
          <div className="flex items-center gap-1.5">
            {task.assignees && task.assignees.length > 0 ? (
              <div className="flex items-center gap-1.5">
                <Avatar 
                  src={task.assignees[0].avatar_url}
                  fallback={task.assignees[0].full_name?.substring(0, 2).toUpperCase() || task.assignees[0].username?.substring(0, 2).toUpperCase() || 'U'}
                  size="sm"
                />
                <span className="font-label-sm text-label-sm text-on-surface-variant max-w-[80px] truncate">
                  {task.assignees[0].full_name || task.assignees[0].username}
                </span>
                {task.assignees.length > 1 && (
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-bold">
                    +{task.assignees.length - 1}
                  </span>
                )}
              </div>
            ) : (
              <span className="font-label-sm text-label-sm text-on-surface-variant italic">Unassigned</span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
              priorityColors[task.priority as keyof typeof priorityColors] || priorityColors.medium
            }`}>
              {task.priority}
            </span>

            {task.due_date && (
              <div className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[11px] font-medium ${
                isCompleted 
                  ? 'text-on-surface-variant bg-surface-dim' 
                  : 'text-error bg-error-container/30'
              }`}>
                <span className="material-symbols-outlined text-[13px]">event</span>
                {getDateStr()}
              </div>
            )}
          </div>
        </div>

        {/* Labels display */}
        {task.labels && task.labels.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2.5">
            {task.labels.map(l => (
              <span 
                key={l.id}
                style={{ backgroundColor: `${l.color}20`, color: l.color, borderColor: `${l.color}40` }}
                className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold border"
              >
                {l.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
