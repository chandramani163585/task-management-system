import { fetchApi } from './index';
import { User } from '../types';

export interface UpdateProfileData {
  name?: string;
  full_name?: string;
  username?: string;
  title?: string;
  bio?: string;
}

export interface UpdateAppearanceData {
  theme?: 'light' | 'dark';
  color?: string;
  color_mode?: string;
}

export const usersApi = {
  getMe: () => fetchApi<User>('/users/me'),
  
  updateProfile: (data: UpdateProfileData) => 
    fetchApi<User>('/users/me', {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
    
  uploadAvatar: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return fetchApi<{ avatar_url: string }>('/users/me/avatar', {
      method: 'POST',
      body: formData,
    });
  },
  
  updateAppearance: (data: UpdateAppearanceData) => 
    fetchApi<User>('/users/me/appearance', {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
};
