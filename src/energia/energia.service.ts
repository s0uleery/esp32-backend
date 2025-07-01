// src/energia/energia.service.ts
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

  // Crear un nuevo registro de energía basado en el tiempo de uso
  async create(tiempoUsoId: number) {
    const uso = await this.tiempoUsoRepo.findOne({
      where: { id: tiempoUsoId },
    });

    if (!uso) throw new Error('Sesión de tiempo de uso no encontrada');

    const potencia = this.getPotenciaEstimacion(uso.velocidad_prom); // W
    const duracionHoras = uso.duracion_seg / 3600; // Convertir duración de segundos a horas
    const energia = parseFloat((duracionHoras * potencia).toFixed(2)); // Energía estimada en kWh (Wh / 1000)

    const nueva = this.energiaRepo.create({
      tiempo_uso: uso,
      energia_estimada: energia,
    });

    return this.energiaRepo.save(nueva);
  }

  // Obtener la potencia estimada según la velocidad
  getPotenciaEstimacion(velocidad: number): number {
    switch (velocidad) {
      case 1:
        return 15; // Potencia para velocidad 1 en W
      case 2:
        return 30; // Potencia para velocidad 2 en W
      case 3:
        return 45; // Potencia para velocidad 3 en W
      default:
        return 0; // Si la velocidad no está definida, no consume energía
    }
  }
  //Obtener registro por su id
  async findOne(id: number) {
    return this.energiaRepo.findOne({
      where: { id },
      relations: ['tiempo_uso'],
    });
  }

  // Obtener todos los registros de energía
  async findAll() {
    return this.energiaRepo.find({
      relations: ['tiempo_uso'],
      order: { id: 'DESC' },
    });
  }
}
