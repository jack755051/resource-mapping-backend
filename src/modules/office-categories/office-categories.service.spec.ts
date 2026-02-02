import { Test, TestingModule } from '@nestjs/testing';
import { OfficeTypesService } from './office-types.service';

describe('OfficeTypesService', () => {
  let service: OfficeTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OfficeTypesService],
    }).compile();

    service = module.get<OfficeTypesService>(OfficeTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
