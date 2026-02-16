import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe
} from '@nestjs/common';
import { LiveViewGalleryService } from './live-view-gallery.service';
import { CreateLiveViewGalleryDto } from './dto/create-live-view-gallery.dto';
import { UpdateLiveViewGalleryDto } from './dto/update-live-view-gallery.dto';

@Controller('live-view')
export class LiveViewGalleryController {
  constructor(private readonly liveViewGalleryService: LiveViewGalleryService) {}

  /**
   * POST /api/v1/live-view/galleries
   * 創建新的畫廊項目
   */
  @Post('galleries')
  create(@Body() createDto: CreateLiveViewGalleryDto) {
    return this.liveViewGalleryService.create(createDto);
  }

  /**
   * GET /api/v1/live-view/gallery
   * 查詢所有畫廊項目（不分頁，僅返回啟用的項目）- 前端使用的路徑
   */
  @Get('gallery')
  findAll() {
    return this.liveViewGalleryService.findAll();
  }

  /**
   * GET /api/v1/live-view/galleries/:id
   * 查詢單個畫廊項目
   */
  @Get('galleries/:id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.liveViewGalleryService.findOne(id);
  }

  /**
   * PATCH /api/v1/live-view/galleries/:id
   * 更新畫廊項目
   */
  @Patch('galleries/:id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateDto: UpdateLiveViewGalleryDto,
  ) {
    return this.liveViewGalleryService.update(id, updateDto);
  }

  /**
   * DELETE /api/v1/live-view/galleries/:id
   * 刪除畫廊項目
   */
  @Delete('galleries/:id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.liveViewGalleryService.remove(id);
  }
}
