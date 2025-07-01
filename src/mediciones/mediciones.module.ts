// src/mediciones/mediciones.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicionesService } from './mediciones.service';
import { MedicionesController } from './mediciones.controller'; // Asegúrate de que el controlador esté exportado correctamente
import { Medicion } from './entities/medicion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Medicion])], // Registra el repositorio aquí
  providers: [MedicionesService],
  controllers: [MedicionesController],
  exports: [MedicionesService], // Exporta el servicio para usarlo en otros módulos
})
export class MedicionesModule {}
