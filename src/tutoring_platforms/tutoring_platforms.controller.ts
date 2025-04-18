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
import { TutoringPlatformsService } from './tutoring_platforms.service';
import { CreateTutoringPlatformDto } from './dto/create_tutoring_platform.dto';
import { UpdateTutoringPlatformDto } from './dto/update_tutoring_platform.dto';

@Controller('tutoring_platform')
export class TutoringPlatformsController {
  constructor(
    private readonly tutoringPlatformsService: TutoringPlatformsService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTutoringPlatformDto: CreateTutoringPlatformDto) {
    return this.tutoringPlatformsService.create(createTutoringPlatformDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Query('active') active?: string) {
    if (active === 'true') {
      return this.tutoringPlatformsService.findActive();
    }
    return this.tutoringPlatformsService.findAll();
  }

  @Get('name/:name')
  findByName(@Param('name') name: string) {
    return this.tutoringPlatformsService.findByName(name);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.tutoringPlatformsService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() updateTutoringPlatformDto: UpdateTutoringPlatformDto,
  ) {
    return this.tutoringPlatformsService.update(id, updateTutoringPlatformDto);
  }

  @Patch(':id/toggle-active')
  toggleActive(@Param('id') id: string) {
    return this.tutoringPlatformsService.toggleActive(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.tutoringPlatformsService.remove(id);
  }
}
