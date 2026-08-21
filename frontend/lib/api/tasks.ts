import { fetchApi } from './index';
import { Task } from '../types';

export interface CreateTaskData {
  title: string;
  description?: string;
  status?: string;
  priority?: string;
  due_date?: string;
}

export const tasksApi = {
  listTasks: (workspaceId: string, filters?: Record<string, string>) => {
    const query = new URLSearchParams(filters || {}).toString();
    const url = `/workspaces/${workspaceId}/tasks${query ? `?${query}` : ''}`;
    return fetchApi<Task[]>(url);
  },
  
  getTask: (id: string) => fetchApi<Task>(`/tasks/${id}`),
  
  createTask: (workspaceId: string, data: CreateTaskData) => 
    fetchApi<Task>(`/workspaces/${workspaceId}/tasks`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    
  updateTask: (id: string, data: Partial<CreateTaskData>) => 
    fetchApi<Task>(`/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
    
  updateTaskStatus: (id: string, status: string) => 
    fetchApi<Task>(`/tasks/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
    
  deleteTask: (id: string) => 
    fetchApi<void>(`/tasks/${id}`, { method: 'DELETE' }),
};
