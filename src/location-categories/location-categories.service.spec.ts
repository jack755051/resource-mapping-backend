import { Test, TestingModule } from '@nestjs/testing';
import { LocationCategoriesService } from './location-categories.service';

describe('LocationCategoriesService', () => {
  let service: LocationCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocationCategoriesService],
    }).compile();

    service = module.get<LocationCategoriesService>(LocationCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
