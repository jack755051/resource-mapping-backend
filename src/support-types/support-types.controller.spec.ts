import { Test, TestingModule } from '@nestjs/testing';
import { SupportTypesController } from './support-types.controller';
import { SupportTypesService } from './support-types.service';

describe('SupportTypesController', () => {
  let controller: SupportTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupportTypesController],
      providers: [SupportTypesService],
    }).compile();

    controller = module.get<SupportTypesController>(SupportTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
