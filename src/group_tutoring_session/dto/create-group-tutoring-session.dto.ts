import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsDate,
  Min,
  IsArray,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateGroupTutoringSessionDto {
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  start_hour: Date;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  end_hour: Date;

  @IsString()
  @IsNotEmpty()
  notes: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  time_added: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  price: number;

  @IsString() // Ahora es un string ID de curso
  @IsNotEmpty()
  course_id: string;

  @IsArray()
  @IsOptional()
  student_ids?: string[]; // IDs de estudiantes como array de strings

  @IsArray()
  @IsOptional()
  tutor_ids?: string[]; // IDs de tutores como array de strings
}
