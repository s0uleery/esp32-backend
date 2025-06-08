import { Test, TestingModule } from '@nestjs/testing';
import { EnergiaController } from './energia.controller';

describe('EnergiaController', () => {
  let controller: EnergiaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnergiaController],
    }).compile();

    controller = module.get<EnergiaController>(EnergiaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
