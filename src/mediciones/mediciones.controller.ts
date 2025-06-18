import { Controller, Post, Body, Get } from '@nestjs/common';
import { MedicionesService } from './mediciones.service';
import { Medicion } from './entities/medicion.entity';

@Controller('mediciones')
export class MedicionesController {
  constructor(private readonly service: MedicionesService) {}

  @Post()
  create(@Body() data: Partial<Medicion>) {
    return this.service.create(data);
  }

  @Get()
  findAll(): Promise<Medicion[]> {
    return this.service.findAll();
  }
}
