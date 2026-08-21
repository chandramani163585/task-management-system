import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './projects/entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
  ) {}

  async findAll(workspaceId: string): Promise<Project[]> {
    return this.projectRepo.find({
      where: { workspace_id: workspaceId },
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.projectRepo.findOne({
      where: { id },
      relations: { tasks: true },
    });
    if (!project) {
      throw new NotFoundException(`Project #${id} not found`);
    }
    return project;
  }

  async create(createDto: Partial<Project>, userId: string): Promise<Project> {
    const project = this.projectRepo.create({
      ...createDto,
      created_by: userId,
    });
    return this.projectRepo.save(project);
  }

  async update(id: string, updateDto: Partial<Project>): Promise<Project> {
    await this.projectRepo.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.projectRepo.delete(id);
  }
}
