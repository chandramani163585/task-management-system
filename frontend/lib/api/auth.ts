import { fetchApi } from './index';
import { User } from '../types';

export interface AuthResponse {
  access_token: string;
  user: User;
}

export const authApi = {
  login: (email: string, password?: string) => 
    fetchApi<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password: password || 'testpass' }),
    }),

  guestLogin: () =>
    fetchApi<AuthResponse>('/auth/guest', {
      method: 'POST',
    }),
    
  googleAuth: () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'}/auth/google`;
  },
  
  logout: () => 
    fetchApi('/auth/logout', { method: 'POST' }),
    
  refreshToken: () => 
    fetchApi<{ access_token: string }>('/auth/refresh', { method: 'POST' }),
};
