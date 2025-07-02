// src/mqtt-handler/mqtt-handler.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import * as mqtt from 'mqtt';
import { MqttHandlerGateway } from './mqtt-handler.gateway'; // Importa el Gateway para emitir eventos
import { MedicionesService } from 'src/mediciones/mediciones.service';
import { TiempoUsoService } from 'src/tiempo-uso/tiempo-uso.service';
import { EnergiaService } from 'src/energia/energia.service';

@Injectable()
export class MqttHandlerService implements OnModuleInit {
  private client: mqtt.MqttClient;

  constructor(
    private readonly mqttHandlerGateway: MqttHandlerGateway,
    private readonly medicionesService: MedicionesService,
    private readonly tiempoUsoService: TiempoUsoService,
    private readonly energiaService: EnergiaService,
  ) {}

  private sesionActiva: {
    inicio: number;
    velocidades: number[];
  } | null = null;

  onModuleInit() {
    // Conectar al broker MQTT
    const mqttBrokerUrl =
      process.env.MQTT_BROKER_URL || 'mqtt://192.168.208.74';
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
      void (async () => {
        const data = payload.toString();
        console.log(`MQTT [${topic}] → ${data}`);

        if (topic === 'ventilador/velocidad/status') {
          const velocidad = parseInt(data);
          this.mqttHandlerGateway.emitVelocidadActual(velocidad, velocidad > 0);

          if (velocidad > 0 && !this.sesionActiva) {
            // Comenzar nueva sesión
            this.sesionActiva = {
              inicio: Date.now(),
              velocidades: [velocidad],
            };
          } else if (velocidad > 0 && this.sesionActiva) {
            // Añadir velocidad a la sesión activa
            this.sesionActiva.velocidades.push(velocidad);
          }
        }

        if (topic === 'ventilador/estado') {
          const estado = data === 'true';
          this.mqttHandlerGateway.emitEstadoVentilador(estado);

          if (!estado && this.sesionActiva) {
            // Fin de sesión
            const fin = Date.now();
            const duracionSeg = Math.floor(
              (fin - this.sesionActiva.inicio) / 1000,
            );
            const promedio = Math.round(
              this.sesionActiva.velocidades.reduce((a, b) => a + b, 0) /
                this.sesionActiva.velocidades.length,
            );

            const tiempo = await this.tiempoUsoService.create({
              inicio: new Date(this.sesionActiva.inicio),
              fin: new Date(fin),
              duracion_seg: duracionSeg,
              velocidad_prom: promedio,
            });
            await this.energiaService.create(tiempo.id);
            this.sesionActiva = null;
          }
        }

        try {
          switch (topic) {
            case 'sensor/ambiente/temperatura': {
              const valor = parseFloat(data);
              await this.medicionesService.create({ temperatura: valor });
              this.mqttHandlerGateway.emitMedicion({
                tipo: 'temperatura',
                valor,
              });
              break;
            }

            case 'sensor/ambiente/humedad': {
              const valor = parseFloat(data);
              await this.medicionesService.create({ humedad: valor });
              this.mqttHandlerGateway.emitMedicion({ tipo: 'humedad', valor });
              break;
            }

            case 'sensor/ambiente/gas/analogico': {
              const valor = parseInt(data);
              await this.medicionesService.create({ gas_analogico: valor });
              this.mqttHandlerGateway.emitMedicion({
                tipo: 'gas_analogico',
                valor,
              });
              break;
            }

            case 'sensor/ambiente/gas/digital': {
              const valor = data === '1' || data === 'true';
              await this.medicionesService.create({ gas_digital: valor });
              this.mqttHandlerGateway.emitMedicion({
                tipo: 'gas_digital',
                valor: valor ? 1 : 0,
              });
              break;
            }
          }
        } catch (err) {
          if (err instanceof Error) {
            console.error('Error al guardar medición:', err.message);
          } else {
            console.error('Error desconocido:', err);
          }
        }
      })();
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
    const mqttBrokerUrl =
      process.env.MQTT_BROKER_URL || 'mqtt://192.168.208.74';
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
