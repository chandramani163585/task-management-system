'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useTasks } from '@/lib/hooks/useTasks';
import { workspacesApi } from '@/lib/api/workspaces';
import KanbanColumn from '@/components/tasks/KanbanColumn';
import TaskCard from '@/components/tasks/TaskCard';
import CreateTaskModal from '@/components/tasks/CreateTaskModal';
import Link from 'next/link';

export default function TasksBoardPage() {
  const [workspaceId, setWorkspaceId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createModalStatus, setCreateModalStatus] = useState('todo');

  const { tasks, isLoading, fetchTasks, createTask, updateTaskStatus, deleteTask } = useTasks(workspaceId);

  useEffect(() => {
    async function loadWorkspace() {
      try {
        const ws = await workspacesApi.getCurrent();
        if (ws?.id) {
          setWorkspaceId(ws.id);
        }
      } catch (e) {
        setWorkspaceId('851056cb-aa73-4035-9b19-eabd24304852');
      }
    }
    loadWorkspace();
  }, []);

  useEffect(() => {
    if (workspaceId) {
      fetchTasks();
    }
  }, [workspaceId, fetchTasks]);

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = !searchQuery || 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;

      return matchesSearch && matchesPriority;
    });
  }, [tasks, searchQuery, filterPriority]);

  const todoTasks = filteredTasks.filter(t => t.status === 'todo' || t.status === 'backlog');
  const doingTasks = filteredTasks.filter(t => t.status === 'doing');
  const completedTasks = filteredTasks.filter(t => t.status === 'completed');

  const handleOpenCreateModal = (status = 'todo') => {
    setCreateModalStatus(status);
    setIsCreateModalOpen(true);
  };

  const handleDropTask = async (taskId: string, targetStatus: string) => {
    await updateTaskStatus(taskId, targetStatus);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-background overflow-hidden">
      {/* Page Header Actions */}
      <div className="px-container-margin py-4 shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant bg-surface">
        <div>
          <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface">Tasks Board</h1>
          <p className="text-xs text-on-surface-variant mt-0.5">Drag and drop tasks between columns to update status</p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Search bar */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
              search
            </span>
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter board..."
              className="pl-9 pr-3 py-1.5 text-sm rounded-lg border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary w-40 sm:w-52"
            />
          </div>

          <Link href="/tasks">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-outline-variant bg-surface hover:bg-surface-dim transition-colors text-on-surface font-label-md text-label-md">
              <span className="material-symbols-outlined text-[18px]">view_list</span>
              List View
            </button>
          </Link>

          {/* Filter button & dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border border-outline-variant transition-colors text-on-surface font-label-md text-label-md ${
                filterPriority !== 'all' ? 'bg-primary text-white border-primary' : 'bg-surface hover:bg-surface-dim'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">filter_list</span>
              {filterPriority !== 'all' ? `Priority: ${filterPriority}` : 'Filter'}
            </button>

            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-surface border border-outline-variant rounded-xl shadow-lg p-2 z-30 animate-in fade-in">
                <div className="text-xs font-bold text-on-surface-variant px-2 py-1 uppercase tracking-wider">Priority</div>
                {['all', 'urgent', 'high', 'medium', 'low'].map(p => (
                  <button
                    key={p}
                    onClick={() => {
                      setFilterPriority(p);
                      setIsFilterOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-sm rounded-lg capitalize transition-colors ${
                      filterPriority === p ? 'bg-primary/10 text-primary font-semibold' : 'text-on-surface hover:bg-surface-dim'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button 
            onClick={() => handleOpenCreateModal('todo')}
            className="flex items-center gap-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-container transition-colors font-label-md text-label-md shadow-sm ml-1"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            Add Task
          </button>
        </div>
      </div>

      {/* Kanban Board Area */}
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center text-on-surface-variant">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mr-3"></div>
          Loading tasks board...
        </div>
      ) : (
        <div className="flex-1 overflow-x-auto overflow-y-hidden p-container-margin kanban-scroll" style={{ scrollbarWidth: 'thin' }}>
          <div className="flex gap-6 h-full items-start min-w-max pb-4">
            <KanbanColumn 
              title="To Do" 
              status="todo"
              count={todoTasks.length}
              onAddTask={() => handleOpenCreateModal('todo')}
              onDropTask={handleDropTask}
            >
              {todoTasks.map(task => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onStatusChange={(status) => updateTaskStatus(task.id, status)}
                  onDelete={() => deleteTask(task.id)}
                />
              ))}
              {todoTasks.length === 0 && (
                <div className="p-8 text-center text-on-surface-variant text-xs italic border border-dashed border-outline-variant/60 rounded-xl">
                  No tasks to do
                </div>
              )}
            </KanbanColumn>

            <KanbanColumn 
              title="Doing" 
              status="doing"
              count={doingTasks.length}
              onAddTask={() => handleOpenCreateModal('doing')}
              onDropTask={handleDropTask}
            >
              {doingTasks.map(task => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onStatusChange={(status) => updateTaskStatus(task.id, status)}
                  onDelete={() => deleteTask(task.id)}
                />
              ))}
              {doingTasks.length === 0 && (
                <div className="p-8 text-center text-on-surface-variant text-xs italic border border-dashed border-outline-variant/60 rounded-xl">
                  No tasks in progress
                </div>
              )}
            </KanbanColumn>

            <KanbanColumn 
              title="Completed" 
              status="completed"
              count={completedTasks.length}
              onAddTask={() => handleOpenCreateModal('completed')}
              onDropTask={handleDropTask}
            >
              {completedTasks.map(task => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onStatusChange={(status) => updateTaskStatus(task.id, status)}
                  onDelete={() => deleteTask(task.id)}
                />
              ))}
              {completedTasks.length === 0 && (
                <div className="p-8 text-center text-on-surface-variant text-xs italic border border-dashed border-outline-variant/60 rounded-xl">
                  No completed tasks
                </div>
              )}
            </KanbanColumn>
          </div>
        </div>
      )}

      {/* Task Creation Modal */}
      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={async (data) => {
          await createTask(data);
        }}
        defaultStatus={createModalStatus}
      />
    </div>
  );
}
