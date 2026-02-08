import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AnalyticsService } from '../analytics.service';
import { TRACK_METADATA_KEY, TrackOptions } from '../decorators/track-event.decorator';

@Injectable()
export class AnalyticsInterceptor implements NestInterceptor {
    constructor(
        private readonly analyticsService: AnalyticsService,
        private readonly reflector: Reflector,
    ) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();

        // 1. 嘗試從標籤 (Decorator) 取得設定
        const trackOptions = this.reflector.get<TrackOptions>(
            TRACK_METADATA_KEY,
            context.getHandler(),
        );

        return next.handle().pipe(
            tap(async () => {
                // 如果沒有 @TrackEvent 標籤，我們就略過自動紀錄，避免污染資料庫
                if (!trackOptions) return;

                const { method, url, headers, params } = request;

                try {
                    // 2. 準備分析數據
                    await this.analyticsService.createEvent({
                        type: trackOptions.type,
                        resourceType: trackOptions.resourceType,
                        resourceId: params.id || params.idOrSlug || trackOptions.resourceType, // 優先抓取 URL ID
                        sessionId: headers['x-session-id'], // 前端傳入
                        metadata: {
                            path: url,
                            method: method,
                            ip: headers['cf-connecting-ip'] || request.ip,
                            country: headers['cf-ipcountry'] || 'Unknown',
                            userAgent: headers['user-agent'],
                            referrer: headers['referer'],
                        }
                    });
                    console.log(`[Analytics] Tracked ${trackOptions.type} for ${url}`);
                } catch (error) {
                    console.error('[Analytics] Failed to track event:', error);
                }
            }),
        );
    }
}