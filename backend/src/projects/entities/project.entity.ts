import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Workspace } from '../../workspaces/entities/workspace.entity';
import { User } from '../../users/entities/user.entity';
import { Task } from '../../tasks/entities/task.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  workspace_id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  created_by: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Workspace, workspace => workspace.projects)
  @JoinColumn({ name: 'workspace_id' })
  workspace: Workspace;

  @ManyToOne(() => User, user => user.created_projects)
  @JoinColumn({ name: 'created_by' })
  creator: User;

  @OneToMany(() => Task, task => task.project)
  tasks: Task[];
}
