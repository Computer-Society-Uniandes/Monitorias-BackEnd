import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Recurrence, Weekday } from '../entities/availability.entity';

export class CreateAvailabilityDto {
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  start_hour: Date;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  end_hour: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  blackout_date?: Date;

  @IsEnum(Recurrence)
  recurrence: Recurrence;

  @IsEnum(Weekday)
  weekday: Weekday;

  @IsString()
  @IsNotEmpty()
  tutor_id: string;

  @IsString()
  @IsNotEmpty()
  schedule_id: string;
}
