// src/tiempo-uso/tiempo-uso.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiempoUso } from './entities/tiempo-uso.entity';
import { TiempoUsoService } from './tiempo-uso.service';
import { TiempoUsoController } from './tiempo-uso.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TiempoUso])],
  providers: [TiempoUsoService],
  controllers: [TiempoUsoController],
  exports: [TiempoUsoService], // Asegúrate de exportar el servicio
})
export class TiempoUsoModule {}
