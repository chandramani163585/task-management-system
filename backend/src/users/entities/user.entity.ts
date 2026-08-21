import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Workspace } from '../../workspaces/entities/workspace.entity';
import { WorkspaceMember } from '../../workspace-members/entities/workspace-member.entity';
import { Task } from '../../tasks/entities/task.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { Project } from '../../projects/entities/project.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  title: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ nullable: true })
  avatar_url: string;

  @Column({ nullable: true })
  google_id: string;

  @Column({ nullable: true })
  password_hash: string;

  @Column({ type: 'enum', enum: ['light', 'dark'], default: 'light' })
  theme: string;

  @Column({ type: 'enum', enum: ['amber', 'blue', 'pink', 'rose', 'emerald', 'black'], default: 'blue' })
  color_mode: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => WorkspaceMember, member => member.user)
  workspace_members: WorkspaceMember[];

  @OneToMany(() => Task, task => task.created_by_user)
  created_tasks: Task[];

  @OneToMany(() => Comment, comment => comment.author)
  comments: Comment[];

  @OneToMany(() => Workspace, workspace => workspace.owner)
  owned_workspaces: Workspace[];

  @OneToMany(() => Project, project => project.creator)
  created_projects: Project[];
}
