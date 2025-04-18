import { PartialType } from '@nestjs/mapped-types';
import { CreateGroupTutoringSessionDto } from './create-group-tutoring-session.dto';

export class UpdateGroupTutoringSessionDto extends PartialType(
  CreateGroupTutoringSessionDto,
) {}
