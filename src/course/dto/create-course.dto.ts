import {
  IsString,
  IsEnum,
  IsNumber,
  IsNotEmpty,
  MinLength,
  Min,
  IsArray,
  IsOptional,
} from 'class-validator';
import { CourseComplexity } from '../entities/course.entity';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsEnum(CourseComplexity)
  complexity: CourseComplexity;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  base_price: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  code: string;

  @IsArray()
  @IsOptional()
  tutor_ids?: string[];
}
