// src/mqtt-handler/mqtt-handler.service.ts
// src/mqtt-handler/mqtt-handler.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import * as mqtt from 'mqtt';
import { MqttHandlerGateway } from './mqtt-handler.gateway'; // Importa el Gateway para emitir eventos

@Injectable()
export class MqttHandlerService implements OnModuleInit {
  private client: mqtt.MqttClient;

  constructor(private readonly mqttHandlerGateway: MqttHandlerGateway) {}

  onModuleInit() {
    this.client = mqtt.connect('mqtt://localhost:1883'); // Conectar al broker MQTT

    this.client.on('connect', () => {
      console.log('✅ Conectado al broker MQTT');
      this.client.subscribe('ventilador/velocidad/status'); // Escuchar cambios de velocidad
    });

    this.client.on('message', (topic, payload) => {
      const data = payload.toString();
      console.log(`📥 MQTT recibido en [${topic}]: ${data}`);

      if (topic === 'ventilador/velocidad/status') {
        const velocidad = parseInt(data);
        this.mqttHandlerGateway.emitVelocidadActual(velocidad); // Emitir el evento WebSocket
      }
    });

    this.client.on('error', (err) => {
      console.error('❌ Error MQTT:', err);
    });
  }

  publish(topic: string, message: string) {
    if (this.client?.connected) {
      this.client.publish(topic, message, { retain: true });
      console.log(`📤 MQTT enviado → ${topic} : ${message}`);
    } else {
      console.warn('⚠️ Cliente MQTT no conectado');
    }
  }

  setVelocidad(nivel: number) {
    const velocidad = Math.max(0, Math.min(3, nivel)); // Limitar a rango 0–3
    this.publish('ventilador/velocidad/set', velocidad.toString()); // Publicar el cambio en MQTT
  }
}
