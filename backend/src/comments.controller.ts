import { Controller, Get, Post, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Controller()
@UseGuards(JwtAuthGuard)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('tasks/:taskId/comments')
  async findByTaskId(@Param('taskId') taskId: string) {
    return this.commentsService.findByTaskId(taskId);
  }

  @Post('tasks/:taskId/comments')
  async create(
    @Param('taskId') taskId: string,
    @Body('content') content: string,
    @Req() req: any,
  ) {
    return this.commentsService.create(taskId, req.user?.id, content);
  }

  @Delete('comments/:id')
  async remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
}
