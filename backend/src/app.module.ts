import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { TaskMembersModule } from './task-members/task-members.module';
import { UsersModule } from './users.module';
import { WorkspacesModule } from './workspaces.module';
import { ProjectsModule } from './projects.module';
import { TasksModule } from './tasks.module';
import { SubtasksModule } from './subtasks.module';
import { CommentsModule } from './comments.module';
import { LabelsModule } from './labels.module';
import { TaskResourcesModule } from './task-resources.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    TaskMembersModule,
    UsersModule,
    WorkspacesModule,
    ProjectsModule,
    TasksModule,
    SubtasksModule,
    CommentsModule,
    LabelsModule,
    TaskResourcesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
