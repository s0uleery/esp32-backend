// src/mediciones/mediciones.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medicion } from './entities/medicion.entity';

@Injectable()
export class MedicionesService {
  constructor(
    @InjectRepository(Medicion)
    private repo: Repository<Medicion>, // El repositorio se inyecta correctamente
  ) {}

  // Método para crear una nueva medición
  async create(data: Partial<Medicion>) {
    // Verificar que los datos sean válidos antes de guardarlos
    if (data.temperatura == null || data.humedad == null) {
      console.error('Temperatura o Humedad no válidos:', data);
      return null; // No guardamos la medición si algún dato importante es nulo
    }

    // Crear la nueva medición si los datos son válidos
    const nueva = this.repo.create(data);
    return this.repo.save(nueva);
  }

  // Método para obtener todas las mediciones
  async findAll() {
    return this.repo.find({ order: { timestamp: 'DESC' } });
  }
}
