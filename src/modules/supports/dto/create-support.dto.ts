import { Type, Transform } from "class-transformer";
import { IsEnum, IsInt, IsNotEmpty, IsObject, IsString, IsUUID } from "class-validator";
import { ResourceType } from "../entities/support.entity";

class I18nNameDto {
    @IsString()
    @IsNotEmpty()
    zh: string;

    @IsString()
    @IsNotEmpty()
    en: string;
}

export class CreateSupportDto {
    @IsObject()
    @Type(() => I18nNameDto)
    @IsNotEmpty()
    title: I18nNameDto;

    @IsUUID()
    @IsNotEmpty()
    categoryId: string;

    @IsEnum(ResourceType)
    @IsNotEmpty()
    type: ResourceType;

    @IsInt()
    @Transform(({ value }) => parseInt(value))
    @IsNotEmpty()
    size: number;

    @IsString()
    @IsNotEmpty()
    fileUrl: string;
}
