import { TutoringSession } from 'src/tutoring_session/entities/tutoring_session.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum LocationType {
  ONLINE = 'online',
  CUSTOM_LOCATION = 'in_person',
}

@Entity()
export class TutoringPlatform {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: LocationType,
    default: LocationType.ONLINE,
  })
  location_type: LocationType;

  @Column()
  url: string;

  @OneToMany(
    () => TutoringSession,
    (tutoring_sessions) => tutoring_sessions.tutoring_platform,
  )
  tutoring_sessions: TutoringSession[];
}
