// src/modules/products/dto/i18n.dto.ts
import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class I18nTextDto {
  @IsString()
  @IsNotEmpty()
  zh: string;

  @IsString()
  @IsNotEmpty()
  en: string;
}

export class I18nArrayDto {
  @IsArray()
  @IsString({ each: true })
  zh: string[];

  @IsArray()
  @IsString({ each: true })
  en: string[];
}
