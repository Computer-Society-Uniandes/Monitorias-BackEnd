import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { Schedule } from './entities/schedule.entity';

@Module({
  imports: [Schedule],
  controllers: [ScheduleController],
  providers: [ScheduleService],
})
export class ScheduleModule {}
