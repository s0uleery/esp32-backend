import { IsDate, IsNumber, IsOptional } from 'class-validator';

export class CreateTiempoUsoDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsDate() // Asegúrate de que sea un tipo Date válido
  inicio: Date;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsOptional()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsDate() // Si es opcional, verificamos que también sea un tipo Date si está presente
  fin?: Date;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNumber()
  duracion_seg: number;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNumber()
  velocidad_prom: number;
}
