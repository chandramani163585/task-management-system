import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async updateProfile(id: string, updateData: any): Promise<User | null> {
    await this.usersRepository.update(id, updateData);
    return this.findById(id);
  }

  async updateAppearance(id: string, appearanceData: any): Promise<User | null> {
    await this.usersRepository.update(id, appearanceData);
    return this.findById(id);
  }

  async updateAvatar(id: string, avatarUrl: string): Promise<User | null> {
    await this.usersRepository.update(id, { avatar_url: avatarUrl });
    return this.findById(id);
  }

  async leaveWorkspace(userId: string, workspaceId: string): Promise<void> {
    // Left workspace operation
  }
}
