import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TiempoUso } from './entities/tiempo-uso.entity';
import { CreateTiempoUsoDto } from './dto/create-tiempo-uso.dto'; // 👈 importa el DTO

@Injectable()
export class TiempoUsoService {
  constructor(
    @InjectRepository(TiempoUso)
    private repo: Repository<TiempoUso>,
  ) {}

  async create(dto: CreateTiempoUsoDto) {
    const nuevo = this.repo.create(dto);
    return this.repo.save(nuevo);
  }

  findAll() {
    return this.repo.find({ order: { inicio: 'DESC' } });
  }
}
