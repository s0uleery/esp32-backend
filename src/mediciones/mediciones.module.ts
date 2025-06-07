import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicionesService } from './mediciones.service';
import { MedicionesController } from './mediciones.controller';
import { Medicion } from './entities/medicion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Medicion])],
  controllers: [MedicionesController],
  providers: [MedicionesService],
})
export class MedicionesModule {}
