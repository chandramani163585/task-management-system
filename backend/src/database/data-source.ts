import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from '../users/entities/user.entity';
import { Workspace } from '../workspaces/entities/workspace.entity';
import { WorkspaceMember } from '../workspace-members/entities/workspace-member.entity';
import { Project } from '../projects/entities/project.entity';
import { Task } from '../tasks/entities/task.entity';
import { Subtask } from '../subtasks/entities/subtask.entity';
import { Label } from '../labels/entities/label.entity';
import { Comment } from '../comments/entities/comment.entity';
import { TaskResource } from '../task-resources/entities/task-resource.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || process.env.DB_NAME || 'defaultdb',
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
  synchronize: false,
  logging: true,
  entities: [User, Workspace, WorkspaceMember, Project, Task, Subtask, Label, Comment, TaskResource],
  migrations: ['src/database/migrations/*.ts'],
});
