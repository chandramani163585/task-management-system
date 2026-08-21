import { Controller, Get, Post, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { TaskResourcesService } from './task-resources.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Controller()
@UseGuards(JwtAuthGuard)
export class TaskResourcesController {
  constructor(private readonly taskResourcesService: TaskResourcesService) {}

  @Get('tasks/:taskId/resources')
  async findByTaskId(@Param('taskId') taskId: string) {
    return this.taskResourcesService.findByTaskId(taskId);
  }

  @Post('tasks/:taskId/resources')
  async create(
    @Param('taskId') taskId: string,
    @Body('url') url: string,
    @Body('title') title: string,
    @Req() req: any,
  ) {
    return this.taskResourcesService.create(taskId, req.user?.id, url, title);
  }

  @Delete('resources/:id')
  async remove(@Param('id') id: string) {
    return this.taskResourcesService.remove(id);
  }
}
