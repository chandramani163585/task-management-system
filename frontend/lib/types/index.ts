export interface User {
  id: string;
  email: string;
  name?: string;
  full_name?: string;
  username: string;
  title?: string;
  bio?: string;
  avatar_url?: string;
  theme?: string;
  color_mode?: string;
  created_at: string;
  updated_at: string;
}

export interface Workspace {
  id: string;
  name: string;
  owner_id: string;
  created_at: string;
}

export interface Subtask {
  id: string;
  task_id: string;
  title: string;
  is_completed: boolean;
  created_at: string;
}

export interface Comment {
  id: string;
  task_id: string;
  author_id: string;
  content: string;
  created_at: string;
  author?: User;
}

export interface TaskResource {
  id: string;
  task_id: string;
  url: string;
  title?: string;
  added_by: string;
  created_at: string;
}

export interface Label {
  id: string;
  name: string;
  color: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'backlog' | 'todo' | 'doing' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  due_date?: string;
  workspace_id: string;
  assignees?: User[];
  members?: User[];
  labels?: Label[];
  subtasks?: Subtask[];
  comments?: Comment[];
  resources?: TaskResource[];
  created_at: string;
  updated_at: string;
}
