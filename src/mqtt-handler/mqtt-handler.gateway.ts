// src/mqtt-handler/mqtt-handler.gateway.ts
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WsResponse,
} from '@nestjs/websockets';
import { Injectable } from '@nestjs/common';

@WebSocketGateway() // Decorador WebSocket Gateway
@Injectable()
export class MqttHandlerGateway {
  // Emitir la velocidad actual del ventilador a todos los clientes conectados
  emitVelocidadActual(velocidad: number) {
    return {
      event: 'estado_ventilador', // Nombre del evento
      data: { velocidad }, // Datos enviados (en este caso, la velocidad)
    };
  }

  // Escuchar el cambio de velocidad desde la app (si es necesario)
  @SubscribeMessage('cambiar_velocidad')
  handleVelocidadChange(@MessageBody() velocidad: number): WsResponse<any> {
    return { event: 'estado_ventilador', data: { velocidad } };
  }
}
