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
} from '@nestjs/common';
import { GroupTutoringSessionService } from './group_tutoring_session.service';
import { CreateGroupTutoringSessionDto } from './dto/create-group-tutoring-session.dto';
import { UpdateGroupTutoringSessionDto } from './dto/update-group-tutoring-session.dto';

@Controller('group_tutoring_session')
export class GroupTutoringSessionController {
  constructor(
    private readonly groupTutoringSessionService: GroupTutoringSessionService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createGroupTutoringSessionDto: CreateGroupTutoringSessionDto) {
    return this.groupTutoringSessionService.create(
      createGroupTutoringSessionDto,
    );
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.groupTutoringSessionService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.groupTutoringSessionService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() updateGroupTutoringSessionDto: UpdateGroupTutoringSessionDto,
  ) {
    return this.groupTutoringSessionService.update(
      id,
      updateGroupTutoringSessionDto,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.groupTutoringSessionService.remove(id);
  }
}
