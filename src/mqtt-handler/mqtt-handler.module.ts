import { Module } from '@nestjs/common';
import { MqttHandlerController } from './mqtt-handler.controller';
import { MqttHandlerGateway } from './mqtt-handler.gateway';

import { MedicionesModule } from '../mediciones/mediciones.module';
import { VelocidadesModule } from '../velocidades/velocidades.module';
import { MqttHandlerService } from './mqtt-handler.service';

@Module({
  providers: [MqttHandlerGateway, MqttHandlerService],
  imports: [MedicionesModule, VelocidadesModule],
  controllers: [MqttHandlerController],
  exports: [MqttHandlerService],
})
export class MqttHandlerModule {}
