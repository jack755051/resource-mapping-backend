import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { SupportCategoriesService } from './support-categories.service';
import { CreateSupportCategoryDto } from './dto/create-support-category.dto';
import { UpdateSupportCategoryDto } from './dto/update-support-category.dto';
import { SkipI18n } from 'src/shared/skip-i18n.decorator';

@Controller('constants/support-categories')
export class SupportCategoriesController {
  constructor(private readonly supportCategoriesService: SupportCategoriesService) { }

  @Post()
  create(@Body() createSupportCategoryDto: CreateSupportCategoryDto) {
    return this.supportCategoriesService.create(createSupportCategoryDto);
  }

  /**
   * 獲取所有 Support 分類
   *
   * ⚠️ 使用 @SkipI18n() 裝飾器
   * 原因：這是系統參數 API，前端需要完整的多語系物件 { zh, en }
   * 前端會根據當前語系動態切換顯示，無需後端轉換成單一語言
   */
  @Get()
  @SkipI18n()
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
