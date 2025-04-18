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
import { TutorService } from './tutor.service';
import { CreateTutorDto } from './dto/create-tutor.dto';
import { UpdateTutorDto } from './dto/update-tutor.dto';

@Controller('tutor')
export class TutorController {
  constructor(private readonly tutorService: TutorService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTutorDto: CreateTutorDto) {
    return this.tutorService.create(createTutorDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(
    @Query('course_id') course_id?: string,
    @Query('search') search?: string,
    @Query('minRating') minRating?: string,
    @Query('minExperience') minExperience?: string,
  ) {
    return this.tutorService.findAll({
      course_id,
      search,
      minRating: minRating ? Number(minRating) : undefined,
      minExperience: minExperience ? Number(minExperience) : undefined,
    });
  }

  @Get('email/:email')
  findByEmail(@Param('email') email: string) {
    return this.tutorService.findByEmail(email);
  }

  @Get('filter')
  filterTutors(
    @Query('name') name?: string,
    @Query('major') major?: string,
    @Query('minExperience') minExperience?: string,
    @Query('maxCredits') maxCredits?: string,
    @Query('course_ids') course_ids?: string,
    @Query('hasAvailability') hasAvailability?: string,
  ) {
    return this.tutorService.findByFilters({
      name,
      major,
      minExperience: minExperience ? Number(minExperience) : undefined,
      maxCredits: maxCredits ? Number(maxCredits) : undefined,
      course_ids: course_ids ? course_ids.split(',') : undefined,
      hasAvailability: hasAvailability === 'true',
    });
  }

  @Get('availability')
  findByAvailability(
    @Query('weekday') weekday?: string,
    @Query('start_time') start_time?: string,
    @Query('end_time') end_time?: string,
    @Query('recurrence') recurrence?: string,
  ) {
    return this.tutorService.findByAvailability({
      weekday,
      start_time: start_time ? new Date(start_time) : undefined,
      end_time: end_time ? new Date(end_time) : undefined,
      recurrence,
    });
  }

  @Get('criteria')
  findByTutorCriteria(
    @Query('experience') experience?: string,
    @Query('credits') credits?: string,
    @Query('major') major?: string,
    @Query('course_ids') course_ids?: string,
    @Query('minRating') minRating?: string,
  ) {
    return this.tutorService.findByTutorCriteria({
      experience: experience ? Number(experience) : undefined,
      credits: credits ? Number(credits) : undefined,
      major,
      course_ids: course_ids ? course_ids.split(',') : undefined,
      minRating: minRating ? Number(minRating) : undefined,
    });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.tutorService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateTutorDto: UpdateTutorDto) {
    return this.tutorService.update(id, updateTutorDto);
  }

  @Patch(':id/rating')
  updateRating(@Param('id') id: string, @Body('rating') rating: number) {
    return this.tutorService.updateRating(id, rating);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.tutorService.remove(id);
  }
}
