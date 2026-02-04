// src/modules/notification/templates/contact-notification.html.ts
import { ContactForm } from '../../contact-form/entities/contact-form.entity';

/**
 * 產生具有科技設計感的 Email HTML
 */
export const getContactNotificationTemplate = (
    form: ContactForm,
    config: { label: string; color: string }
): string => {
    const now = new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' });

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          /* 這裡放原本那一大串 CSS */
          body { margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f1f5f9; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          .header { background-color: #0f172a; padding: 32px 24px; text-align: center; border-bottom: 4px solid ${config.color}; }
          .header-title { color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; }
          .header-subtitle { color: #94a3b8; margin: 8px 0 0 0; font-size: 14px; letter-spacing: 1px; }
          .content { padding: 32px 24px; }
          .tag { display: inline-block; background-color: ${config.color}15; color: ${config.color}; padding: 6px 12px; border-radius: 4px; font-size: 12px; font-weight: bold; border: 1px solid ${config.color}; margin-bottom: 20px; }
          .data-group { margin-bottom: 24px; }
          .label { display: block; font-size: 12px; color: #64748b; text-transform: uppercase; margin-bottom: 6px; letter-spacing: 0.5px; font-weight: 600; }
          .value { display: block; font-size: 16px; color: #334155; font-weight: 500; background: #f8fafc; padding: 12px; border-radius: 6px; border-left: 3px solid #cbd5e1; }
          .message-box { background-color: #f8fafc; border: 1px dashed #cbd5e1; padding: 20px; border-radius: 6px; color: #334155; line-height: 1.6; white-space: pre-wrap; }
          .footer { background-color: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
        </style>
      </head>
      <body>
        <div style="padding: 40px 0;">
          <div class="container">
            <div class="header">
              <h1 class="header-title">System Notification</h1>
              <p class="header-subtitle">New Inquiry Received</p>
            </div>

            <div class="content">
              <div class="tag">TYPE: ${config.label}</div>

              <div class="data-group">
                <span class="label">Client Name / 客戶姓名</span>
                <span class="value">${form.name}</span>
              </div>

              <div class="data-group">
                <span class="label">Contact Email / 聯絡信箱</span>
                <span class="value">
                  <a href="mailto:${form.email}" style="color: #334155; text-decoration: none;">${form.email}</a>
                </span>
              </div>
              
               <div class="data-group">
                <span class="label">Phone / 聯絡電話</span>
                <span class="value">${form.phone || '未提供'}</span>
              </div>

              <div class="data-group">
                <span class="label">Message / 諮詢內容</span>
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
};