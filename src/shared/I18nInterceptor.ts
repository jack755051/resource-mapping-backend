// src/shared/I18nInterceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SKIP_I18N_KEY } from './skip-i18n.decorator';

@Injectable()
export class I18nInterceptor implements NestInterceptor {
    // 💡 注入 Reflector 以讀取裝飾器設定的 Metadata
    constructor(private readonly reflector: Reflector) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        // 💡 檢查當前 Handler (方法) 或 Class (控制器) 是否標註了 @SkipI18n()
        const isSkipped = this.reflector.getAllAndOverride<boolean>(SKIP_I18N_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isSkipped) {
            return next.handle();
        }

        const request = context.switchToHttp().getRequest();
        let lang = request.headers['accept-language'] || 'zh';
        if (lang.includes('zh')) lang = 'zh';
        if (lang.includes('en')) lang = 'en';

        return next.handle().pipe(
            map(data => this.translate(data, lang))
        );
    }

    private translate(data: any, lang: string) {
        if (!data || typeof data !== 'object') return data;

        // 處理陣列 (例如 findAll 的結果)
        if (Array.isArray(data)) {
            return data.map(item => this.translate(item, lang));
        }

        const result: any = {};
        for (const key of Object.keys(data)) {
            const value = data[key];

            if (this.isI18nObject(value)) {
                // 優先序：當前語系 -> 英文 -> 中文 -> 沒內容則回傳 null 或空字串
                result[key] = value[lang] || value['en'] || value['zh'] || null;
            } else if (value && typeof value === 'object') {
                // 遞迴處理深層物件 (例如關聯的 OfficeType)
                result[key] = this.translate(value, lang);
            } else {
                result[key] = value;
            }
        }
        return result;
    }

    private isI18nObject(value: any): boolean {
        return (
            value &&
            typeof value === 'object' &&
            !Array.isArray(value) &&
            // 只要具備 zh 或 en 欄位，就視為需要翻譯的對象
            ('zh' in value || 'en' in value)
        );
    }
}