import { Course } from 'src/course/entities/course.entity';
import { Student } from 'src/student/entities/student.entity';
import { Tutor } from 'src/tutor/entities/tutor.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class GroupTutoringSession {
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

  @ManyToOne(() => Course, (course) => course.group_tutoring_sessions)
  course: Course;

  @ManyToMany(() => Student, (students) => students.group_tutoring_sessions)
  @JoinTable()
  students: Student[];

  @ManyToMany(() => Tutor, (tutors) => tutors.group_tutoring_sessions)
  @JoinTable()
  tutors: Tutor[];
}
