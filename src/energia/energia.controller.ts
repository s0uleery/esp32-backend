import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { EnergiaService } from './energia.service';

@Controller('energia')
export class EnergiaController {
  constructor(private readonly service: EnergiaService) {}

  @Post()
  create(@Body('tiempoUsoId') tiempoUsoId: number) {
    return this.service.create(tiempoUsoId);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(+id);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
