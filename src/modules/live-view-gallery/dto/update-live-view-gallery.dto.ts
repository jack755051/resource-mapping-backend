import { PartialType } from '@nestjs/mapped-types';
import { CreateLiveViewGalleryDto } from './create-live-view-gallery.dto';

export class UpdateLiveViewGalleryDto extends PartialType(CreateLiveViewGalleryDto) {}
