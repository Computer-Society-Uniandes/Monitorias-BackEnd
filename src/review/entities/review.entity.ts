import { Tutor } from 'src/tutor/entities/tutor.entity';
import { TutoringSession } from 'src/tutoring_session/entities/tutoring_session.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  comment: string;

  @Column()
  suggestions: string;

  @Column()
  score: string;

  @ManyToOne(() => Tutor, (tutor) => tutor.reviews)
  tutor: Tutor;

  @ManyToOne(
    () => TutoringSession,
    (tutoring_session) => tutoring_session.reviews,
  )
  tutoring_session: TutoringSession;
}
