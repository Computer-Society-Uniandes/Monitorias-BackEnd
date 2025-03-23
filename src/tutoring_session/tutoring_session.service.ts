import { Injectable } from '@nestjs/common';
import { CreateTutoringSessionDto } from './dto/create-tutoring_session.dto';
import { UpdateTutoringSessionDto } from './dto/update-tutoring_session.dto';

@Injectable()
export class TutoringSessionService {
  create(createTutoringSessionDto: CreateTutoringSessionDto) {
    return 'This action adds a new tutoringSession';
  }

  findAll() {
    return `This action returns all tutoringSession`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tutoringSession`;
  }

  update(id: number, updateTutoringSessionDto: UpdateTutoringSessionDto) {
    return `This action updates a #${id} tutoringSession`;
  }

  remove(id: number) {
    return `This action removes a #${id} tutoringSession`;
  }
}
