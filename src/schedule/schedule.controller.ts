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
  BadRequestException,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createScheduleDto: CreateScheduleDto) {
    return this.scheduleService.create(createScheduleDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.scheduleService.findAll();
  }

  @Get('tutor/:tutor_id')
  findByTutor(@Param('tutor_id') tutor_id: string) {
    return this.scheduleService.findByTutor(tutor_id);
  }

  @Get('availability')
  @HttpCode(HttpStatus.OK)
  findAvailableSlots(
    @Query('tutor_id') tutor_id: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    if (!tutor_id || !startDate || !endDate) {
      throw new BadRequestException(
        'tutor_id, startDate, and endDate are required parameters',
      );
    }

    return this.scheduleService.findAvailableSlots({
      tutor_id: tutor_id,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.scheduleService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ) {
    return this.scheduleService.update(id, updateScheduleDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.scheduleService.remove(id);
  }
}
