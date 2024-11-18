import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Persona {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  codigo: string;

  @Column()
  nombre: string;

  @Column()
  numero: string;

  @Column()
  email: string;

  @Column()
  semestre: string;

  @Column()
  disponibilidad: boolean;
}
