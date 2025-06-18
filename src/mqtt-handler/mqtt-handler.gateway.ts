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
  // Emitir la velocidad y el estado actual del ventilador a todos los clientes conectados
  emitVelocidadActual(velocidad: number, estado: boolean) {
    return {
      event: 'estado_ventilador', // Nombre del evento
      data: {
        velocidad, // Velocidad actual
        estado, // Estado del ventilador (encendido o apagado)
      }, // Datos enviados
    };
  }

  // Emitir el estado del ventilador (encendido o apagado)
  emitEstadoVentilador(estado: boolean) {
    return {
      event: 'estado_ventilador', // Nombre del evento
      data: {
        estado, // Estado del ventilador (encendido o apagado)
      }, // Datos enviados
    };
  }

  // Escuchar el cambio de velocidad desde la app (si es necesario)
  @SubscribeMessage('cambiar_velocidad')
  handleVelocidadChange(@MessageBody() velocidad: number): WsResponse<any> {
    // Emitir el evento WebSocket con la nueva velocidad y el estado del ventilador (encendido o apagado)
    const estado = velocidad > 0; // Si la velocidad es mayor a 0, el ventilador está encendido
    return { event: 'estado_ventilador', data: { velocidad, estado } };
  }
}
