import { GroupTutoringSession } from 'src/group_tutoring_session/entities/group_tutoring_session.entity';
import { Topic } from 'src/topics/entities/topics.entity';
import { Tutor } from 'src/tutor/entities/tutor.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

export enum CourseComplexity {
  INTRODUCTORY = 'BASIC',
  FOUNDATIONAL = 'INTERMEDIATE',
  CHALLENGING = 'ADVANCED',
}
@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: CourseComplexity,
    default: CourseComplexity.INTRODUCTORY,
  })
  complexity: CourseComplexity;

  @Column()
  base_price: number;

  @Column()
  code: string;

  @OneToMany(() => Topic, (topics) => topics.course)
  topics: Topic[];

  @OneToMany(
    () => GroupTutoringSession,
    (group_tutoring_sessions) => group_tutoring_sessions.course,
  )
  group_tutoring_sessions: GroupTutoringSession[];

  @ManyToMany(() => Tutor, (tutors) => tutors.courses)
  @JoinTable()
  tutors: Tutor[];
}
