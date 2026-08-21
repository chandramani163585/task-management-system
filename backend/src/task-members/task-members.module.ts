import { Module } from '@nestjs/common';
import { TaskMembersService } from './task-members.service';
import { TaskMembersController } from './task-members.controller';

@Module({
  controllers: [TaskMembersController],
  providers: [TaskMembersService],
})
export class TaskMembersModule {}
