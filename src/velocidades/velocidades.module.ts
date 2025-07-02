import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VelocidadesService } from './velocidades.service';
import { VelocidadesController } from './velocidades.controller';
import { Velocidad } from './entities/velocidad.entity';
import { MqttHandlerModule } from 'src/mqtt-handler/mqtt-handler.module'; // Importa el módulo de MQTT

@Module({
  imports: [
    TypeOrmModule.forFeature([Velocidad]),
    forwardRef(() => MqttHandlerModule), // Usamos forwardRef para evitar dependencia circular
  ],
  controllers: [VelocidadesController],
  providers: [VelocidadesService],
  exports: [VelocidadesService],
})
export class VelocidadesModule {}
