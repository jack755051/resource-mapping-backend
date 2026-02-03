// src/modules/notification/notification.service.ts
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { ContactForm } from '../contact-form/entities/contact-form.entity';
import { InquiryIntent } from '../contact-form/constants/contact-form.constants';

@Injectable()
export class NotificationService {
    constructor(
        private readonly mailerService: MailerService,
        private readonly configService: ConfigService,
    ) { }

    // 💡 接收兩個參數：表單資料與偵測到的意圖
    async sendContactNotification(form: ContactForm, intent: InquiryIntent) {
        const adminEmail = this.configService.get<string>('ADMIN_RECEIVER_EMAIL');

        // 💡 定義標題對照表
        const intentLabels = {
            [InquiryIntent.REPAIR]: '【緊急維修】',
            [InquiryIntent.COOPERATION]: '【商務合作】',
            [InquiryIntent.CONSULT]: '【產品諮詢】',
            [InquiryIntent.INQUIRY]: '【一般詢問】',
            [InquiryIntent.OTHER]: '【其他訊息】',
        };

        const subjectTag = intentLabels[intent] || '【新諮詢通知】';

        try {
            await this.mailerService.sendMail({
                to: adminEmail,
                // 💡 根據意圖動態改變標題
                subject: `${subjectTag} 來自 ${form.name} 的詢問`,
                html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; line-height: 1.6;">
            <h2 style="color: #2c3e50; border-bottom: 2px solid #eee; padding-bottom: 10px;">
              ${subjectTag} 諮詢詳情
            </h2>
            <p><b>客戶姓名：</b> ${form.name}</p>
            <p><b>聯絡信箱：</b> ${form.email}</p>
            <p><b>產品標籤：</b> <span style="color: #3498db;">${form.type.join(', ')}</span></p>
            <p><b>判定意圖：</b> <span style="background: #f1c40f; padding: 2px 5px; border-radius: 3px;">${subjectTag.replace(/[【】]/g, '')}</span></p>
            <p><b>留言內容：</b></p>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #3498db;">
              ${form.message.replace(/\n/g, '<br>') /* 處理換行 */}
            </div>
            <br />
            <hr style="border: none; border-top: 1px solid #eee;" />
            <p style="font-size: 12px; color: #999;">
              這封郵件是由 San Ring Tech 系統分析內容後自動發送。<br />
              請至管理後台查看完整資訊。
            </p>
          </div>
        `,
            });
            return true;
        } catch (error) {
            console.error('Mail Send Error:', error);
            return false;
        }
    }
}