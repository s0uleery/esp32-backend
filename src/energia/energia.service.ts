import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Energia } from './entities/energia.entity';
import { Repository } from 'typeorm';
import { TiempoUso } from '../tiempo-uso/entities/tiempo-uso.entity';

@Injectable()
export class EnergiaService {
  constructor(
    @InjectRepository(Energia)
    private energiaRepo: Repository<Energia>,
    @InjectRepository(TiempoUso)
    private tiempoUsoRepo: Repository<TiempoUso>,
  ) {}

  async create(tiempoUsoId: number) {
    const uso = await this.tiempoUsoRepo.findOne({
      where: { id: tiempoUsoId },
    });
    if (!uso) throw new Error('Sesión no encontrada');

    const potencia = this.getPotenciaEstimacion(uso.velocidad_prom); // W
    const duracionHoras = uso.duracion_seg / 3600;
    const energia = parseFloat((duracionHoras * potencia).toFixed(2)); // Wh

    const nueva = this.energiaRepo.create({
      tiempo_uso: uso,
      energia_estimada: energia,
    });

    return this.energiaRepo.save(nueva);
  }

  getPotenciaEstimacion(velocidad: number): number {
    switch (velocidad) {
      case 1:
        return 15;
      case 2:
        return 30;
      case 3:
        return 45;
      default:
        return 0;
    }
  }

  findAll() {
    return this.energiaRepo.find({
      relations: ['tiempo_uso'],
      order: { id: 'DESC' },
    });
  }
}
