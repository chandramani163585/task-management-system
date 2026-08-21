import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { Workspace } from '../../workspaces/entities/workspace.entity';
import { Project } from '../../projects/entities/project.entity';
import { User } from '../../users/entities/user.entity';
import { Subtask } from '../../subtasks/entities/subtask.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { TaskResource } from '../../task-resources/entities/task-resource.entity';
import { Label } from '../../labels/entities/label.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  workspace_id: string;

  @Column({ nullable: true })
  project_id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'enum', enum: ['todo', 'doing', 'completed'], default: 'todo' })
  status: string;

  @Column({ type: 'enum', enum: ['urgent', 'high', 'medium', 'low'], default: 'medium' })
  priority: string;

  @Column({ type: 'date', nullable: true })
  due_date: Date;

  @Column()
  created_by: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Workspace, workspace => workspace.tasks)
  @JoinColumn({ name: 'workspace_id' })
  workspace: Workspace;

  @ManyToOne(() => Project, project => project.tasks)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @ManyToOne(() => User, user => user.created_tasks)
  @JoinColumn({ name: 'created_by' })
  created_by_user: User;

  @OneToMany(() => Subtask, subtask => subtask.task)
  subtasks: Subtask[];

  @OneToMany(() => Comment, comment => comment.task)
  comments: Comment[];

  @OneToMany(() => TaskResource, resource => resource.task)
  resources: TaskResource[];

  @ManyToMany(() => Label, label => label.tasks)
  @JoinTable({
    name: 'task_labels',
    joinColumn: { name: 'task_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'label_id', referencedColumnName: 'id' }
  })
  labels: Label[];

  @ManyToMany(() => User)
  @JoinTable({
    name: 'task_members',
    joinColumn: { name: 'task_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' }
  })
  members: User[];
}
