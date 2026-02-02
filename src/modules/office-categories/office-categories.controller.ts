import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { OfficeCategoriesService } from './office-categories.service';
import { CreateOfficeCategoryDto } from './dto/create-office-category.dto';
import { UpdateOfficeCategoryDto } from './dto/update-office-category.dto';

@Controller('constants/office-categories')
export class OfficeCategoriesController {
  constructor(private readonly officeCategoriesService: OfficeCategoriesService) { }

  @Post()
  create(@Body() createOfficeCategoryDto: CreateOfficeCategoryDto) {
    return this.officeCategoriesService.create(createOfficeCategoryDto);
  }

  @Get()
  findAll() {
    return this.officeCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.officeCategoriesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateOfficeCategoryDto: UpdateOfficeCategoryDto) {
    return this.officeCategoriesService.update(id, updateOfficeCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.officeCategoriesService.remove(id);
  }
}
