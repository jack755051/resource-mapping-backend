import { Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";

// 定義通用的多國語系結構
class I18nContentDto {
    @IsString()
    @IsNotEmpty()
    zh: string;

    @IsString()
    @IsNotEmpty()
    en: string;
}

export class CreateHistoryDto {
    @IsString()
    @IsNotEmpty()
    year: string; // 儲存 "2004" 或 "Future"

    @IsObject()
    @ValidateNested()
    @Type(() => I18nContentDto)
    @IsNotEmpty()
    label: I18nContentDto; // 例如：Foundation

    @IsObject()
    @ValidateNested()
    @Type(() => I18nContentDto)
    @IsNotEmpty()
    title: I18nContentDto; // 例如：專注製造

    @IsObject()
    @ValidateNested()
    @Type(() => I18nContentDto)
    @IsNotEmpty()
    description: I18nContentDto; // 詳細描述

    @IsBoolean()
    @IsOptional()
    isActive?: boolean = false;

    @IsNumber()
    @IsOptional()
    sort?: number = 0;
}