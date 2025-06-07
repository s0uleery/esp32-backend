import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiempoUsoService } from './tiempo-uso.service';
import { TiempoUsoController } from './tiempo-uso.controller';
import { TiempoUso } from './entities/tiempo-uso.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TiempoUso])],
  controllers: [TiempoUsoController],
  providers: [TiempoUsoService],
})
export class TiempoUsoModule {}
