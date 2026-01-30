import { IsString, IsNotEmpty, IsObject, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class I18nNameDto {
    @IsString()
    @IsNotEmpty()
    zh: string;

    @IsString()
    @IsNotEmpty()
    en: string;
}

export class CreateSupportTypeDto {
    @IsObject()
    @ValidateNested()
    @Type(() => I18nNameDto)
    name: I18nNameDto;

    @IsString()
    @IsNotEmpty()
    value: string;

    @IsNumber()
    @IsOptional()
    sort: number;
}