import { useState, useEffect, useCallback } from 'react';
import { useAuthStore } from '../store/authStore';
import { authApi } from '../api/auth';
import { usersApi } from '../api/users';
import { User } from '../types';

export function useAuth() {
  const { user, isAuthenticated, isHydrated, setUser, setToken, logout: storeLogout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hydrate = useCallback(async () => {
    const { accessToken } = useAuthStore.getState();
    if (!accessToken) return;
    
    setIsLoading(true);
    try {
      const userData = await usersApi.getMe();
      setUser(userData);
    } catch (err: any) {
      if (err.status === 401) {
        storeLogout();
      }
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [setUser, storeLogout]);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const login = async (email: string, password?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { access_token, user } = await authApi.login(email, password);
      setToken(access_token);
      setUser(user);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const loginAsGuest = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { access_token, user } = await authApi.guestLogin();
      setToken(access_token);
      setUser(user);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (e) {
      // ignore
    } finally {
      storeLogout();
    }
  };

  return {
    user,
    isAuthenticated,
    isHydrated,
    isLoading,
    error,
    login,
    loginAsGuest,
    logout,
    hydrate
  };
}
