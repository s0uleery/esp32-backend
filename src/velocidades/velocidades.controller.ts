import { Controller, Post, Body, Get } from '@nestjs/common';
import { VelocidadesService } from './velocidades.service'; // Importamos el servicio de Velocidades
import { Velocidad } from './entities/velocidad.entity'; // Importamos la entidad de Velocidad

@Controller('velocidades')
export class VelocidadesController {
  constructor(private readonly service: VelocidadesService) {}

  // Endpoint para crear un nuevo registro de velocidad
  @Post()
  async create(@Body() data: Partial<Velocidad>): Promise<Velocidad> {
    // Creamos una nueva velocidad pasando los datos (parciales)
    return this.service.create(data);
  }

  // Endpoint para obtener todas las velocidades registradas
  @Get()
  async findAll(): Promise<Velocidad[]> {
    // Retorna todos los registros de velocidad en la base de datos
    return this.service.findAll();
  }

  // Endpoint para obtener la última velocidad registrada (si es necesario)
  @Get('ultima')
  async findLast(): Promise<Velocidad | null> {
    const result = await this.service.findLast();
    if (!result) {
      return null; // Retorna null si no hay registros
    }
    return result; // Retorna el último registro encontrado
  }
}
