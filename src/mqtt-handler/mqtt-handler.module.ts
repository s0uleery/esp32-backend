import { Module } from '@nestjs/common';
import { MqttHandlerController } from './mqtt-handler.controller';
import { MqttHandlerGateway } from './mqtt-handler.gateway';

import { MedicionesModule } from '../mediciones/mediciones.module';
import { VelocidadesModule } from '../velocidades/velocidades.module';
import { MqttHandlerService } from './mqtt-handler.service';
import { TiempoUsoModule } from 'src/tiempo-uso/tiempo-uso.module';
import { MedicionesService } from 'src/mediciones/mediciones.service';
import { EnergiaService } from 'src/energia/energia.service';

@Module({
  providers: [
    MqttHandlerGateway,
    MqttHandlerService,
    MedicionesService,
    EnergiaService,
  ],
  imports: [MedicionesModule, VelocidadesModule, TiempoUsoModule],
  controllers: [MqttHandlerController],
  exports: [MqttHandlerService],
})
export class MqttHandlerModule {}
