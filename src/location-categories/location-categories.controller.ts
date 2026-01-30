import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LocationCategoriesService } from './location-categories.service';
import { CreateLocationCategoryDto } from './dto/create-location-category.dto';
import { UpdateLocationCategoryDto } from './dto/update-location-category.dto';

@Controller('location-categories')
export class LocationCategoriesController {
  constructor(private readonly locationCategoriesService: LocationCategoriesService) {}

  @Post()
  create(@Body() createLocationCategoryDto: CreateLocationCategoryDto) {
    return this.locationCategoriesService.create(createLocationCategoryDto);
  }

  @Get()
  findAll() {
    return this.locationCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locationCategoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLocationCategoryDto: UpdateLocationCategoryDto) {
    return this.locationCategoriesService.update(+id, updateLocationCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locationCategoriesService.remove(+id);
  }
}
