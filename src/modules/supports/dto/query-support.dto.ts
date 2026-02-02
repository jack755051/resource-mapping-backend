import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class QuerySupportDto {
  @IsOptional()
  @IsString()
  keyword?: string; // 搜尋標題

  @IsOptional()
  @IsString()
  categoryId?: string; // 過濾類別 (UUID)

  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit: number = 5;
}
