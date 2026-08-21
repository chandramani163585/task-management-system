import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subtask } from './subtasks/entities/subtask.entity';

@Injectable()
export class SubtasksService {
  constructor(
    @InjectRepository(Subtask)
    private readonly subtaskRepo: Repository<Subtask>,
  ) {}

  async findByTaskId(taskId: string): Promise<Subtask[]> {
    return this.subtaskRepo.find({
      where: { task_id: taskId },
      order: { created_at: 'ASC' },
    });
  }

  async create(taskId: string, title: string): Promise<Subtask> {
    const subtask = this.subtaskRepo.create({
      task_id: taskId,
      title,
      is_completed: false,
    });
    return this.subtaskRepo.save(subtask);
  }

  async update(id: string, updateDto: Partial<Subtask>): Promise<Subtask> {
    await this.subtaskRepo.update(id, updateDto);
    const subtask = await this.subtaskRepo.findOne({ where: { id } });
    if (!subtask) throw new NotFoundException('Subtask not found');
    return subtask;
  }

  async remove(id: string): Promise<void> {
    await this.subtaskRepo.delete(id);
  }
}
