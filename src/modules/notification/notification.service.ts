// src/modules/notification/notification.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ContactForm } from '../contact-form/entities/contact-form.entity';
import { InquiryIntent } from '../contact-form/constants/contact-form.constants';
import sgMail from '@sendgrid/mail';

@Injectable()
export class NotificationService {
    constructor(private readonly configService: ConfigService) {
        const apiKey = this.configService.getOrThrow<string>('MAIL_APP_PASS');
        sgMail.setApiKey(apiKey);
    }

    async sendContactNotification(form: ContactForm, intent: InquiryIntent) {
        const adminEmail = this.configService.getOrThrow<string>('ADMIN_RECEIVER_EMAIL');
        const fromEmail = this.configService.getOrThrow<string>('MAIL_FROM');

        // 定義標籤顏色與文字
        const intentConfig = {
            [InquiryIntent.REPAIR]: { label: '緊急維修', color: '#ef4444' }, // 紅色
            [InquiryIntent.COOPERATION]: { label: '商務合作', color: '#3b82f6' }, // 藍色
            [InquiryIntent.CONSULT]: { label: '產品諮詢', color: '#10b981' }, // 綠色
            [InquiryIntent.INQUIRY]: { label: '一般詢問', color: '#f59e0b' }, // 橘色
            [InquiryIntent.OTHER]: { label: '其他訊息', color: '#6366f1' }, // 紫色
        };

        const config = intentConfig[intent] || { label: '新諮詢', color: '#64748b' };
        const subject = `[${config.label}] 來自 ${form.name} 的系統通知`;

        // 產生科技感 HTML
        const htmlContent = this.getTechEmailTemplate(form, config);

        const msg = {
            to: adminEmail,
            from: fromEmail,
            subject: subject,
            html: htmlContent,
        };

        try {
            await sgMail.send(msg);
            console.log('✅ SendGrid API 發信成功');
            return true;
        } catch (error) {
            console.error('❌ SendGrid API 發信失敗:', error.response?.body || error.message);
            return false;
        }
    }

    /**
     * 產生具有科技設計感的 Email HTML
     */
    private getTechEmailTemplate(form: ContactForm, config: { label: string; color: string }): string {
        // 這裡可以使用你公司的 Logo 連結
        const logoUrl = 'https://cdn-icons-png.flaticon.com/512/2331/2331966.png'; // 範例科技 Icon
        const now = new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' });

        return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          /* Email Client Reset */
          body { margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f1f5f9; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          .header { background-color: #0f172a; padding: 24px; text-align: center; border-bottom: 4px solid ${config.color}; }
          .logo { width: 48px; height: 48px; margin-bottom: 10px; }
          .header-title { color: #ffffff; margin: 0; font-size: 20px; font-weight: 600; letter-spacing: 1px; }
          .content { padding: 32px 24px; }
          .tag { display: inline-block; background-color: ${config.color}15; color: ${config.color}; padding: 6px 12px; border-radius: 4px; font-size: 12px; font-weight: bold; border: 1px solid ${config.color}; margin-bottom: 20px; }
          .data-group { margin-bottom: 24px; }
          .label { display: block; font-size: 12px; color: #64748b; text-transform: uppercase; margin-bottom: 6px; letter-spacing: 0.5px; font-weight: 600; }
          .value { display: block; font-size: 16px; color: #334155; font-weight: 500; background: #f8fafc; padding: 12px; border-radius: 6px; border-left: 3px solid #cbd5e1; }
          .message-box { background-color: #f8fafc; border: 1px dashed #cbd5e1; padding: 20px; border-radius: 6px; color: #334155; line-height: 1.6; white-space: pre-wrap; }
          .footer { background-color: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
          .btn-link { display: inline-block; margin-top: 10px; color: ${config.color}; text-decoration: none; font-weight: bold; }
        </style>
      </head>
      <body>
        <div style="padding: 40px 0;">
          <div class="container">
            <div class="header">
              <img src="${logoUrl}" alt="Logo" class="logo">
              <h1 class="header-title">SYSTEM NOTIFICATION</h1>
            </div>

            <div class="content">
              <div class="tag">TYPE: ${config.label}</div>

              <div class="data-group">
                <span class="label">CLIENT NAME / 客戶姓名</span>
                <span class="value">${form.name}</span>
              </div>

              <div class="data-group">
                <span class="label">CONTACT EMAIL / 聯絡信箱</span>
                <span class="value">
                  <a href="mailto:${form.email}" style="color: #334155; text-decoration: none;">${form.email}</a>
                </span>
              </div>
              
               <div class="data-group">
                <span class="label">PHONE / 聯絡電話</span>
                <span class="value">${form.phone || '未提供'}</span>
              </div>

              <div class="data-group">
                <span class="label">MESSAGE / 諮詢內容</span>
                <div class="message-box">
                  ${form.message}
                </div>
              </div>
            </div>

            <div class="footer">
              <p>RECEIVED AT: ${now}</p>
              <p>This is an automated message from your service backend.</p>
              <p>&copy; ${new Date().getFullYear()} San Ring Tech. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
    }
}