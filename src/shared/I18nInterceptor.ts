import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class I18nInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();

        // 進階處理：處理 zh-TW, en-US 這種帶有區域碼的 Header
        let lang = request.headers['accept-language'] || 'zh';
        if (lang.includes('zh')) lang = 'zh';
        if (lang.includes('en')) lang = 'en';

        return next.handle().pipe(
            map(data => this.translate(data, lang))
        );
    }

    private translate(data: any, lang: string) {
        if (!data || typeof data !== 'object') return data;

        if (Array.isArray(data)) {
            return data.map(item => this.translate(item, lang));
        }

        const result: any = {};
        for (const key of Object.keys(data)) {
            const value = data[key];

            // 判斷是否為多語系物件結構 (核心邏輯)
            if (this.isI18nObject(value)) {
                // 優先取指定語言 -> 沒拿到就拿英文 -> 再沒拿到就拿中文 -> 最後拿空字串
                result[key] = value[lang] || value['en'] || value['zh'] || '';
            } else {
                result[key] = this.translate(value, lang);
            }
        }
        return result;
    }

    // 封裝判斷邏輯，增加嚴謹度
    private isI18nObject(value: any): boolean {
        return (
            value &&
            typeof value === 'object' &&
            !Array.isArray(value) &&
            ('zh' in value || 'en' in value) // 只要包含其中一個語系就視為 i18n 物件
        );
    }
}