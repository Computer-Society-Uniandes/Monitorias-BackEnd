import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GroupTutoringSessionService } from './group_tutoring_session.service';
import { CreateGroupTutoringSessionDto } from './dto/create-group_tutoring_session.dto';
import { UpdateGroupTutoringSessionDto } from './dto/update-group_tutoring_session.dto';

@Controller('group-tutoring-session')
export class GroupTutoringSessionController {
  constructor(
    private readonly groupTutoringSessionService: GroupTutoringSessionService,
  ) {}

  @Post()
  create(@Body() createGroupTutoringSessionDto: CreateGroupTutoringSessionDto) {
    return this.groupTutoringSessionService.create(
      createGroupTutoringSessionDto,
    );
  }

  @Get()
  findAll() {
    return this.groupTutoringSessionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupTutoringSessionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGroupTutoringSessionDto: UpdateGroupTutoringSessionDto,
  ) {
    return this.groupTutoringSessionService.update(
      +id,
      updateGroupTutoringSessionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupTutoringSessionService.remove(+id);
  }
}
