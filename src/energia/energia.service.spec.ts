import { Test, TestingModule } from '@nestjs/testing';
import { EnergiaService } from './energia.service';

describe('EnergiaService', () => {
  let service: EnergiaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnergiaService],
    }).compile();

    service = module.get<EnergiaService>(EnergiaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
