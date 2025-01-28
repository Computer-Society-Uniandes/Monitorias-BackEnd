import { Injectable } from '@nestjs/common';
import { Carrera } from './carrera.entity';

@Injectable()
export class CarreraService {
  private carreras: Carrera[] = []; // Simulación de base de datos

  findAll(): Carrera[] {
    return this.carreras;
  }

  create(carrera: Carrera): Carrera {
    this.carreras.push(carrera);
    return carrera;
  }

  findById(id: number): Carrera | undefined {
    return this.carreras.find((carrera) => carrera.id === id);
  }
}
