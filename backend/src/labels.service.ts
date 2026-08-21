import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Label } from './labels/entities/label.entity';

@Injectable()
export class LabelsService {
  constructor(
    @InjectRepository(Label)
    private readonly labelRepo: Repository<Label>,
  ) {}

  async findAll(workspaceId?: string): Promise<Label[]> {
    if (workspaceId) {
      return this.labelRepo.find({ where: { workspace_id: workspaceId } });
    }
    return this.labelRepo.find();
  }

  async create(name: string, color: string, workspaceId: string): Promise<Label> {
    const label = this.labelRepo.create({
      name,
      color,
      workspace_id: workspaceId,
    });
    return this.labelRepo.save(label);
  }
}
