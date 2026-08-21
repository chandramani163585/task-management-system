'use client';

import React from 'react';

interface KanbanColumnProps {
  title: string;
  status: string;
  count: number;
  children: React.ReactNode;
  onAddTask?: () => void;
  onDropTask?: (taskId: string, targetStatus: string) => void;
}

export default function KanbanColumn({ 
  title, 
  status,
  count, 
  children, 
  onAddTask,
  onDropTask 
}: KanbanColumnProps) {
  const [isOver, setIsOver] = React.useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (!isOver) setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(false);
    const taskId = e.dataTransfer.getData('text/plain');
    if (taskId && onDropTask) {
      onDropTask(taskId, status);
    }
  };

  return (
    <div 
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`w-[340px] bg-surface rounded-2xl border transition-colors flex flex-col max-h-full shadow-sm shrink-0 ${
        isOver ? 'border-primary ring-2 ring-primary/20 bg-primary/5' : 'border-outline-variant'
      }`}
    >
      <div className="p-4 flex items-center justify-between border-b border-outline-variant shrink-0">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-on-surface-variant">drag_indicator</span>
          <h2 className="font-headline-md text-headline-md font-bold text-on-surface">{title}</h2>
          <span className="bg-surface-dim text-on-surface-variant px-2.5 py-0.5 rounded-full text-xs font-semibold ml-1">
            {count}
          </span>
        </div>
        <div className="flex items-center gap-1 text-on-surface-variant">
          <button 
            onClick={onAddTask} 
            className="p-1 hover:bg-surface-dim rounded-lg transition-colors text-on-surface"
            title={`Add task to ${title}`}
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
          </button>
        </div>
      </div>

      <div className="p-3 flex flex-col gap-3 overflow-y-auto flex-1 kanban-scroll" style={{ scrollbarWidth: 'thin' }}>
        {children}
        
        <button 
          onClick={onAddTask}
          className="flex items-center gap-2 p-3 text-on-surface-variant hover:text-on-surface hover:bg-surface-dim rounded-xl transition-colors font-label-md text-label-md w-full justify-start mt-1 border border-dashed border-outline-variant"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Add Task
        </button>
      </div>
    </div>
  );
}
