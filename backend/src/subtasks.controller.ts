import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { SubtasksService } from './subtasks.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Controller()
@UseGuards(JwtAuthGuard)
export class SubtasksController {
  constructor(private readonly subtasksService: SubtasksService) {}

  @Get('tasks/:taskId/subtasks')
  async findByTaskId(@Param('taskId') taskId: string) {
    return this.subtasksService.findByTaskId(taskId);
  }

  @Post('tasks/:taskId/subtasks')
  async create(@Param('taskId') taskId: string, @Body('title') title: string) {
    return this.subtasksService.create(taskId, title);
  }

  @Patch('subtasks/:id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.subtasksService.update(id, body);
  }

  @Delete('subtasks/:id')
  async remove(@Param('id') id: string) {
    return this.subtasksService.remove(id);
  }
}
