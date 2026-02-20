import { IsOptional, IsString } from 'class-validator';

export class QueryLiveViewChannelDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  provider?: string; // 方便過濾 'webrtc' 或 'youtube'
}
