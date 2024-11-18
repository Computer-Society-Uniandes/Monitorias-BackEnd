import { Injectable } from '@nestjs/common';
import { Persona } from './persona.entity';

@Injectable()
export class PersonaService {
  private personas: Persona[] = []; // Simulación de base de datos

  findAll(): Persona[] {
    return this.personas;
  }

  create(persona: Persona): Persona {
    this.personas.push(persona);
    return persona;
  }

  findById(id: number): Persona | undefined {
    return this.personas.find(persona => persona.id === id);
  }
}
