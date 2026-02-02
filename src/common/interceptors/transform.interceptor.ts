// src/common/interceptors/transform.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();
    const statusCode = response.statusCode;

    return next.handle().pipe(
      map((data) => {
        // 判斷是否包含分頁或數量資訊
        const isArrayResponse = Array.isArray(data);
        const hasCount = data && typeof data.total !== 'undefined';

        return {
          success: true,
          code: statusCode,
          message: 'Success',
          // 如果 data 本身就是包含數據與數量的物件，則展開它
          ...(hasCount ? data : { data }),
        };
      }),
    );
  }
}
