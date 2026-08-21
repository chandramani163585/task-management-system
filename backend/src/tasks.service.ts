import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './tasks/entities/task.entity';
import { Label } from './labels/entities/label.entity';
import { User } from './users/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
    @InjectRepository(Label)
    private readonly labelRepo: Repository<Label>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findAll(workspaceId: string, status?: string, priority?: string, projectId?: string): Promise<Task[]> {
    const query = this.taskRepo.createQueryBuilder('task')
      .leftJoinAndSelect('task.members', 'members')
      .leftJoinAndSelect('task.labels', 'labels')
      .leftJoinAndSelect('task.subtasks', 'subtasks')
      .where('task.workspace_id = :workspaceId', { workspaceId });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (priority) {
      query.andWhere('task.priority = :priority', { priority });
    }
    if (projectId) {
      query.andWhere('task.project_id = :projectId', { projectId });
    }

    return query.orderBy('task.created_at', 'DESC').getMany();
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskRepo.findOne({
      where: { id },
      relations: {
        members: true,
        labels: true,
        subtasks: true,
        resources: true,
        comments: {
          author: true,
        },
        project: true,
        created_by_user: true,
      },
    });

    if (!task) {
      throw new NotFoundException(`Task #${id} not found`);
    }

    return task;
  }

  async create(createDto: Partial<Task>, userId?: string): Promise<Task> {
    const task = this.taskRepo.create({
      ...createDto,
      created_by: userId || createDto.created_by || 'system',
    });
    return this.taskRepo.save(task);
  }

  async update(id: string, updateDto: Partial<Task>): Promise<Task> {
    await this.taskRepo.update(id, updateDto);
    return this.findOne(id);
  }

  async updateStatus(id: string, status: string): Promise<Task> {
    await this.taskRepo.update(id, { status });
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.taskRepo.delete(id);
  }

  async addLabel(taskId: string, labelId: string): Promise<Task> {
    const task = await this.findOne(taskId);
    const label = await this.labelRepo.findOne({ where: { id: labelId } });
    if (label && !task.labels.some(l => l.id === labelId)) {
      task.labels.push(label);
      await this.taskRepo.save(task);
    }
    return this.findOne(taskId);
  }

  async removeLabel(taskId: string, labelId: string): Promise<Task> {
    const task = await this.findOne(taskId);
    task.labels = task.labels.filter(l => l.id !== labelId);
    await this.taskRepo.save(task);
    return this.findOne(taskId);
  }

  async addMember(taskId: string, userId: string): Promise<Task> {
    const task = await this.findOne(taskId);
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (user && !task.members.some(m => m.id === userId)) {
      task.members.push(user);
      await this.taskRepo.save(task);
    }
    return this.findOne(taskId);
  }

  async removeMember(taskId: string, userId: string): Promise<Task> {
    const task = await this.findOne(taskId);
    task.members = task.members.filter(m => m.id !== userId);
    await this.taskRepo.save(task);
    return this.findOne(taskId);
  }
}
