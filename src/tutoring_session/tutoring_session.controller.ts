import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TutoringSessionService } from './tutoring_session.service';
import { CreateTutoringSessionDto } from './dto/create_tutoring_session.dto';
import { UpdateTutoringSessionDto } from './dto/update_tutoring_session.dto';

@Controller('tutoring_session')
export class TutoringSessionController {
  constructor(
    private readonly tutoringSessionService: TutoringSessionService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTutoringSessionDto: CreateTutoringSessionDto) {
    return this.tutoringSessionService.create(createTutoringSessionDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(
    @Query('tutor_id') tutor_id?: string,
    @Query('student_id') student_id?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    if (tutor_id) {
      return this.tutoringSessionService.findByTutor(tutor_id);
    }
    if (student_id) {
      return this.tutoringSessionService.findByStudent(student_id);
    }
    if (startDate && endDate) {
      return this.tutoringSessionService.findByDateRange(
        new Date(startDate),
        new Date(endDate),
      );
    }
    return this.tutoringSessionService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.tutoringSessionService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() updateTutoringSessionDto: UpdateTutoringSessionDto,
  ) {
    return this.tutoringSessionService.update(id, updateTutoringSessionDto);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: 'pending' | 'confirmed' | 'cancelled' | 'completed',
    @Body('cancellation_reason') cancellation_reason?: string,
  ) {
    return this.tutoringSessionService.updateStatus(
      id,
      status,
      cancellation_reason,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.tutoringSessionService.remove(id);
  }
}
