import { Controller, Post, Body, Get } from '@nestjs/common';
import { VelocidadesService } from './velocidades.service';
import { Velocidad } from './entities/velocidad.entity';

@Controller('velocidades')
export class VelocidadesController {
  constructor(private readonly service: VelocidadesService) {}

  @Post()
  create(@Body() data: Partial<Velocidad>) {
    return this.service.create(data);
  }

  @Get()
  findAll(): Promise<Velocidad[]> {
    return this.service.findAll();
  }
}
