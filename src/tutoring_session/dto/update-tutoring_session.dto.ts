import { PartialType } from '@nestjs/mapped-types';
import { CreateTutoringSessionDto } from './create-tutoring_session.dto';

export class UpdateTutoringSessionDto extends PartialType(
  CreateTutoringSessionDto,
) {}
