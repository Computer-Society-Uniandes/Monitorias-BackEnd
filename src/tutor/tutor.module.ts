import { Module } from '@nestjs/common';
import { TutorController } from './tutor.controller';
import { TutorService } from './tutor.service';
import { Tutor } from './entities/tutor.entity';

@Module({
  imports: [Tutor],
  controllers: [TutorController],
  providers: [TutorService],
})
export class TutorModule {}
