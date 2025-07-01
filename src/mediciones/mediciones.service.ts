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

  async create(data: Partial<Medicion>) {
    const nueva = this.repo.create(data);
    return this.repo.save(nueva);
  }

  async findAll() {
    return this.repo.find({ order: { timestamp: 'DESC' } });
  }
}
