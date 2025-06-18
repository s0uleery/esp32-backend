import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Velocidad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @Column('int')
  velocidad: number; // 0 = apagado, 1, 2, 3

  @Column('boolean')
  estado: boolean; // true = encendido, false = apagado
}
