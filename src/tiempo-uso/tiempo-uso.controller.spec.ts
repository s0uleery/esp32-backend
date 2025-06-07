import { Test, TestingModule } from '@nestjs/testing';
import { TiempoUsoController } from './tiempo-uso.controller';

describe('TiempoUsoController', () => {
  let controller: TiempoUsoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TiempoUsoController],
    }).compile();

    controller = module.get<TiempoUsoController>(TiempoUsoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
