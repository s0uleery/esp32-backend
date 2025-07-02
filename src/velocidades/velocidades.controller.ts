import { Controller, Post, Body, Get } from '@nestjs/common';
import { VelocidadesService } from './velocidades.service'; // Importamos el servicio de Velocidades
import { Velocidad } from './entities/velocidad.entity'; // Importamos la entidad de Velocidad
import { MqttHandlerGateway } from '../mqtt-handler/mqtt-handler.gateway'; // Importamos el gateway de MQTT

@Controller('velocidades')
export class VelocidadesController {
  constructor(
    private readonly service: VelocidadesService,
    private readonly mqttHandlerGateway: MqttHandlerGateway, // Inyectamos el MqttHandlerGateway
  ) {}

  // Endpoint para crear un nuevo registro de velocidad
  @Post()
  async create(@Body() data: Partial<Velocidad>): Promise<Velocidad> {
    console.log('Solicitud recibida para cambiar velocidad: ', data);
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

  // Nuevo endpoint para cambiar la velocidad desde HTTP y emitir WebSocket
  // Eliminar async ya que no estamos usando ninguna operación asíncrona
  @Post('cambiar')
  cambiarVelocidad(@Body() body: { velocidad: number }) {
    const velocidad = body.velocidad;

    // Emitir el cambio de velocidad por WebSocket
    this.mqttHandlerGateway.handleVelocidadChange(velocidad);

    // Responder al cliente HTTP
    return {
      success: true,
      velocidad,
    };
  }
}
