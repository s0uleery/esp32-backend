// src/tiempo-uso/entities/tiempo-uso.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Energia } from '../../energia/entities/energia.entity';

@Entity()
export class TiempoUso {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  inicio: Date;

  @Column({ nullable: true })
  fin: Date;

  @Column()
  duracion_seg: number; // Duración en segundos

  @Column()
  velocidad_prom: number; // Velocidad promedio del ventilador (1, 2, 3)

  @OneToMany(() => Energia, (energia) => energia.tiempo_uso)
  energia: Energia[]; // Relación con Energia
}
