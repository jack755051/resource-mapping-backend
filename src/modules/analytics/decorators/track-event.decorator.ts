import { SetMetadata } from '@nestjs/common';

export const TRACK_METADATA_KEY = 'track_event';

export interface TrackOptions {
    type: string;
    resourceType?: string;
}

// 用於 Controller 方法上，標記該 API 需要被紀錄
export const TrackEvent = (options: TrackOptions) => SetMetadata(TRACK_METADATA_KEY, options);