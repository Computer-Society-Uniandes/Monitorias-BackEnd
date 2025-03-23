import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';

export enum UserMajor {
  ISIS = 'Ingenieria de Sistemas y Computacion',
  IIND = 'Ingenieria Industrial',
  IELE = 'Ingenieria Electronica',
  IBIO = 'Ingenieria Biomedica',
}

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  bio: string;

  @Column()
  phone_number: string;

  @Column({
    type: 'enum',
    enum: UserMajor,
    default: UserMajor.ISIS,
  })
  major: UserMajor;
}
