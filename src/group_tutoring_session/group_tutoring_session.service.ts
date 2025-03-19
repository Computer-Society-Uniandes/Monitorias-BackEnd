import { Injectable } from '@nestjs/common';
import { CreateGroupTutoringSessionDto } from './dto/create-group_tutoring_session.dto';
import { UpdateGroupTutoringSessionDto } from './dto/update-group_tutoring_session.dto';

@Injectable()
export class GroupTutoringSessionService {
  create(createGroupTutoringSessionDto: CreateGroupTutoringSessionDto) {
    return 'This action adds a new groupTutoringSession';
  }

  findAll() {
    return `This action returns all groupTutoringSession`;
  }

  findOne(id: number) {
    return `This action returns a #${id} groupTutoringSession`;
  }

  update(
    id: number,
    updateGroupTutoringSessionDto: UpdateGroupTutoringSessionDto,
  ) {
    return `This action updates a #${id} groupTutoringSession`;
  }

  remove(id: number) {
    return `This action removes a #${id} groupTutoringSession`;
  }
}
