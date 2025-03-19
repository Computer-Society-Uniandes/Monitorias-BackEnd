import { GroupTutoringSession } from 'src/group_tutoring_session/entities/group_tutoring_session.entity';
import { TutoringSession } from 'src/tutoring_session/entities/tutoring_session.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, ChildEntity, ManyToMany, OneToMany } from 'typeorm';

@Entity()
@ChildEntity()
export class Student extends User {
  @ManyToMany(
    () => GroupTutoringSession,
    (group_tutoring_sessions) => group_tutoring_sessions.students,
  )
  group_tutoring_sessions: GroupTutoringSession[];

  @OneToMany(
    () => TutoringSession,
    (tutoring_sessions) => tutoring_sessions.student,
  )
  tutoring_sessions: TutoringSession[];
}
