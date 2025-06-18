import { Controller, Post, Get, Body } from '@nestjs/common';
import { TiempoUsoService } from './tiempo-uso.service';
import { TiempoUso } from './entities/tiempo-uso.entity';

@Controller('tiempo-uso')
export class TiempoUsoController {
  constructor(private readonly service: TiempoUsoService) {}

  @Post()
  create(@Body() data: Partial<TiempoUso>) {
    return this.service.create(data);
  }

  @Get()
  findAll(): Promise<TiempoUso[]> {
    return this.service.findAll();
  }
}
