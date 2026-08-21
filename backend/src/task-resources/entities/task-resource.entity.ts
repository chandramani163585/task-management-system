import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';
import { User } from '../../users/entities/user.entity';

@Entity('task_resources')
export class TaskResource {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  task_id: string;

  @Column()
  url: string;

  @Column({ nullable: true })
  title: string;

  @Column()
  added_by: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Task, task => task.resources)
  @JoinColumn({ name: 'task_id' })
  task: Task;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'added_by' })
  added_by_user: User;
}
