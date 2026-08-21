'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { tasksApi } from '@/lib/api/tasks';
import { Task } from '@/lib/types';
import TaskDetailPanel from '@/components/tasks/TaskDetailPanel';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function TaskDetailPage() {
  const params = useParams();
  const taskId = params.id as string;
  
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadTask() {
      if (!taskId) return;
      setIsLoading(true);
      try {
        const data = await tasksApi.getTask(taskId);
        setTask(data);
      } catch (err: any) {
        toast.error(`Failed to load task: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    }
    loadTask();
  }, [taskId]);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Task link copied to clipboard!');
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-background">
      {/* Top Bar Navigation */}
      <div className="px-6 py-4 border-b border-outline-variant flex items-center justify-between bg-surface shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/tasks">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant hover:bg-surface-dim text-on-surface transition-colors">
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            </button>
          </Link>
          <span className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1.5">
            <Link href="/tasks" className="hover:text-primary transition-colors">Tasks</Link>
            <span>/</span>
            <span className="text-on-surface font-semibold truncate max-w-md">{task?.title || 'Loading...'}</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-outline-variant rounded-lg text-on-surface hover:bg-surface-dim transition-colors font-label-sm text-sm"
          >
            <span className="material-symbols-outlined text-[16px]">share</span>
            Share
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 md:p-8 kanban-scroll">
        {isLoading ? (
          <div className="flex justify-center items-center h-64 text-on-surface-variant">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mr-3"></div>
            Loading task details...
          </div>
        ) : task ? (
          <TaskDetailPanel task={task} onTaskUpdated={(updated) => setTask(updated)} />
        ) : (
          <div className="text-center py-16 text-on-surface-variant">
            <p className="text-base font-semibold">Task not found</p>
            <Link href="/tasks" className="text-primary hover:underline text-sm mt-2 inline-block">
              ← Return to Tasks
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
