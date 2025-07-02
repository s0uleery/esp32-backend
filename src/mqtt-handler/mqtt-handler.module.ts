import { Module, forwardRef } from '@nestjs/common';
import { MqttHandlerController } from './mqtt-handler.controller';
import { MqttHandlerGateway } from './mqtt-handler.gateway';

import { MedicionesModule } from '../mediciones/mediciones.module';
import { VelocidadesModule } from '../velocidades/velocidades.module'; // Asegúrate de que este módulo esté bien importado
import { MqttHandlerService } from './mqtt-handler.service';
import { TiempoUsoModule } from 'src/tiempo-uso/tiempo-uso.module';
import { EnergiaModule } from 'src/energia/energia.module';

@Module({
  providers: [MqttHandlerGateway, MqttHandlerService],
  imports: [
    MedicionesModule,
    forwardRef(() => VelocidadesModule), // Usamos forwardRef en caso de dependencia circular
    TiempoUsoModule,
    EnergiaModule,
  ],
  controllers: [MqttHandlerController],
  exports: [MqttHandlerService, MqttHandlerGateway],
})
export class MqttHandlerModule {}
