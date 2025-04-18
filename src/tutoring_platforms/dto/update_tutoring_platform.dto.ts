import { PartialType } from '@nestjs/mapped-types';
import { CreateTutoringPlatformDto } from './create_tutoring_platform.dto';

export class UpdateTutoringPlatformDto extends PartialType(
  CreateTutoringPlatformDto,
) {}
