// src/modules/products/dto/query-product.dto.ts
import { IsOptional, IsString, IsUUID, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryProductDto {
    @IsOptional()
    @IsString()
    search?: string; // 搜尋標題或型號

    @IsOptional()
    @IsUUID()
    categoryId?: string; // 過濾特定分類

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit?: number = 10;
}
