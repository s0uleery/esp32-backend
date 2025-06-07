import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Velocidad } from './entities/velocidad.entity';

@Injectable()
export class VelocidadesService {
  constructor(
    @InjectRepository(Velocidad)
    private repo: Repository<Velocidad>,
  ) {}

  create(data: Partial<Velocidad>) {
    const nueva = this.repo.create(data);
    return this.repo.save(nueva);
  }

  findAll() {
    return this.repo.find({ order: { timestamp: 'DESC' } });
  }
}
