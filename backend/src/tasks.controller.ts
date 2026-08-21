import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Controller()
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('workspaces/:wid/tasks')
  async findAll(
    @Param('wid') wid: string,
    @Query('status') status?: string,
    @Query('priority') priority?: string,
    @Query('project_id') projectId?: string,
  ) {
    return this.tasksService.findAll(wid, status, priority, projectId);
  }

  @Post('workspaces/:wid/tasks')
  async create(
    @Param('wid') wid: string,
    @Body() body: any,
    @Req() req: any,
  ) {
    return this.tasksService.create({ ...body, workspace_id: wid }, req.user?.id);
  }

  @Get('tasks/:id')
  async findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch('tasks/:id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.tasksService.update(id, body);
  }

  @Patch('tasks/:id/status')
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.tasksService.updateStatus(id, status);
  }

  @Delete('tasks/:id')
  async remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }

  @Post('tasks/:id/labels')
  async addLabel(@Param('id') id: string, @Body('label_id') labelId: string) {
    return this.tasksService.addLabel(id, labelId);
  }

  @Delete('tasks/:id/labels/:lid')
  async removeLabel(@Param('id') id: string, @Param('lid') lid: string) {
    return this.tasksService.removeLabel(id, lid);
  }

  @Post('tasks/:id/members')
  async addMember(@Param('id') id: string, @Body('user_id') userId: string) {
    return this.tasksService.addMember(id, userId);
  }

  @Delete('tasks/:id/members/:uid')
  async removeMember(@Param('id') id: string, @Param('uid') uid: string) {
    return this.tasksService.removeMember(id, uid);
  }
}
