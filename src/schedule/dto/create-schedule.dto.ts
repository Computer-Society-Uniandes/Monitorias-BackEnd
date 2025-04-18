import {
  IsString,
  IsBoolean,
  IsNumber,
  IsNotEmpty,
  Min,
  IsOptional,
} from 'class-validator';

export class CreateScheduleDto {
  @IsString()
  @IsNotEmpty()
  timezone: string;

  @IsBoolean()
  @IsNotEmpty()
  auto_accept_session: boolean;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  min_booking_notice: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  max_sessions_per_day: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  buffer_time: number;

  @IsString()
  @IsOptional()
  tutor_id?: string; // Usamos string para IDs en Firestore
}
