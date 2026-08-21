import { Injectable } from '@nestjs/common';
import { CreateTaskMemberDto } from './dto/create-task-member.dto';
import { UpdateTaskMemberDto } from './dto/update-task-member.dto';

@Injectable()
export class TaskMembersService {
  create(createTaskMemberDto: CreateTaskMemberDto) {
    return 'This action adds a new taskMember';
  }

  findAll() {
    return `This action returns all taskMembers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} taskMember`;
  }

  update(id: number, updateTaskMemberDto: UpdateTaskMemberDto) {
    return `This action updates a #${id} taskMember`;
  }

  remove(id: number) {
    return `This action removes a #${id} taskMember`;
  }
}
