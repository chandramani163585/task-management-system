import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskMembersService } from './task-members.service';
import { CreateTaskMemberDto } from './dto/create-task-member.dto';
import { UpdateTaskMemberDto } from './dto/update-task-member.dto';

@Controller('task-members')
export class TaskMembersController {
  constructor(private readonly taskMembersService: TaskMembersService) {}

  @Post()
  create(@Body() createTaskMemberDto: CreateTaskMemberDto) {
    return this.taskMembersService.create(createTaskMemberDto);
  }

  @Get()
  findAll() {
    return this.taskMembersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskMembersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskMemberDto: UpdateTaskMemberDto) {
    return this.taskMembersService.update(+id, updateTaskMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskMembersService.remove(+id);
  }
}
