import { Schedule } from 'src/schedule/entities/schedule.entity';
import { Tutor } from 'src/tutor/entities/tutor.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum Recurrence {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
  NEVER = 'never',
}

export enum Weekday {
  SUNDAY = 'sunday',
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
  SATURDAY = 'saturday',
}

@Entity()
export class Availability {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  start_hour: Date;

  @Column()
  end_hour: Date;

  @Column()
  blackout_date: Date;

  @Column({
    type: 'enum',
    enum: Recurrence,
    default: Recurrence.NEVER,
  })
  recurrence: Recurrence;

  @Column({
    type: 'enum',
    enum: Weekday,
    default: Weekday.SUNDAY,
  })
  weekday: Weekday;

  @ManyToOne(() => Tutor, (tutor) => tutor.availabilities)
  tutor: Tutor;

  @ManyToOne(() => Schedule, (schedule) => schedule.availabilities)
  schedule: Schedule;
}
