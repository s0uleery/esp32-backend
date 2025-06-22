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
    return { event: 'estado_ventilador', data: { velocidad, estado } };
  }

  // 🔹 Nuevas funciones para emitir datos de sensores

  emitTemperatura(valor: number) {
    this.server.emit('sensor/temperatura', {
      temperatura: valor,
    });
  }

  emitHumedad(valor: number) {
    this.server.emit('sensor/humedad', {
      humedad: valor,
    });
  }

  emitGasAnalogico(valor: number) {
    this.server.emit('sensor/gas/analogico', {
      gasAnalogico: valor,
    });
  }

  emitGasDigital(valor: number) {
    this.server.emit('sensor/gas/digital', {
      gasDigital: valor,
    });
  }
}
