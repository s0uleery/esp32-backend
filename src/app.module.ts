import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicionesModule } from './mediciones/mediciones.module';
import { VelocidadesModule } from './velocidades/velocidades.module';
import { TiempoUsoModule } from './tiempo-uso/tiempo-uso.module';
import { EnergiaModule } from './energia/energia.module';
import { MqttHandlerModule } from './mqtt-handler/mqtt-handler.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'eery',
      database: 'esp32db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    MedicionesModule,
    VelocidadesModule,
    TiempoUsoModule,
    EnergiaModule,
    MqttHandlerModule,
  ],
})
export class AppModule {}
