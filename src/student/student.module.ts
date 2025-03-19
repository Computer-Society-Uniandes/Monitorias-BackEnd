import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { Student } from './entities/student.entity';

@Module({
  imports: [Student],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
