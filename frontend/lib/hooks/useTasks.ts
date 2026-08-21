import { useState, useCallback } from 'react';
import { tasksApi, CreateTaskData } from '../api/tasks';
import { Task } from '../types';
import toast from 'react-hot-toast';

export function useTasks(workspaceId: string) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async (filters?: Record<string, string>) => {
    if (!workspaceId) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await tasksApi.listTasks(workspaceId, filters);
      setTasks(data);
    } catch (err: any) {
      setError(err.message);
      toast.error(`Failed to load tasks: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [workspaceId]);

  const createTask = async (data: CreateTaskData) => {
    try {
      const newTask = await tasksApi.createTask(workspaceId, data);
      setTasks(prev => [...prev, newTask]);
      toast.success('Task created successfully');
      return newTask;
    } catch (err: any) {
      toast.error(`Failed to create task: ${err.message}`);
      throw err;
    }
  };

  const updateTaskStatus = async (id: string, status: string) => {
    // Optimistic update
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: status as any } : t));
    try {
      await tasksApi.updateTaskStatus(id, status);
    } catch (err: any) {
      // Revert on error
      toast.error(`Failed to update task status: ${err.message}`);
      fetchTasks();
    }
  };

  const deleteTask = async (id: string) => {
    // Optimistic update
    setTasks(prev => prev.filter(t => t.id !== id));
    try {
      await tasksApi.deleteTask(id);
      toast.success('Task deleted');
    } catch (err: any) {
      toast.error(`Failed to delete task: ${err.message}`);
      fetchTasks();
    }
  };

  return {
    tasks,
    isLoading,
    error,
    fetchTasks,
    createTask,
    updateTaskStatus,
    deleteTask
  };
}
