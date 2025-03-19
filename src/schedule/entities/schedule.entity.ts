import { Availability } from 'src/availability/entities/availability.entity';
import { Tutor } from 'src/tutor/entities/tutor.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  timezone: string;

  @Column()
  auto_accept_session: boolean;

  @Column()
  min_booking_notice: number;

  @Column()
  max_sessions_per_day: number;

  @Column()
  buffer_time: number;

  @OneToMany(() => Availability, (availabilities) => availabilities.schedule)
  availabilities: Availability[];

  @OneToOne(() => Tutor, (tutor) => tutor.schedule)
  tutor: Tutor;
}
