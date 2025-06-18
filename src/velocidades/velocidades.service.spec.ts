import { Test, TestingModule } from '@nestjs/testing';
import { VelocidadesService } from './velocidades.service';

describe('VelocidadesService', () => {
  let service: VelocidadesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VelocidadesService],
    }).compile();

    service = module.get<VelocidadesService>(VelocidadesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
