import { Module } from '@nestjs/common';
import { LiveViewGalleryService } from './live-view-gallery.service';
import { LiveViewGalleryController } from './live-view-gallery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LiveViewGallery } from './entities/live-view-gallery.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LiveViewGallery])],
  controllers: [LiveViewGalleryController],
  providers: [LiveViewGalleryService],
})
export class LiveViewGalleryModule {}
