import { IsObject, IsNotEmpty, IsNumber, ValidateNested, IsString } from 'class-validator';
import { Type } from 'class-transformer';

// 複用我們之前定義的 I18n 結構
class I18nNameDto {
    @IsString()
    @IsNotEmpty()
    zh: string;

    @IsString()
    @IsNotEmpty()
    en: string;

    [key: string]: string;
}

export class CreateLocationDto {
    @IsObject()
    @ValidateNested()
    @Type(() => I18nNameDto)
    name: I18nNameDto;

    @IsNumber()
    @IsNotEmpty()
    sort: number;

    // 關鍵點：前端只需要傳入分類的 ID
    @IsObject()
    officeType: { id: number };
}