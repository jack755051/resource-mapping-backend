import { IsString, IsNotEmpty, IsOptional, IsArray, IsUUID, IsObject } from 'class-validator';
import { ProductSpecItem, ProductDownload } from '../entities/product.entity';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    slug: string; // 💡 建議前端傳入前先處理成小寫+連字號

    @IsUUID()
    @IsNotEmpty()
    categoryId: string; // 💡 這是關鍵，用來連結那 7 筆既有的分類

    @IsString()
    @IsNotEmpty()
    model: string;

    @IsString()
    image: string;

    @IsString()
    @IsOptional()
    tag?: string;

    @IsArray()
    @IsOptional()
    tags?: string[];

    @IsString()
    description: string;

    @IsArray()
    @IsOptional()
    features?: string[];

    @IsArray()
    @IsOptional()
    images?: string[];

    @IsArray()
    @IsOptional()
    specs?: ProductSpecItem[]; // 💡 jsonb 欄位

    @IsArray()
    @IsOptional()
    downloads?: ProductDownload[]; // 💡 jsonb 欄位
}