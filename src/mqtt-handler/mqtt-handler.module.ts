import { Module } from '@nestjs/common';
import { MqttHandlerController } from './mqtt-handler.controller';

import { MedicionesModule } from '../mediciones/mediciones.module';
import { VelocidadesModule } from '../velocidades/velocidades.module';

@Module({
  imports: [MedicionesModule, VelocidadesModule],
  controllers: [MqttHandlerController],
})
export class MqttHandlerModule {}
