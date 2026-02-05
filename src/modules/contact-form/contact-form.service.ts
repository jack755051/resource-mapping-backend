import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactForm } from './entities/contact-form.entity';
import { CreateContactFormDto } from './dto/create-contact-form.dto';
import {
  BANNED_KEYWORDS,
  CONTACT_ERROR_MSG,
  ContactFormStatus,
  InquiryIntent,
  INTENT_KEYWORDS,
} from './constants/contact-form.constants';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class ContactFormService {
  constructor(
    @InjectRepository(ContactForm)
    private readonly repo: Repository<ContactForm>,
    private readonly notificationService: NotificationService,
  ) {}

  // 1. 使用者提交
  async create(createDto: CreateContactFormDto) {
    // 1. 違禁詞檢查 (若報錯會直接中斷並回傳 400)
    this.checkBlacklist(createDto.message);

    // 2. 自動判定諮詢意圖
    const detectedIntent = this.detectInquiryIntent(createDto.message);

    // 3. 建立實體，將分析結果存入 intent 欄位
    const form = this.repo.create({
      ...createDto,
      intent: detectedIntent, // 👈 存入判定結果
      status: ContactFormStatus.UNREAD,
      createdBy: 'guest_user',
    });

    const savedForm = await this.repo.save(form);

    // 4. 寄送通知，這裏可以把 intent 傳給 notificationService 用來做信件分類
    this.notificationService
      .sendContactNotification(savedForm, detectedIntent)
      .catch((err) => console.error('背景發信失敗:', err));

    return await this.findOne(savedForm.id);
  }

  // 2. Dashboard 專用：分頁與篩選查詢
  async findAll(query: {
    page?: number;
    limit?: number;
    status?: ContactFormStatus;
  }) {
    const { page = 1, limit = 10, status } = query;
    const skip = (page - 1) * limit;

    const [items, total] = await this.repo.findAndCount({
      where: status ? { status } : {}, // 💡 支援按狀態篩選
      order: { createdAt: 'DESC' },
      take: limit,
      skip: skip,
    });

    return {
      items,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  // 3. 獲取單一諮詢 (查看詳情)
  async findOne(id: string) {
    const form = await this.repo.findOne({ where: { id } });
    if (!form) throw new NotFoundException('找不到該諮詢紀錄');
    return form;
  }

  // 4. 標記為已讀 (由 Controller 在適當時機呼叫)
  async markAsRead(id: string) {
    const form = await this.findOne(id);
    if (form.status === ContactFormStatus.UNREAD) {
      form.status = ContactFormStatus.READ;
      return this.repo.save(form);
    }
    return form;
  }

  // 5. 更新狀態 (如：標記為「已回覆」)
  async updateStatus(
    id: string,
    status: ContactFormStatus,
    adminName: string = 'admin',
  ) {
    const form = await this.findOne(id);
    form.status = status;
    form.updatedBy = adminName; // 💡 記錄是哪位同事處理的
    return this.repo.save(form);
  }

  // 6. 刪除
  async remove(id: string) {
    const result = await this.repo.delete(id);
    if (result.affected === 0) throw new NotFoundException('找不到該資料');
    return { success: true };
  }

  // ====== 非controller 呼叫功能 ======
  /**
   * 邏輯 A: 黑名單檢查
   */
  private checkBlacklist(content: string) {
    if (BANNED_KEYWORDS.some((word) => content.includes(word))) {
      throw new BadRequestException(CONTACT_ERROR_MSG.BANNED_WORDS);
    }
  }

  /**
   * 邏輯 B: 自動判定諮詢意圖
   */
  private detectInquiryIntent(content: string): InquiryIntent {
    for (const item of INTENT_KEYWORDS) {
      if (item.keywords.some((key) => content.includes(key))) {
        return item.intent;
      }
    }
    return InquiryIntent.OTHER; // 預設為其他
  }
}
