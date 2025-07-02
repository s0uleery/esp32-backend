// src/mqtt-handler/mqtt-handler.module.ts
import { Module } from '@nestjs/common';
import { MqttHandlerController } from './mqtt-handler.controller';
import { MqttHandlerGateway } from './mqtt-handler.gateway';

import { MedicionesModule } from '../mediciones/mediciones.module';
import { VelocidadesModule } from '../velocidades/velocidades.module';
import { MqttHandlerService } from './mqtt-handler.service';
import { TiempoUsoModule } from 'src/tiempo-uso/tiempo-uso.module';
import { EnergiaModule } from 'src/energia/energia.module';

@Module({
  providers: [MqttHandlerGateway, MqttHandlerService],
  imports: [
    MedicionesModule,
    VelocidadesModule,
    TiempoUsoModule,
    EnergiaModule,
  ],
  controllers: [MqttHandlerController],
  exports: [MqttHandlerService],
})
export class MqttHandlerModule {}
