import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsOptional,
  IsArray,
} from 'class-validator';

export class CreateTopicDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  description: string;

  @IsString()
  @IsNotEmpty()
  course_id: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tutoring_session_ids?: string[];
}
