import { describe, it, expect, vi, beforeEach } from 'vitest';
import { authApi } from './auth';
import { usersApi } from './users';
import { tasksApi } from './tasks';
import { useAuthStore } from '../store/authStore';

// Mock global fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('API functions', () => {
  beforeEach(() => {
    mockFetch.mockClear();
    useAuthStore.getState().logout();
  });

  describe('authApi', () => {
    it('login should return token and user', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ access_token: 'test', user: { id: '1' } }),
      });
      
      const res = await authApi.login('test@example.com', 'test');
      expect(res.access_token).toBe('test');
      expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('/auth/login'), expect.any(Object));
    });

    it('logout should call logout endpoint', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });
      
      await authApi.logout();
      expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('/auth/logout'), expect.any(Object));
    });
  });

  describe('usersApi', () => {
    it('getMe should fetch user profile', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: '1', username: 'test' }),
      });
      
      const res = await usersApi.getMe();
      expect(res.username).toBe('test');
    });

    it('updateProfile should patch user profile', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: '1', full_name: 'New Name' }),
      });
      
      const res = await usersApi.updateProfile({ full_name: 'New Name' });
      expect(res.full_name).toBe('New Name');
      expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('/users/me'), expect.objectContaining({
        method: 'PATCH',
        body: JSON.stringify({ full_name: 'New Name' })
      }));
    });
  });

  describe('tasksApi', () => {
    it('listTasks should fetch tasks with filters', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ([{ id: '1', title: 'Task 1' }]),
      });
      
      const res = await tasksApi.listTasks('workspace-1', { status: 'todo' });
      expect(res).toHaveLength(1);
      expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('/workspaces/workspace-1/tasks?status=todo'), expect.any(Object));
    });

    it('createTask should post new task', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: '2', title: 'New Task' }),
      });
      
      const res = await tasksApi.createTask('workspace-1', { title: 'New Task' });
      expect(res.title).toBe('New Task');
    });
  });
});
