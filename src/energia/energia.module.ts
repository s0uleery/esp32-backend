import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnergiaService } from './energia.service';
import { EnergiaController } from './energia.controller';
import { Energia } from './entities/energia.entity';
import { TiempoUso } from '../tiempo-uso/entities/tiempo-uso.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Energia, TiempoUso])],
  controllers: [EnergiaController],
  providers: [EnergiaService],
  exports: [EnergiaService],
})
export class EnergiaModule {}
