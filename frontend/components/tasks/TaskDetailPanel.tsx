'use client';

import React, { useState, useEffect } from 'react';
import { Task } from '@/lib/types';
import { tasksApi } from '@/lib/api/tasks';
import { subtasksApi, commentsApi, resourcesApi, labelsApi } from '@/lib/api/taskDetails';
import SubtaskList from './SubtaskList';
import CommentList from './CommentList';
import ResourceList from './ResourceList';
import toast from 'react-hot-toast';

interface TaskDetailPanelProps {
  task: Task;
  onTaskUpdated?: (updatedTask: Task) => void;
}

export default function TaskDetailPanel({ task: initialTask, onTaskUpdated }: TaskDetailPanelProps) {
  const [task, setTask] = useState<Task>(initialTask);
  const [title, setTitle] = useState(initialTask.title);
  const [description, setDescription] = useState(initialTask.description || '');
  const [availableLabels, setAvailableLabels] = useState<any[]>([]);

  useEffect(() => {
    setTask(initialTask);
    setTitle(initialTask.title);
    setDescription(initialTask.description || '');
  }, [initialTask]);

  useEffect(() => {
    async function loadLabels() {
      try {
        const labels = await labelsApi.list();
        setAvailableLabels(labels);
      } catch (e) {
        // ignore
      }
    }
    loadLabels();
  }, []);

  const refreshTask = async () => {
    try {
      const updated = await tasksApi.getTask(task.id);
      setTask(updated);
      onTaskUpdated?.(updated);
    } catch (e) {
      // ignore
    }
  };

  const handleTitleBlur = async () => {
    if (title.trim() && title !== task.title) {
      try {
        const updated = await tasksApi.updateTask(task.id, { title: title.trim() });
        setTask(updated);
        onTaskUpdated?.(updated);
        toast.success('Title updated');
      } catch (e) {
        toast.error('Failed to update title');
      }
    }
  };

  const handleDescriptionBlur = async () => {
    if (description !== (task.description || '')) {
      try {
        const updated = await tasksApi.updateTask(task.id, { description: description.trim() });
        setTask(updated);
        onTaskUpdated?.(updated);
        toast.success('Description updated');
      } catch (e) {
        toast.error('Failed to update description');
      }
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    try {
      const updated = await tasksApi.updateTaskStatus(task.id, newStatus);
      setTask(updated);
      onTaskUpdated?.(updated);
      toast.success(`Status changed to ${newStatus}`);
    } catch (e) {
      toast.error('Failed to update status');
    }
  };

  const handlePriorityChange = async (newPriority: string) => {
    try {
      const updated = await tasksApi.updateTask(task.id, { priority: newPriority });
      setTask(updated);
      onTaskUpdated?.(updated);
      toast.success(`Priority set to ${newPriority}`);
    } catch (e) {
      toast.error('Failed to update priority');
    }
  };

  const handleDueDateChange = async (newDate: string) => {
    try {
      const updated = await tasksApi.updateTask(task.id, { due_date: newDate });
      setTask(updated);
      onTaskUpdated?.(updated);
      toast.success('Due date updated');
    } catch (e) {
      toast.error('Failed to update due date');
    }
  };

  // Subtask Handlers
  const handleAddSubtask = async (subtaskTitle: string) => {
    try {
      await subtasksApi.create(task.id, subtaskTitle);
      await refreshTask();
      toast.success('Subtask added');
    } catch (e) {
      toast.error('Failed to add subtask');
    }
  };

  const handleToggleSubtask = async (id: string, isCompleted: boolean) => {
    try {
      await subtasksApi.update(id, { is_completed: isCompleted });
      await refreshTask();
    } catch (e) {
      toast.error('Failed to update subtask');
    }
  };

  const handleDeleteSubtask = async (id: string) => {
    try {
      await subtasksApi.delete(id);
      await refreshTask();
      toast.success('Subtask deleted');
    } catch (e) {
      toast.error('Failed to delete subtask');
    }
  };

  // Comment Handlers
  const handleAddComment = async (content: string) => {
    try {
      await commentsApi.create(task.id, content);
      await refreshTask();
      toast.success('Comment posted');
    } catch (e) {
      toast.error('Failed to post comment');
    }
  };

  const handleDeleteComment = async (id: string) => {
    try {
      await commentsApi.delete(id);
      await refreshTask();
      toast.success('Comment removed');
    } catch (e) {
      toast.error('Failed to delete comment');
    }
  };

  // Resource Handlers
  const handleAddResource = async (url: string, resTitle?: string) => {
    try {
      await resourcesApi.create(task.id, url, resTitle);
      await refreshTask();
      toast.success('Resource added');
    } catch (e) {
      toast.error('Failed to add resource');
    }
  };

  const handleDeleteResource = async (id: string) => {
    try {
      await resourcesApi.delete(id);
      await refreshTask();
      toast.success('Resource removed');
    } catch (e) {
      toast.error('Failed to delete resource');
    }
  };

  // Label Handlers
  const handleAddLabel = async (labelId: string) => {
    try {
      await labelsApi.addToTask(task.id, labelId);
      await refreshTask();
      toast.success('Label added');
    } catch (e) {
      toast.error('Failed to add label');
    }
  };

  const handleRemoveLabel = async (labelId: string) => {
    try {
      await labelsApi.removeFromTask(task.id, labelId);
      await refreshTask();
      toast.success('Label removed');
    } catch (e) {
      toast.error('Failed to remove label');
    }
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 pb-12">
      {/* Left Column: Task Details, Subtasks, Activity */}
      <div className="flex-1 flex flex-col gap-8 min-w-0">
        {/* Editable Title & Description */}
        <div className="flex flex-col gap-3 bg-surface border border-outline-variant p-6 rounded-2xl shadow-sm">
          <input 
            value={title}
            onChange={e => setTitle(e.target.value)}
            onBlur={handleTitleBlur}
            placeholder="Task Title..."
            className="font-headline-lg text-headline-lg text-on-surface font-bold bg-transparent border-none outline-none w-full hover:bg-surface-dim focus:bg-surface-dim rounded-lg transition-colors px-2 py-1 -ml-2"
          />
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            onBlur={handleDescriptionBlur}
            placeholder="Add a detailed description for this task..."
            className="font-body-md text-body-md text-on-surface-variant w-full bg-transparent border-none outline-none resize-none min-h-[90px] hover:bg-surface-dim focus:bg-surface-dim rounded-lg transition-colors p-2 -ml-2 leading-relaxed"
          />
        </div>

        {/* Subtasks Section */}
        <SubtaskList 
          subtasks={task.subtasks || []} 
          onAdd={handleAddSubtask} 
          onToggle={handleToggleSubtask} 
          onDelete={handleDeleteSubtask} 
        />

        {/* Activity / Comments Section */}
        <CommentList 
          comments={task.comments || []} 
          onAddComment={handleAddComment} 
          onDeleteComment={handleDeleteComment}
        />
      </div>

      {/* Right Column: Metadata Details Sidebar */}
      <div className="w-full lg:w-[340px] flex flex-col gap-4 shrink-0">
        <div className="border border-outline-variant rounded-2xl bg-surface p-5 flex flex-col gap-5 shadow-sm">
          <h3 className="font-headline-md text-headline-md font-bold text-on-surface border-b border-outline-variant pb-3">
            Task Details
          </h3>

          <div className="flex flex-col gap-4">
            {/* Status */}
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md font-semibold text-on-surface-variant">Status</span>
              <select
                value={task.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-outline-variant bg-surface text-on-surface capitalize focus:ring-2 focus:ring-primary"
              >
                <option value="todo">To Do</option>
                <option value="doing">Doing</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Priority */}
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md font-semibold text-on-surface-variant">Priority</span>
              <select
                value={task.priority}
                onChange={(e) => handlePriorityChange(e.target.value)}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-outline-variant bg-surface text-on-surface capitalize focus:ring-2 focus:ring-primary"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            {/* Due Date */}
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md font-semibold text-on-surface-variant">Due Date</span>
              <input
                type="date"
                value={task.due_date ? new Date(task.due_date).toISOString().split('T')[0] : ''}
                onChange={(e) => handleDueDateChange(e.target.value)}
                className="text-xs px-2.5 py-1 rounded-lg border border-outline-variant bg-surface text-on-surface focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Labels Manager */}
            <div className="flex flex-col gap-2 pt-2 border-t border-outline-variant/60">
              <div className="flex items-center justify-between">
                <span className="font-label-md text-label-md font-semibold text-on-surface">Labels</span>
                {availableLabels.length > 0 && (
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        handleAddLabel(e.target.value);
                        e.target.value = '';
                      }
                    }}
                    className="text-[11px] px-2 py-0.5 rounded border border-outline-variant bg-surface text-on-surface"
                    defaultValue=""
                  >
                    <option value="" disabled>+ Add Label</option>
                    {availableLabels
                      .filter(l => !task.labels?.some(tl => tl.id === l.id))
                      .map(l => (
                        <option key={l.id} value={l.id}>{l.name}</option>
                      ))
                    }
                  </select>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {task.labels?.map(label => (
                  <span
                    key={label.id}
                    style={{ backgroundColor: `${label.color}20`, color: label.color, borderColor: `${label.color}50` }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold border"
                  >
                    {label.name}
                    <button 
                      onClick={() => handleRemoveLabel(label.id)}
                      className="hover:opacity-75 text-[12px] ml-0.5"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {(!task.labels || task.labels.length === 0) && (
                  <span className="text-xs text-on-surface-variant italic">No labels assigned</span>
                )}
              </div>
            </div>

            {/* Resources Section */}
            <ResourceList 
              resources={task.resources || []} 
              onAdd={handleAddResource} 
              onDelete={handleDeleteResource} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
