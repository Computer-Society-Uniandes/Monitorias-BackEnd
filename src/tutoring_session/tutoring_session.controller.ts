import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TutoringSessionService } from './tutoring_session.service';
import { CreateTutoringSessionDto } from './dto/create-tutoring_session.dto';
import { UpdateTutoringSessionDto } from './dto/update-tutoring_session.dto';

@Controller('tutoring-session')
export class TutoringSessionController {
  constructor(
    private readonly tutoringSessionService: TutoringSessionService,
  ) {}

  @Post()
  create(@Body() createTutoringSessionDto: CreateTutoringSessionDto) {
    return this.tutoringSessionService.create(createTutoringSessionDto);
  }

  @Get()
  findAll() {
    return this.tutoringSessionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tutoringSessionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTutoringSessionDto: UpdateTutoringSessionDto,
  ) {
    return this.tutoringSessionService.update(+id, updateTutoringSessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tutoringSessionService.remove(+id);
  }
}
