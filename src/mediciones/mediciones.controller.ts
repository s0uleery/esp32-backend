// src/mediciones/mediciones.controller.ts
import { Controller, Post, Get, Body } from '@nestjs/common';
import { MedicionesService } from './mediciones.service';
import { Medicion } from './entities/medicion.entity';

@Controller('mediciones')
export class MedicionesController {
  constructor(private readonly medicionesService: MedicionesService) {}

  @Post()
  create(@Body() data: Partial<Medicion>) {
    return this.medicionesService.create(data);
  }

  @Get()
  findAll() {
    return this.medicionesService.findAll();
  }
}
