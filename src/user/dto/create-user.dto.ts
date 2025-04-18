import {
  IsString,
  IsEnum,
  IsNotEmpty,
  Length,
  IsOptional,
} from 'class-validator';
import { UserMajor } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  name: string;

  @IsString()
  @IsOptional()
  @Length(0, 500)
  bio?: string;

  @IsString()
  @IsNotEmpty()
  @Length(10, 15)
  phone_number: string;

  @IsEnum(UserMajor)
  @IsNotEmpty()
  major: UserMajor;
}
