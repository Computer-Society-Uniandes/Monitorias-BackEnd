import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { Course } from './entities/course.entity';

@Module({
  imports: [Course],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
