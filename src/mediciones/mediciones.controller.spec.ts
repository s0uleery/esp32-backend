import { Test, TestingModule } from '@nestjs/testing';
import { MedicionesController } from './mediciones.controller';

describe('MedicionesController', () => {
  let controller: MedicionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicionesController],
    }).compile();

    controller = module.get<MedicionesController>(MedicionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
