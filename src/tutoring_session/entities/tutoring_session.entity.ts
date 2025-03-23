import { Review } from 'src/review/entities/review.entity';
import { Student } from 'src/student/entities/student.entity';
import { Topic } from 'src/topics/entities/topics.entity';
import { Tutor } from 'src/tutor/entities/tutor.entity';
import { TutoringPlatform } from 'src/tutoring_platforms/entities/tutoring_platform.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class TutoringSession {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  start_hour: Date;

  @Column()
  end_hour: Date;

  @Column()
  notes: string;

  @Column()
  status: string;

  @Column()
  time_added: number;

  @Column()
  price: number;

  @OneToMany(() => Review, (reviews) => reviews.tutoring_session)
  reviews: Review[];

  @ManyToOne(() => Student, (student) => student.tutoring_sessions)
  student: Student;

  @ManyToMany(() => Topic, (topics) => topics.tutoring_sessions)
  @JoinTable()
  topics: Topic[];

  @ManyToOne(() => Tutor, (tutor) => tutor.tutoring_sessions)
  tutor: Tutor;

  @ManyToOne(
    () => TutoringPlatform,
    (tutoring_platform) => tutoring_platform.tutoring_sessions,
  )
  tutoring_platform: TutoringPlatform;
}
