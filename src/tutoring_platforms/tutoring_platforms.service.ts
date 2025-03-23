import { Injectable } from '@nestjs/common';
import { CreateTutoringPlatformDto } from './dto/create-tutoring_platform.dto';
import { UpdateTutoringPlatformDto } from './dto/update-tutoring_platform.dto';

@Injectable()
export class TutoringPlatformsService {
  create(createTutoringPlatformDto: CreateTutoringPlatformDto) {
    return 'This action adds a new tutoringPlatform';
  }

  findAll() {
    return `This action returns all tutoringPlatforms`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tutoringPlatform`;
  }

  update(id: number, updateTutoringPlatformDto: UpdateTutoringPlatformDto) {
    return `This action updates a #${id} tutoringPlatform`;
  }

  remove(id: number) {
    return `This action removes a #${id} tutoringPlatform`;
  }
}
