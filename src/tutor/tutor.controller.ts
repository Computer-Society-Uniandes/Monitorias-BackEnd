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

@Controller('tutors')
export class TutorController {
  constructor(private readonly tutorService: TutorService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTutorDto: CreateTutorDto) {
    return this.tutorService.create(createTutorDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Query('course_id') course_id?: string) {
    if (course_id) {
      return this.tutorService.findByCourse(course_id);
    }
    return this.tutorService.findAll();
  }

  @Get('email/:email')
  findByEmail(@Param('email') email: string) {
    return this.tutorService.findByEmail(email);
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
