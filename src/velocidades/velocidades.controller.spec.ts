import { Test, TestingModule } from '@nestjs/testing';
import { VelocidadesController } from './velocidades.controller';

describe('VelocidadesController', () => {
  let controller: VelocidadesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VelocidadesController],
    }).compile();

    controller = module.get<VelocidadesController>(VelocidadesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
