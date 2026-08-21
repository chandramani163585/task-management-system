import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskResource } from './task-resources/entities/task-resource.entity';

@Injectable()
export class TaskResourcesService {
  constructor(
    @InjectRepository(TaskResource)
    private readonly resourceRepo: Repository<TaskResource>,
  ) {}

  async findByTaskId(taskId: string): Promise<TaskResource[]> {
    return this.resourceRepo.find({
      where: { task_id: taskId },
      order: { created_at: 'ASC' },
    });
  }

  async create(taskId: string, userId: string, url: string, title?: string): Promise<TaskResource> {
    const resource = this.resourceRepo.create({
      task_id: taskId,
      added_by: userId,
      url,
      title: title || url,
    });
    return this.resourceRepo.save(resource);
  }

  async remove(id: string): Promise<void> {
    await this.resourceRepo.delete(id);
  }
}
