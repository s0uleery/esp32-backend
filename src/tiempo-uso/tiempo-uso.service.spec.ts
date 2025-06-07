import { Test, TestingModule } from '@nestjs/testing';
import { TiempoUsoService } from './tiempo-uso.service';

describe('TiempoUsoService', () => {
  let service: TiempoUsoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TiempoUsoService],
    }).compile();

    service = module.get<TiempoUsoService>(TiempoUsoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
