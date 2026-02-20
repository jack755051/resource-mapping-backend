import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsInt,
  Min,
  IsUrl,
} from 'class-validator';

export class CreateLiveViewChannelDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsInt()
  @Min(0)
  @IsOptional()
  sort?: number;

  /**
   * 新增：串流網址
   * 支援 Tailscale IP 或內部 IP
   */
  @IsString() // 用 IsString 較彈性，因為有時會填內部 m3u8 路徑
  @IsOptional()
  streamUrl?: string;

  /**
   * 新增：供應商類型
   * 預設為 'webrtc'，也可以是 'youtube'
   */
  @IsString()
  @IsOptional()
  provider?: string = 'webrtc';

  @IsString()
  @IsOptional()
  youtubeChannelId?: string;

  @IsString()
  @IsOptional()
  youtubeVideoId?: string;
}
