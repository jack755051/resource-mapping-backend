// src/modules/notification/notification.service.ts
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { ContactForm } from '../contact-form/entities/contact-form.entity';

@Injectable()
export class NotificationService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendContactNotification(form: ContactForm) {
    // 從 .env 讀取接收通知的業主信箱
    const adminEmail = this.configService.get<string>('ADMIN_RECEIVER_EMAIL');

    try {
      await this.mailerService.sendMail({
        to: adminEmail,
        subject: `[新諮詢通知] 來自 ${form.name} 的詢問`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
            <h2 style="color: #333;">收到新的諮詢表單</h2>
            <p><b>客戶姓名：</b> ${form.name}</p>
            <p><b>聯絡信箱：</b> ${form.email}</p>
            <p><b>諮詢類型：</b> ${form.type.join(', ')}</p>
            <p><b>留言內容：</b></p>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 5px;">
              ${form.message}
            </div>
            <br />
            <p style="font-size: 12px; color: #999;">此信件由 San Ring Tech 系統自動發送</p>
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
