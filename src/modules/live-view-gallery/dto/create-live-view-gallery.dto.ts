import { IsString, IsNotEmpty, IsArray, IsOptional, IsBoolean, IsInt, Min } from 'class-validator';

export class CreateLiveViewGalleryDto {
  @IsString()
  @IsNotEmpty()
  mainImage: string;

  @IsArray()
  @IsString({ each: true })
  imageUrls: string[];

  @IsString()
  @IsNotEmpty()
  title: string; // Translation key, e.g., 'liveView.footage.1.title'

  @IsString()
  @IsNotEmpty()
  subtitle: string; // Translation key, e.g., 'liveView.footage.1.meta'

  @IsString()
  @IsNotEmpty()
  tag: string; // Translation key, e.g., 'liveView.footage.1.tag'

  @IsInt()
  @Min(0)
  @IsOptional()
  sort?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
