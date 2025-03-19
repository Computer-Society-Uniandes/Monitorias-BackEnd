import { PartialType } from '@nestjs/mapped-types';
import { CreateGroupTutoringSessionDto } from './create-group_tutoring_session.dto';

export class UpdateGroupTutoringSessionDto extends PartialType(
  CreateGroupTutoringSessionDto,
) {}
