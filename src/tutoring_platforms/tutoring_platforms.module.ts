import { Module } from '@nestjs/common';
import { TutoringPlatformsService } from './tutoring_platforms.service';
import { TutoringPlatformsController } from './tutoring_platforms.controller';
import { TutoringPlatform } from './entities/tutoring_platform.entity';

@Module({
  imports: [TutoringPlatform],
  controllers: [TutoringPlatformsController],
  providers: [TutoringPlatformsService],
})
export class TutoringPlatformsModule {}
