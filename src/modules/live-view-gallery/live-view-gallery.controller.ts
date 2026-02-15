import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LiveViewGalleryService } from './live-view-gallery.service';
import { CreateLiveViewGalleryDto } from './dto/create-live-view-gallery.dto';
import { UpdateLiveViewGalleryDto } from './dto/update-live-view-gallery.dto';

@Controller('live-view-gallery')
export class LiveViewGalleryController {
  constructor(private readonly liveViewGalleryService: LiveViewGalleryService) {}

  @Post()
  create(@Body() createLiveViewGalleryDto: CreateLiveViewGalleryDto) {
    return this.liveViewGalleryService.create(createLiveViewGalleryDto);
  }

  @Get()
  findAll() {
    return this.liveViewGalleryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.liveViewGalleryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLiveViewGalleryDto: UpdateLiveViewGalleryDto) {
    return this.liveViewGalleryService.update(+id, updateLiveViewGalleryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.liveViewGalleryService.remove(+id);
  }
}
