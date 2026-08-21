import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { LabelsService } from './labels.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Controller('labels')
@UseGuards(JwtAuthGuard)
export class LabelsController {
  constructor(private readonly labelsService: LabelsService) {}

  @Get()
  async findAll(@Query('workspace_id') workspaceId?: string) {
    return this.labelsService.findAll(workspaceId);
  }

  @Post()
  async create(
    @Body('name') name: string,
    @Body('color') color: string,
    @Body('workspace_id') workspaceId: string,
  ) {
    return this.labelsService.create(name, color, workspaceId);
  }
}
