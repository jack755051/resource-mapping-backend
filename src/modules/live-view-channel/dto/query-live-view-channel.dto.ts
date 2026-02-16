import { IsOptional, IsString } from 'class-validator';

export class QueryLiveViewChannelDto {
  @IsOptional()
  @IsString()
  search?: string; // 搜尋頻道名稱或描述
}
