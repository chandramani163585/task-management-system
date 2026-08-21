import { fetchApi } from './index';
import { Subtask, Comment, TaskResource, Label } from '../types';

export const subtasksApi = {
  getByTaskId: (taskId: string) => fetchApi<Subtask[]>(`/tasks/${taskId}/subtasks`),
  create: (taskId: string, title: string) => 
    fetchApi<Subtask>(`/tasks/${taskId}/subtasks`, {
      method: 'POST',
      body: JSON.stringify({ title }),
    }),
  update: (id: string, data: Partial<Subtask>) => 
    fetchApi<Subtask>(`/subtasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
  delete: (id: string) => 
    fetchApi<void>(`/subtasks/${id}`, { method: 'DELETE' }),
};

export const commentsApi = {
  getByTaskId: (taskId: string) => fetchApi<Comment[]>(`/tasks/${taskId}/comments`),
  create: (taskId: string, content: string) => 
    fetchApi<Comment>(`/tasks/${taskId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    }),
  delete: (id: string) => 
    fetchApi<void>(`/comments/${id}`, { method: 'DELETE' }),
};

export const resourcesApi = {
  getByTaskId: (taskId: string) => fetchApi<TaskResource[]>(`/tasks/${taskId}/resources`),
  create: (taskId: string, url: string, title?: string) => 
    fetchApi<TaskResource>(`/tasks/${taskId}/resources`, {
      method: 'POST',
      body: JSON.stringify({ url, title }),
    }),
  delete: (id: string) => 
    fetchApi<void>(`/resources/${id}`, { method: 'DELETE' }),
};

export const labelsApi = {
  list: () => fetchApi<Label[]>('/labels'),
  addToTask: (taskId: string, labelId: string) => 
    fetchApi<any>(`/tasks/${taskId}/labels`, {
      method: 'POST',
      body: JSON.stringify({ label_id: labelId }),
    }),
  removeFromTask: (taskId: string, labelId: string) => 
    fetchApi<any>(`/tasks/${taskId}/labels/${labelId}`, {
      method: 'DELETE',
    }),
};
