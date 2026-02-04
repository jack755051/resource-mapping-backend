// src/modules/notification/notification.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ContactForm } from '../contact-form/entities/contact-form.entity';
import { InquiryIntent } from '../contact-form/constants/contact-form.constants';
import sgMail from '@sendgrid/mail';
// 👇 引入剛剛拆分出去的模板
import { getContactNotificationTemplate } from './templates/contact-notification.html';

@Injectable()
export class NotificationService {
    constructor(private readonly configService: ConfigService) {
        const apiKey = this.configService.getOrThrow<string>('MAIL_APP_PASS');
        sgMail.setApiKey(apiKey);
    }

    async sendContactNotification(form: ContactForm, intent: InquiryIntent) {
        const adminEmail = this.configService.getOrThrow<string>('ADMIN_RECEIVER_EMAIL');
        const fromEmail = this.configService.getOrThrow<string>('MAIL_FROM');

        const intentConfig = {
            [InquiryIntent.REPAIR]: { label: '緊急維修', color: '#ef4444' },
            [InquiryIntent.COOPERATION]: { label: '商務合作', color: '#3b82f6' },
            [InquiryIntent.CONSULT]: { label: '產品諮詢', color: '#10b981' },
            [InquiryIntent.INQUIRY]: { label: '一般詢問', color: '#f59e0b' },
            [InquiryIntent.OTHER]: { label: '其他訊息', color: '#6366f1' },
        };

        const config = intentConfig[intent] || { label: '新諮詢', color: '#64748b' };
        const subject = `[${config.label}] 來自 ${form.name} 的系統通知`;

        // 👇 呼叫外部函式產生 HTML
        const htmlContent = getContactNotificationTemplate(form, config);

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
}