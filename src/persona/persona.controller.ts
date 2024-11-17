import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { Persona } from './persona.entity';

@Controller('persona')
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {}

  @Get()
  findAll(): Persona[] {
    return this.personaService.findAll();
  }

  @Post()
  create(@Body() persona: Persona): Persona {
    return this.personaService.create(persona);
  }

  @Get(':id')
  findById(@Param('id') id: number): Persona | undefined {
    return this.personaService.findById(Number(id));
  }
}
