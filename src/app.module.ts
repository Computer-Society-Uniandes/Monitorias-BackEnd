import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { StudentModule } from './student/student.module';
import { TutorModule } from './tutor/tutor.module';
import { CourseModule } from './course/course.module';
import { TopicsModule } from './topics/topics.module';
import { TutoringSessionModule } from './tutoring_session/tutoring_session.module';
import { GroupTutoringSessionModule } from './group_tutoring_session/group_tutoring_session.module';
import { ReviewModule } from './review/review.module';
import { TutoringPlatformsModule } from './tutoring_platforms/tutoring_platforms.module';
import { ScheduleModule } from './schedule/schedule.module';
import { AvailabilityModule } from './availability/availability.module';

@Module({
  imports: [
    UserModule,
    StudentModule,
    TutorModule,
    CourseModule,
    TopicsModule,
    TutoringSessionModule,
    GroupTutoringSessionModule,
    ReviewModule,
    TutoringPlatformsModule,
    ScheduleModule,
    AvailabilityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
