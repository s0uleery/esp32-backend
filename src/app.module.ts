import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicionesModule } from './mediciones/mediciones.module';
import { VelocidadesModule } from './velocidades/velocidades.module';
import { TiempoUsoModule } from './tiempo-uso/tiempo-uso.module';
import { EnergiaModule } from './energia/energia.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'tu_clave',
      database: 'esp32db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    MedicionesModule,
    VelocidadesModule,
    TiempoUsoModule,
    EnergiaModule,
  ],
})
export class AppModule {}
