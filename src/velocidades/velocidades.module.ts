import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VelocidadesService } from './velocidades.service';
import { VelocidadesController } from './velocidades.controller';
import { Velocidad } from './entities/velocidad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Velocidad])],
  controllers: [VelocidadesController],
  providers: [VelocidadesService],
  exports: [VelocidadesService],
})
export class VelocidadesModule {}
