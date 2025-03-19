import { Module } from '@nestjs/common';
import { TutoringSessionService } from './tutoring_session.service';
import { TutoringSessionController } from './tutoring_session.controller';
import { TutoringSession } from './entities/tutoring_session.entity';

@Module({
  imports: [TutoringSession],
  controllers: [TutoringSessionController],
  providers: [TutoringSessionService],
})
export class TutoringSessionModule {}
