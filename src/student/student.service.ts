import { Injectable } from '@nestjs/common';
import { Student } from './student.entity.ts';
@Injectable()
export class StudentService {
  private students: Student[] = []; // Simulación de base de datos
  findAll(): Student[] {
    return this.students;
  }
  create(student: Student): Student {
    this.students.push(student);
    return student;
  }
  findById(id: number): Student | undefined {
    return this.students.find((student) => student.id === id);
  }
}
