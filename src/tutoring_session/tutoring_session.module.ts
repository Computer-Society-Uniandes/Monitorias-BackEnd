import { Module } from '@nestjs/common';
import { TutoringSessionService } from './tutoring_session.service';
import { TutoringSessionController } from './tutoring_session.controller';

@Module({
  controllers: [TutoringSessionController],
  providers: [TutoringSessionService],
  exports: [TutoringSessionService],
})
export class TutoringSessionModule {}
