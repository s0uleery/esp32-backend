import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { MedicionesService } from '../mediciones/mediciones.service';
import { VelocidadesService } from '../velocidades/velocidades.service';

@Controller()
export class MqttHandlerController {
  constructor(
    private readonly medicionesService: MedicionesService,
    private readonly velocidadesService: VelocidadesService,
  ) {}

  @EventPattern('sensor/mediciones')
  async handleMediciones(@Payload() data: any) {
    console.log('MQTT: medición recibida', data);
    await this.medicionesService.create(data);
  }

  @EventPattern('ventilador/velocidad')
  async handleVelocidad(@Payload() data: any) {
    console.log('MQTT: velocidad recibida', data);
    await this.velocidadesService.create(data);
  }
}
