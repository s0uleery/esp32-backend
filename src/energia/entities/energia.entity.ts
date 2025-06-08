import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TiempoUso } from '../../tiempo-uso/entities/tiempo-uso.entity';

@Entity()
export class Energia {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TiempoUso, { onDelete: 'CASCADE' })
  tiempo_uso: TiempoUso;

  @Column('float')
  energia_estimada: number; // En Wh
}
