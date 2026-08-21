import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from './authStore';

describe('authStore', () => {
  beforeEach(() => {
    useAuthStore.getState().logout();
  });

  it('should have initial state', () => {
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.accessToken).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it('should set token', () => {
    useAuthStore.getState().setToken('test-token');
    const state = useAuthStore.getState();
    expect(state.accessToken).toBe('test-token');
  });

  it('should set user and update isAuthenticated', () => {
    const testUser = {
      id: '1',
      email: 'test@example.com',
      full_name: 'Test User',
      username: 'test',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    useAuthStore.getState().setUser(testUser);
    const state = useAuthStore.getState();
    expect(state.user).toEqual(testUser);
    expect(state.isAuthenticated).toBe(true);
  });

  it('should clear state on logout', () => {
    useAuthStore.getState().setToken('test-token');
    useAuthStore.getState().logout();
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.accessToken).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });
});
