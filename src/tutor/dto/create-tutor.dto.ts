import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsArray,
  IsUUID,
} from 'class-validator';

export class CreateTutorDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsEmail()
  @IsNotEmpty()
  school_email: string;

  @IsPhoneNumber(null)
  @IsNotEmpty()
  phone_number: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsArray()
  @IsUUID('all', { each: true })
  @IsOptional()
  course_ids?: string[];

  @IsArray()
  @IsUUID('all', { each: true })
  @IsOptional()
  availability_ids?: string[];
}
