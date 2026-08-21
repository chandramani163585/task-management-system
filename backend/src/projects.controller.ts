import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Controller()
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get('workspaces/:wid/projects')
  async findAll(@Param('wid') wid: string) {
    return this.projectsService.findAll(wid);
  }

  @Post('workspaces/:wid/projects')
  async create(@Param('wid') wid: string, @Body() body: any, @Req() req: any) {
    return this.projectsService.create({ ...body, workspace_id: wid }, req.user?.id);
  }

  @Get('projects/:id')
  async findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Patch('projects/:id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.projectsService.update(id, body);
  }

  @Delete('projects/:id')
  async remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}
