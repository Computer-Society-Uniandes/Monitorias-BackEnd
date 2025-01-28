import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { OpcionService } from './opcion.service';
import { Opcion } from './opcion.entity';

@Controller('opcion')
export class OpcionController {
  constructor(private readonly opcionService: OpcionService) {}

  @Get()
  findAll(): Opcion[] {
    return this.opcionService.findAll();
  }

  @Post()
  create(@Body() opcion: Opcion): Opcion {
    return this.opcionService.create(opcion);
  }

  @Get(':id')
  findById(@Param('id') id: number): Opcion | undefined {
    return this.opcionService.findById(Number(id));
  }
}
