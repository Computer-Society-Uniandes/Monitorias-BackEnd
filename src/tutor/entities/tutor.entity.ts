import { Availability } from 'src/availability/entities/availability.entity';
import { Course } from 'src/course/entities/course.entity';
import { GroupTutoringSession } from 'src/group_tutoring_session/entities/group_tutoring_session.entity';
import { Review } from 'src/review/entities/review.entity';
import { Schedule } from 'src/schedule/entities/schedule.entity';
import { TutoringSession } from 'src/tutoring_session/entities/tutoring_session.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  ChildEntity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  OneToOne,
} from 'typeorm';

@Entity()
@ChildEntity()
export class Tutor extends User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  school_email: string;

  @Column()
  expirience: number;

  @Column()
  credits: number;

  @Column()
  experience_description: string;

  @OneToMany(() => Availability, (availabilities) => availabilities.tutor)
  availabilities: Availability[];

  @ManyToMany(() => Course, (courses) => courses.tutors)
  courses: Course[];

  @ManyToMany(
    () => GroupTutoringSession,
    (group_tutoring_sessions) => group_tutoring_sessions.tutors,
  )
  group_tutoring_sessions: GroupTutoringSession[];

  @OneToMany(() => Review, (reviews) => reviews.tutor)
  reviews: Review[];

  @OneToOne(() => Schedule, (schedule) => schedule.tutor)
  schedule: Schedule;

  @OneToMany(
    () => TutoringSession,
    (tutoring_sessions) => tutoring_sessions.tutor,
  )
  tutoring_sessions: TutoringSession[];
}
