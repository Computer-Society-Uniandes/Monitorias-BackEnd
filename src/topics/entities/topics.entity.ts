import { Course } from 'src/course/entities/course.entity';
import { TutoringSession } from 'src/tutoring_session/entities/tutoring_session.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Topic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Course, (course) => course.topics)
  course: Course;

  @ManyToMany(
    () => TutoringSession,
    (tutoring_sessions) => tutoring_sessions.topics,
  )
  tutoring_sessions: TutoringSession[];
}
