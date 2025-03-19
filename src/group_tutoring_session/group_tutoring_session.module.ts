import { Module } from '@nestjs/common';
import { GroupTutoringSessionService } from './group_tutoring_session.service';
import { GroupTutoringSessionController } from './group_tutoring_session.controller';
import { GroupTutoringSession } from './entities/group_tutoring_session.entity';

@Module({
  imports: [GroupTutoringSession],
  controllers: [GroupTutoringSessionController],
  providers: [GroupTutoringSessionService],
})
export class GroupTutoringSessionModule {}
