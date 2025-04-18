import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsOptional,
  IsEnum,
  IsNumber,
  IsUrl,
} from 'class-validator';

export class CreateTutoringSessionDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsNotEmpty()
  start_time: string;

  @IsDateString()
  @IsNotEmpty()
  end_time: string;

  @IsEnum(['pending', 'confirmed', 'cancelled', 'completed'])
  @IsOptional()
  status?: 'pending' | 'confirmed' | 'cancelled' | 'completed';

  @IsString()
  @IsOptional()
  cancellation_reason?: string;

  @IsUrl()
  @IsOptional()
  meeting_url?: string;

  @IsNumber()
  @IsNotEmpty()
  tutor_id: string;

  @IsNumber()
  @IsNotEmpty()
  student_id: string;

  @IsNumber()
  @IsNotEmpty()
  topicid: string;

  @IsNumber()
  @IsNotEmpty()
  platformid: string;
}
