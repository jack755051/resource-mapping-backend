import { Module } from '@nestjs/common';
import { LocationCategoriesService } from './location-categories.service';
import { LocationCategoriesController } from './location-categories.controller';

@Module({
  controllers: [LocationCategoriesController],
  providers: [LocationCategoriesService],
})
export class LocationCategoriesModule {}
