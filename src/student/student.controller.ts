import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.studentService.findAll();
  }

  @Get('by-major/:major')
  findByMajor(@Param('major') major: string) {
    return this.studentService.findByMajor(major);
  }

  @Get(':id/tutoring-sessions')
  findStudentSessions(@Param('id') id: string) {
    return this.studentService.findStudentSessions(id);
  }

  @Get(':id/group-sessions')
  findStudentGroupSessions(@Param('id') id: string) {
    return this.studentService.findStudentGroupSessions(id);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(id, updateStudentDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.studentService.remove(id);
  }
}
