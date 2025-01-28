import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Opcion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  departamento: string;
}
