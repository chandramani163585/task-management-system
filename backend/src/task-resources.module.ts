import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskResourcesService } from './task-resources.service';
import { TaskResourcesController } from './task-resources.controller';
import { TaskResource } from './task-resources/entities/task-resource.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskResource])],
  controllers: [TaskResourcesController],
  providers: [TaskResourcesService],
  exports: [TaskResourcesService],
})
export class TaskResourcesModule {}
