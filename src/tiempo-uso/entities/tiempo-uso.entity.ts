import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class TiempoUso {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  inicio: Date;

  @Column({ type: 'timestamp' })
  fin: Date;

  @Column('int')
  duracion_seg: number;

  @Column('int')
  velocidad_prom: number;
}
