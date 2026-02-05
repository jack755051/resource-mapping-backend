// src/modules/products/dto/create-product.dto.ts
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsUUID,
  ValidateNested,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';
import { I18nTextDto, I18nArrayDto } from './i18n.dto';

// 💡 規格與下載內容的翻譯結構
class ProductSpecItemDto {
  @ValidateNested()
  @Type(() => I18nTextDto)
  label: I18nTextDto;

  @IsString()
  value: string;

  @IsString()
  type: string;
}

class ProductDownloadDto {
  @IsString()
  id: string;

  @ValidateNested()
  @Type(() => I18nTextDto)
  title: I18nTextDto;

  @IsString()
  type: string;

  @IsNotEmpty()
  size: number;

  @IsString()
  url: string;
}

export class CreateProductDto {
  @ValidateNested()
  @Type(() => I18nTextDto)
  title: I18nTextDto;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsString()
  image: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => I18nTextDto)
  tag?: I18nTextDto;

  @IsArray()
  @IsOptional()
  tags?: string[]; // SEO 標籤維持 string array

  @ValidateNested()
  @Type(() => I18nTextDto)
  description: I18nTextDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => I18nArrayDto)
  features?: I18nArrayDto;

  @IsArray()
  @IsOptional()
  images?: string[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ProductSpecItemDto)
  specs?: ProductSpecItemDto[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ProductDownloadDto)
  downloads?: ProductDownloadDto[];
}
