import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TiempoUso } from './entities/tiempo-uso.entity';

@Injectable()
export class TiempoUsoService {
  constructor(
    @InjectRepository(TiempoUso)
    private repo: Repository<TiempoUso>,
  ) {}

  create(data: Partial<TiempoUso>) {
    const registro = this.repo.create(data);
    return this.repo.save(registro);
  }

  findAll() {
    return this.repo.find({ order: { inicio: 'DESC' } });
  }
}
