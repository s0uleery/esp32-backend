import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Medicion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @Column('float')
  temperatura: number;

  @Column('float')
  humedad: number;

  @Column('float')
  gas_analogico: number;

  @Column('boolean')
  gas_digital: boolean;
}
