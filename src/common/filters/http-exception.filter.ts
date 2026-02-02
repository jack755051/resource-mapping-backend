// src/common/filters/http-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  // 💡 這裡可以注入你現有的翻譯工具，或者簡單的對照表
  private readonly translations = {
    zh: {
      'error.contact.banned_words': '您的留言內容包含不當詞彙',
      'error.contact.urgent_phone_required': '緊急諮詢必須提供聯絡電話',
      'error.contact.cooperation_via_email': '合作諮詢請透過官方信箱聯繫',
      'error.contact.repair_phone_required': '維修諮詢必須提供聯絡電話',
      'error.contact.other': '其他諮詢請提供聯絡方式',
    },
    en: {
      'error.contact.banned_words':
        'Your message contains prohibited keywords.',
      'error.contact.urgent_phone_required':
        'Phone number is required for urgent requests.',
      'error.contact.cooperation_via_email':
        'For cooperation inquiries, please contact us via our official email.',
      'error.contact.repair_phone_required':
        'Phone number is required for repair requests.',
      'error.contact.other':
        'Please provide contact information for other types of inquiries.',
    },
  };

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    const exceptionResponse: any = exception.getResponse();

    // 💡 取得語系 (從 Header 'accept-language'，預設 zh)
    const lang = request.headers['accept-language']?.includes('en')
      ? 'en'
      : 'zh';

    // 取得原本的訊息 (可能是 Key)
    const messageKey =
      typeof exceptionResponse === 'object'
        ? exceptionResponse.message
        : exceptionResponse;

    // 💡 執行翻譯邏輯
    const translatedMessage = this.translations[lang][messageKey] || messageKey;

    response.status(status).json({
      success: false,
      statusCode: status,
      message: translatedMessage, // 丟給前端翻譯後的文字
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
