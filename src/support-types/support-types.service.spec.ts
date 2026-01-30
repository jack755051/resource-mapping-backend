import { Test, TestingModule } from '@nestjs/testing';
import { SupportTypesService } from './support-types.service';

describe('SupportTypesService', () => {
  let service: SupportTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupportTypesService],
    }).compile();

    service = module.get<SupportTypesService>(SupportTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
