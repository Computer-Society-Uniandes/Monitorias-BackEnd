import { Review } from 'src/review/entities/review.entity';
import { Student } from 'src/student/entities/student.entity';
import { Topic } from 'src/topics/entities/topics.entity';
import { Tutor } from 'src/tutor/entities/tutor.entity';
import { TutoringPlatform } from 'src/tutoring_platforms/entities/tutoring_platform.entity';

export class TutoringSession {
  id: string;
  title: string;
  description?: string;
  start_time: Date;
  end_time: Date;
  status?: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  cancellation_reason?: string;
  meeting_url?: string;
  tutor: Tutor;
  student: Student;
  topic: Topic;
  platform: TutoringPlatform;
  created_at: Date;
  updated_at: Date;
  reviews: Review[];
}
