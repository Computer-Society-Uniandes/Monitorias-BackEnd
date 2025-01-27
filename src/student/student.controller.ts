import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from './student.entity';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  @Get()
  findAll(): Student[] {
    return this.studentService.findAll();
  }

  @Post()
  create(@Body() student: Student): Student {
    return this.studentService.create(student);
  }

  @Get(':id')
  findById(@Param('id') id: number): Student | undefined {
    return this.studentService.findById(Number(id));
  }
}
