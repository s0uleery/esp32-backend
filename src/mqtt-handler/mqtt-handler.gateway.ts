// mqtt-handler.gateway.ts
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WsResponse,
  WebSocketServer,
} from '@nestjs/websockets';
import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@WebSocketGateway()
@Injectable()
export class MqttHandlerGateway {
  @WebSocketServer()
  server: Server;

  // 🔹 Emitir velocidad y estado del ventilador
  emitVelocidadActual(velocidad: number, estado: boolean) {
    this.server.emit('estado_ventilador', {
      velocidad,
      estado,
    });
  }

  // 🔹 Emitir solo estado (true o false)
  emitEstadoVentilador(estado: boolean) {
    this.server.emit('estado_ventilador', {
      estado,
    });
  }

  // 🔹 Escuchar desde frontend si se envía una nueva velocidad
  @SubscribeMessage('cambiar_velocidad')
  handleVelocidadChange(@MessageBody() velocidad: number): WsResponse<any> {
    const estado = velocidad > 0;

    console.log('Recibido cambio de velocidad:', velocidad, 'Estado:', estado); // Agrega este log

    this.emitVelocidadActual(velocidad, estado); // Emite la nueva velocidad

    return { event: 'estado_ventilador', data: { velocidad, estado } };
  }

  // 🔹 Emitir cualquier medición nueva (temperatura, humedad, gas, etc.)
  emitMedicion(medicion: { tipo: string; valor: number }) {
    this.server.emit('nueva_medicion', medicion);
  }
}
