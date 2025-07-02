// src/mediciones/entities/medicion.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Medicion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  temperatura: number;

  @Column({ nullable: true })
  humedad: number;

  @Column({ nullable: true })
  gas_analogico: number;

  @Column({ type: 'boolean', nullable: true }) // Cambiado a boolean
  gas_digital: boolean; // Campo de gas digital como booleano

  @Column()
  timestamp: Date;
}
