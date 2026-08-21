import { Controller, Get, Param, UseGuards, Req } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Controller('workspaces')
@UseGuards(JwtAuthGuard)
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @Get('current')
  async getCurrent(@Req() req: any) {
    return this.workspacesService.findFirstForUser(req.user?.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.workspacesService.findById(id);
  }

  @Get(':id/members')
  async getMembers(@Param('id') id: string) {
    return this.workspacesService.getMembers(id);
  }
}
