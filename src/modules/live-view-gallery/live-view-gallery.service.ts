import { Injectable } from '@nestjs/common';
import { CreateLiveViewGalleryDto } from './dto/create-live-view-gallery.dto';
import { UpdateLiveViewGalleryDto } from './dto/update-live-view-gallery.dto';

@Injectable()
export class LiveViewGalleryService {
  create(createLiveViewGalleryDto: CreateLiveViewGalleryDto) {
    return 'This action adds a new liveViewGallery';
  }

  findAll() {
    return `This action returns all liveViewGallery`;
  }

  findOne(id: number) {
    return `This action returns a #${id} liveViewGallery`;
  }

  update(id: number, updateLiveViewGalleryDto: UpdateLiveViewGalleryDto) {
    return `This action updates a #${id} liveViewGallery`;
  }

  remove(id: number) {
    return `This action removes a #${id} liveViewGallery`;
  }
}
