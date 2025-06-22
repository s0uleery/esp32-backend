// src/mqtt-handler/mqtt-handler.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import * as mqtt from 'mqtt';
import { MqttHandlerGateway } from './mqtt-handler.gateway'; // Importa el Gateway para emitir eventos

@Injectable()
export class MqttHandlerService implements OnModuleInit {
  private client: mqtt.MqttClient;

  constructor(private readonly mqttHandlerGateway: MqttHandlerGateway) {}

  onModuleInit() {
    // Conectar al broker MQTT
    const mqttBrokerUrl = process.env.MQTT_BROKER_URL || 'mqtt://192.168.1.12';
    this.client = mqtt.connect(mqttBrokerUrl);

    // Cuando se conecta al broker
    this.client.on('connect', () => {
      console.log('Conectado al broker MQTT');
      this.client.subscribe('ventilador/velocidad/status'); // Cambios de velocidad
      this.client.subscribe('ventilador/estado'); // Cambios de estado (encendido o apagado)
      this.client.subscribe('sensor/ambiente/temperatura'); // Temperatura c°
      this.client.subscribe('sensor/ambiente/humedad'); // % de humedad
      this.client.subscribe('sensor/ambiente/gas/analogico'); //numero de gas
      this.client.subscribe('sensor/ambiente/gas/digital'); //Gas nocivo (true or false)
    });

    // Suscribirse a mensajes de MQTT
    this.client.on('message', (topic, payload) => {
      const data = payload.toString();
      console.log(`📩 MQTT recibido → [${topic}]: ${data}`);

      // Ventilador
      if (topic === 'ventilador/velocidad/status') {
        const velocidad = parseInt(data);
        this.mqttHandlerGateway.emitVelocidadActual(velocidad, velocidad > 0);
      }

      if (topic === 'ventilador/estado') {
        const estado = data === 'true';
        this.mqttHandlerGateway.emitEstadoVentilador(estado);
      }

      // Sensores
      if (topic === 'sensor/ambiente/temperatura') {
        const temp = parseFloat(data);
        this.mqttHandlerGateway.emitTemperatura(temp);
      }

      if (topic === 'sensor/ambiente/humedad') {
        const hum = parseFloat(data);
        this.mqttHandlerGateway.emitHumedad(hum);
      }

      if (topic === 'sensor/ambiente/gas/analogico') {
        const gasAO = parseInt(data);
        this.mqttHandlerGateway.emitGasAnalogico(gasAO);
      }

      if (topic === 'sensor/ambiente/gas/digital') {
        const gasDO = parseInt(data);
        this.mqttHandlerGateway.emitGasDigital(gasDO);
      }
    });

    // Manejo de errores
    this.client.on('error', (err) => {
      console.error('Error MQTT:', err);
    });

    // Reconexión automática en caso de desconexión
    this.client.on('close', () => {
      console.log(
        'Conexión con el broker MQTT perdida, intentando reconectar...',
      );
      this.reconnect();
    });
  }

  // Método de reconexión en caso de desconexión
  reconnect() {
    const mqttBrokerUrl = process.env.MQTT_BROKER_URL || 'mqtt://192.168.1.12';
    this.client = mqtt.connect(mqttBrokerUrl);

    this.client.on('connect', () => {
      console.log('Reconectado al broker MQTT');
      this.client.subscribe('ventilador/velocidad/status');
      this.client.subscribe('ventilador/estado');
      this.client.subscribe('sensor/ambiente/temperatura');
      this.client.subscribe('sensor/ambiente/humedad');
      this.client.subscribe('sensor/ambiente/gas/analogico');
      this.client.subscribe('sensor/ambiente/gas/digital');
    });

    this.client.on('error', (err) => {
      console.error('Error de reconexión MQTT:', err);
      setTimeout(() => this.reconnect(), 5000); // Reintentar reconectar cada 5 segundos
    });
  }

  // Publicar un mensaje a MQTT (para cambiar la velocidad)
  publish(topic: string, message: string) {
    if (this.client?.connected) {
      this.client.publish(topic, message, { retain: true });
      console.log(`MQTT enviado → ${topic} : ${message}`);
    } else {
      console.warn('Cliente MQTT no conectado');
    }
  }

  // Función para cambiar la velocidad del ventilador (limitada entre 0 y 3)
  setVelocidad(nivel: number) {
    const velocidad = Math.max(0, Math.min(3, nivel)); // Limitar a rango 0–3
    this.publish('ventilador/velocidad/set', velocidad.toString()); // Publicar el cambio en MQTT
    console.log(`Publicado en MQTT: velocidad cambiada a ${velocidad}`);
  }
}
