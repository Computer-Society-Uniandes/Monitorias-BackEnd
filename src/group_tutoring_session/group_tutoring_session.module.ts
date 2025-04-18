import { Module } from '@nestjs/common';
import { GroupTutoringSessionService } from './group_tutoring_session.service';
import { GroupTutoringSessionController } from './group_tutoring_session.controller';

@Module({
  controllers: [GroupTutoringSessionController],
  providers: [GroupTutoringSessionService],
  exports: [GroupTutoringSessionService],
})
export class GroupTutoringSessionModule {}
