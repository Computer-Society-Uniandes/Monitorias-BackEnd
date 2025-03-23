import { Module } from '@nestjs/common';
import { TopicsController } from './topics.controller';
import { TopicsService } from './topics.service';
import { Topic } from './entities/topics.entity';

@Module({
  imports: [Topic],
  controllers: [TopicsController],
  providers: [TopicsService],
})
export class TopicsModule {}
