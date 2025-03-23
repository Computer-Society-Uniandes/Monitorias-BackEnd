import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { Review } from './entities/review.entity';

@Module({
  imports: [Review],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
