import { Test, TestingModule } from '@nestjs/testing';
import { LocationCategoriesController } from './location-categories.controller';
import { LocationCategoriesService } from './location-categories.service';

describe('LocationCategoriesController', () => {
  let controller: LocationCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationCategoriesController],
      providers: [LocationCategoriesService],
    }).compile();

    controller = module.get<LocationCategoriesController>(LocationCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
