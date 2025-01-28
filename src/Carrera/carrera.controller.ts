import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CarreraService } from './carrera.service';
import { Carrera } from './carrera.entity';

@Controller('carrera')
export class CarreraController {
  constructor(private readonly carreraService: CarreraService) {}

  @Get()
  findAll(): Carrera[] {
    return this.carreraService.findAll();
  }

  @Post()
  create(@Body() carrera: Carrera): Carrera {
    return this.carreraService.create(carrera);
  }

  @Get(':id')
  findById(@Param('id') id: number): Carrera | undefined {
    return this.carreraService.findById(Number(id));
  }
}
