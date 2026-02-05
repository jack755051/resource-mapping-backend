// src/common/interceptors/transform.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();
    const statusCode = response.statusCode;

    return next.handle().pipe(
      map((data) => {
        // 1. 處理 null 或 undefined 的情況，避免後續 instanceToPlain 報錯
        if (data === null || data === undefined) {
          return {
            success: true,
            code: statusCode,
            message: 'Success',
            data: null,
          };
        }

        // 2. 序列化資料：解決 Date 變成 {} 的核心步驟
        // instanceToPlain 會尊重 Entity 裡的 @Exclude() 裝飾器（如果有加的話）
        const cleanData = instanceToPlain(data);

        // 3. 判斷是否為分頁回應 (Pagination)
        // 除了 total，通常還會檢查是否包含 items
        const isPaginated = cleanData && typeof cleanData.total !== 'undefined';

        return {
          success: true,
          code: statusCode,
          message: 'Success',
          // 如果是分頁，展開 cleanData (通常包含 items, meta 等)
          // 如果是一般資料，放入 data 欄位
          ...(isPaginated ? cleanData : { data: cleanData }),
        };
      }),
    );
  }
}
