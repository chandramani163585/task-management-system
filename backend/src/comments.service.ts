import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comments/entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
  ) {}

  async findByTaskId(taskId: string): Promise<Comment[]> {
    return this.commentRepo.find({
      where: { task_id: taskId },
      relations: { author: true },
      order: { created_at: 'ASC' },
    });
  }

  async create(taskId: string, authorId: string, content: string): Promise<Comment> {
    const comment = this.commentRepo.create({
      task_id: taskId,
      author_id: authorId,
      content,
    });
    await this.commentRepo.save(comment);
    return this.commentRepo.findOne({
      where: { id: comment.id },
      relations: { author: true },
    }) as Promise<Comment>;
  }

  async remove(id: string): Promise<void> {
    await this.commentRepo.delete(id);
  }
}
