import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TutoringPlatformsService } from './tutoring_platforms.service';
import { CreateTutoringPlatformDto } from './dto/create-tutoring_platform.dto';
import { UpdateTutoringPlatformDto } from './dto/update-tutoring_platform.dto';

@Controller('tutoring-platforms')
export class TutoringPlatformsController {
  constructor(
    private readonly tutoringPlatformsService: TutoringPlatformsService,
  ) {}

  @Post()
  create(@Body() createTutoringPlatformDto: CreateTutoringPlatformDto) {
    return this.tutoringPlatformsService.create(createTutoringPlatformDto);
  }

  @Get()
  findAll() {
    return this.tutoringPlatformsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tutoringPlatformsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTutoringPlatformDto: UpdateTutoringPlatformDto,
  ) {
    return this.tutoringPlatformsService.update(+id, updateTutoringPlatformDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tutoringPlatformsService.remove(+id);
  }
}
