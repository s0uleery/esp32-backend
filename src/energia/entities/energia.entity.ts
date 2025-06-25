// src/energia/entities/energia.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { TiempoUso } from '../../tiempo-uso/entities/tiempo-uso.entity';

@Entity()
export class Energia {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TiempoUso, (tiempoUso) => tiempoUso.energia)
  tiempo_uso: TiempoUso; // Relación con TiempoUso

  @Column('float')
  energia_estimada: number; // Energía estimada calculada
}
