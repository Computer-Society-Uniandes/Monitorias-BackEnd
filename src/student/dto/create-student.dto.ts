import { IsString, IsNotEmpty, IsEnum, Length } from 'class-validator';
import { UserMajor } from '../../user/entities/user.entity';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  name: string;

  @IsString()
  @Length(0, 500)
  bio: string;

  @IsString()
  @IsNotEmpty()
  @Length(10, 15)
  phone_number: string;

  @IsEnum(UserMajor)
  major: UserMajor;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
