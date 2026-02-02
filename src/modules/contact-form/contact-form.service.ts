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
  ContactFormType,
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
    // 1. 執行商業邏輯檢查
    this.validateBusinessLogic(createDto);

    const form = this.repo.create({
      ...createDto,
      status: ContactFormStatus.UNREAD, // 💡 使用 Enum 預設值
    });

    const savedForm = await this.repo.save(form);

    // TODO: 串接 MailerService 寄送通知給管理員
    this.notificationService.sendContactNotification(savedForm);

    return savedForm;
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
  async updateStatus(id: string, status: ContactFormStatus) {
    const form = await this.findOne(id);
    form.status = status;
    return this.repo.save(form);
  }

  // 6. 刪除
  async remove(id: string) {
    const result = await this.repo.delete(id);
    if (result.affected === 0) throw new NotFoundException('找不到該資料');
    return { success: true };
  }

  // ====== 非controller 呼叫功能 ======

  private validateBusinessLogic(createDto: CreateContactFormDto) {
    // 1. 檢查黑名單字眼 (使用提取出的常量)
    if (BANNED_KEYWORDS.some((word) => createDto.message.includes(word))) {
      throw new BadRequestException(CONTACT_ERROR_MSG.BANNED_WORDS);
    }

    // 2. 檢查特定類型組合 (使用 Enum)
    const isUrgent = createDto.type.includes(ContactFormType.URGENT);
    if (isUrgent && !createDto.phone) {
      throw new BadRequestException(CONTACT_ERROR_MSG.URGENT_REQUIRES_PHONE);
    }

    // 3. 檢查合作路徑
    if (createDto.type.includes(ContactFormType.COOPERATION)) {
      throw new BadRequestException(CONTACT_ERROR_MSG.COOPERATION_VIA_EMAIL);
    }

    // 4. 檢查維修路徑
    if (createDto.type.includes(ContactFormType.REPAIR)) {
      throw new BadRequestException(CONTACT_ERROR_MSG.REPAIR_REQUIRES_PHONE);
    }

    // 5. 檢查其他類型
    if (createDto.type.includes(ContactFormType.OTHER)) {
      throw new BadRequestException(CONTACT_ERROR_MSG.OTHER);
    }
  }
}
