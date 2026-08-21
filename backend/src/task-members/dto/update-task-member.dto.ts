import { PartialType } from '@nestjs/swagger';
import { CreateTaskMemberDto } from './create-task-member.dto';

export class UpdateTaskMemberDto extends PartialType(CreateTaskMemberDto) {}
