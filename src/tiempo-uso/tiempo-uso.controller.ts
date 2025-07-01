// src/tiempo-uso/tiempo-uso.controller.ts
import { Controller, Post, Get, Body } from '@nestjs/common';
import { TiempoUsoService } from './tiempo-uso.service';
import { CreateTiempoUsoDto } from './dto/create-tiempo-uso.dto'; // Asegúrate de importar el DTO
import { TiempoUso } from './entities/tiempo-uso.entity';

@Controller('tiempo-uso')
export class TiempoUsoController {
  constructor(private readonly service: TiempoUsoService) {}

  @Post()
  create(@Body() data: CreateTiempoUsoDto) {
    return this.service.create(data);
  }

  @Get()
  findAll(): Promise<TiempoUso[]> {
    return this.service.findAll();
  }
}
