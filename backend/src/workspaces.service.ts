import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workspace } from './workspaces/entities/workspace.entity';
import { WorkspaceMember } from './workspace-members/entities/workspace-member.entity';

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectRepository(Workspace)
    private readonly workspaceRepo: Repository<Workspace>,
    @InjectRepository(WorkspaceMember)
    private readonly memberRepo: Repository<WorkspaceMember>,
  ) {}

  async findFirstForUser(userId: string): Promise<Workspace | null> {
    const member = await this.memberRepo.findOne({
      where: { user_id: userId },
      relations: { workspace: true },
    });
    if (member?.workspace) {
      return member.workspace;
    }
    const owned = await this.workspaceRepo.findOne({
      where: { owner_id: userId },
    });
    if (owned) return owned;

    // Default fallback to first workspace
    return this.workspaceRepo.findOne({
      where: {},
      order: { created_at: 'ASC' },
    });
  }

  async findById(id: string): Promise<Workspace | null> {
    return this.workspaceRepo.findOne({
      where: { id },
      relations: {
        members: {
          user: true,
        },
      },
    });
  }

  async getMembers(workspaceId: string): Promise<WorkspaceMember[]> {
    return this.memberRepo.find({
      where: { workspace_id: workspaceId },
      relations: { user: true },
    });
  }
}
