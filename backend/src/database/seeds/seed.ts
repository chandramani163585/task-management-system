import { AppDataSource } from '../data-source';
import { User } from '../../users/entities/user.entity';
import { Workspace } from '../../workspaces/entities/workspace.entity';
import { WorkspaceMember } from '../../workspace-members/entities/workspace-member.entity';
import { Project } from '../../projects/entities/project.entity';
import { Task } from '../../tasks/entities/task.entity';
import { Subtask } from '../../subtasks/entities/subtask.entity';
import { Label } from '../../labels/entities/label.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { TaskResource } from '../../task-resources/entities/task-resource.entity';
import * as bcrypt from 'bcryptjs';

async function seed() {
  await AppDataSource.initialize();
  console.log('Database connected. Starting seed...');

  // Users
  const userRepo = AppDataSource.getRepository(User);
  const passwordHash = await bcrypt.hash('password123', 10);
  
  const dexter = userRepo.create({
    email: 'dexter@example.com',
    name: 'Dexter Morgan',
    username: 'dexter',
    password_hash: passwordHash,
    theme: 'light',
    color_mode: 'blue',
  });

  const rita = userRepo.create({
    email: 'rita@example.com',
    name: 'Rita Bennett',
    username: 'rita',
    password_hash: passwordHash,
    theme: 'dark',
    color_mode: 'rose',
  });

  await userRepo.save([dexter, rita]);
  console.log('Users seeded');

  // Workspace
  const workspaceRepo = AppDataSource.getRepository(Workspace);
  const workspace = workspaceRepo.create({
    name: "Dexter's Workspace",
    owner_id: dexter.id,
    owner: dexter,
  });
  await workspaceRepo.save(workspace);
  console.log('Workspace seeded');

  // Workspace Members
  const memberRepo = AppDataSource.getRepository(WorkspaceMember);
  await memberRepo.save([
    memberRepo.create({ workspace_id: workspace.id, user_id: dexter.id, role: 'owner' }),
    memberRepo.create({ workspace_id: workspace.id, user_id: rita.id, role: 'member' }),
  ]);
  console.log('Workspace Members seeded');

  // Projects
  const projectRepo = AppDataSource.getRepository(Project);
  const project1 = projectRepo.create({
    workspace_id: workspace.id,
    name: 'Miami Metro Homicide',
    created_by: dexter.id,
  });
  const project2 = projectRepo.create({
    workspace_id: workspace.id,
    name: 'Slice of Life',
    created_by: dexter.id,
  });
  await projectRepo.save([project1, project2]);
  console.log('Projects seeded');

  // Labels
  const labelRepo = AppDataSource.getRepository(Label);
  const labels = [
    labelRepo.create({ workspace_id: workspace.id, name: 'Urgent', color: '#ef4444' }),
    labelRepo.create({ workspace_id: workspace.id, name: 'Bug', color: '#f59e0b' }),
    labelRepo.create({ workspace_id: workspace.id, name: 'Feature', color: '#10b981' }),
    labelRepo.create({ workspace_id: workspace.id, name: 'Design', color: '#8b5cf6' }),
    labelRepo.create({ workspace_id: workspace.id, name: 'Research', color: '#3b82f6' }),
  ];
  await labelRepo.save(labels);
  console.log('Labels seeded');

  // Tasks
  const taskRepo = AppDataSource.getRepository(Task);
  const tasks = [];
  for (let i = 1; i <= 10; i++) {
    const task = taskRepo.create({
      workspace_id: workspace.id,
      project_id: i % 2 === 0 ? project1.id : project2.id,
      title: `Task ${i}`,
      description: `Description for task ${i}`,
      status: i <= 3 ? 'todo' : i <= 7 ? 'doing' : 'completed',
      priority: i % 4 === 0 ? 'urgent' : i % 3 === 0 ? 'high' : i % 2 === 0 ? 'medium' : 'low',
      created_by: dexter.id,
      labels: [labels[i % labels.length], labels[(i + 1) % labels.length]],
      members: [dexter, i % 2 === 0 ? rita : dexter],
    });
    tasks.push(task);
  }
  await taskRepo.save(tasks);
  console.log('Tasks seeded');

  // Subtasks, Comments, Resources
  const subtaskRepo = AppDataSource.getRepository(Subtask);
  const commentRepo = AppDataSource.getRepository(Comment);
  const resourceRepo = AppDataSource.getRepository(TaskResource);

  for (const task of tasks) {
    // 2 subtasks per task
    await subtaskRepo.save([
      subtaskRepo.create({ task_id: task.id, title: 'Subtask 1', is_completed: false }),
      subtaskRepo.create({ task_id: task.id, title: 'Subtask 2', is_completed: true }),
    ]);

    // 2 comments per task
    await commentRepo.save([
      commentRepo.create({ task_id: task.id, author_id: dexter.id, content: 'First comment' }),
      commentRepo.create({ task_id: task.id, author_id: rita.id, content: 'Second comment' }),
    ]);

    // 1 resource per task
    await resourceRepo.save([
      resourceRepo.create({ task_id: task.id, url: 'https://example.com', title: 'Example Resource', added_by: dexter.id }),
    ]);
  }
  console.log('Subtasks, Comments, Resources seeded');

  await AppDataSource.destroy();
  console.log('Seeding completed successfully');
}

seed().catch(err => {
  console.error('Error during seeding:', err);
  process.exit(1);
});
