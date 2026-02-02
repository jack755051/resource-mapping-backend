import { Test, TestingModule } from '@nestjs/testing';
import { OfficeTypesController } from './office-types.controller';
import { OfficeTypesService } from './office-types.service';

describe('OfficeTypesController', () => {
  let controller: OfficeTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OfficeTypesController],
      providers: [OfficeTypesService],
    }).compile();

    controller = module.get<OfficeTypesController>(OfficeTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
