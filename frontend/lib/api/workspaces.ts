import { fetchApi } from './index';
import { Workspace } from '../types';

export const workspacesApi = {
  getCurrent: () => fetchApi<Workspace>('/workspaces/current'),
  getWorkspace: (id: string) => fetchApi<Workspace>(`/workspaces/${id}`),
  getMembers: (id: string) => fetchApi<any[]>(`/workspaces/${id}/members`),
};
