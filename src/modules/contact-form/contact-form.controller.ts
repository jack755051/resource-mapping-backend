import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ContactFormService } from './contact-form.service';
import { CreateContactFormDto } from './dto/create-contact-form.dto';
import { ContactFormStatus } from './constants/contact-form.constants';

@Controller()
export class ContactFormController {
  constructor(private readonly contactFormService: ContactFormService) { }

  /**
   * 1. 使用者提交諮詢表單 (公開接口)
   */
  @Post()
  create(@Body() createContactFormDto: CreateContactFormDto) {
    return this.contactFormService.create(createContactFormDto);
  }

  /**
   * 2. 獲取諮詢清單 (Dashboard 使用，支援分頁與狀態篩選)
   * GET /api/v1/contact-form?page=1&limit=10&status=unread
   */
  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('status') status?: ContactFormStatus,
  ) {
    return this.contactFormService.findAll({ page, limit, status });
  }

  /**
   * 3. 獲取單一諮詢內容
   */
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.contactFormService.findOne(id);
  }

  /**
   * 4. 更新諮詢狀態 (Dashboard 使用)
   * PATCH /api/v1/contact-form/:id/status
   */
  @Patch(':id/status')
  updateStatus(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body('status') status: ContactFormStatus,
  ) {
    return this.contactFormService.updateStatus(id, status);
  }

  /**
   * 5. 刪除諮詢紀錄
   */
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.contactFormService.remove(id);
  }
}
