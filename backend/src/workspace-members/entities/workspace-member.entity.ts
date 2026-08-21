import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Workspace } from '../../workspaces/entities/workspace.entity';
import { User } from '../../users/entities/user.entity';

@Entity('workspace_members')
export class WorkspaceMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  workspace_id: string;

  @Column()
  user_id: string;

  @Column({ type: 'enum', enum: ['owner', 'member'], default: 'member' })
  role: string;

  @CreateDateColumn()
  joined_at: Date;

  @ManyToOne(() => Workspace, workspace => workspace.members)
  @JoinColumn({ name: 'workspace_id' })
  workspace: Workspace;

  @ManyToOne(() => User, user => user.workspace_members)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
