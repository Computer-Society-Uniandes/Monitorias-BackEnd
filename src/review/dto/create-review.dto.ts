import { IsString, IsNotEmpty, IsDate, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateReviewDto {
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  date: Date;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  comment: string;

  @IsString()
  @IsNotEmpty()
  suggestions: string;

  @IsString()
  @IsNotEmpty()
  score: string;

  @IsString()
  @IsNotEmpty()
  tutor_id: string;

  @IsString()
  @IsNotEmpty()
  tutoring_session_id: string;
}
