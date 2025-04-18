import { Module } from '@nestjs/common';
import { TutoringPlatformsService } from './tutoring_platforms.service';
import { TutoringPlatformsController } from './tutoring_platforms.controller';

@Module({
  controllers: [TutoringPlatformsController],
  providers: [TutoringPlatformsService],
  exports: [TutoringPlatformsService],
})
export class TutoringPlatformsModule {}
