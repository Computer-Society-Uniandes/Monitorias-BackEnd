import { Injectable } from '@nestjs/common';
import { Opcion } from './opcion.entity';

@Injectable()
export class OpcionService {
  private opcions: Opcion[] = []; // Simulación de base de datos

  findAll(): Opcion[] {
    return this.opcions;
  }

  create(opcion: Opcion): Opcion {
    this.opcions.push(opcion);
    return opcion;
  }

  findById(id: number): Opcion | undefined {
    return this.opcions.find((opcion) => opcion.id === id);
  }
}
