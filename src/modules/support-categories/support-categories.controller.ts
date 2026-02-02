import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { SupportCategoriesService } from './support-categories.service';
import { CreateSupportCategoryDto } from './dto/create-support-category.dto';
import { UpdateSupportCategoryDto } from './dto/update-support-category.dto';

@Controller('constants/support-categories')
export class SupportCategoriesController {
  constructor(private readonly supportCategoriesService: SupportCategoriesService) { }

  @Post()
  create(@Body() createSupportCategoryDto: CreateSupportCategoryDto) {
    return this.supportCategoriesService.create(createSupportCategoryDto);
  }

  @Get()
  findAll() {
    return this.supportCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.supportCategoriesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateSupportCategoryDto: UpdateSupportCategoryDto) {
    return this.supportCategoriesService.update(id, updateSupportCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.supportCategoriesService.remove(id);
  }
}
