import { Controller, Post, Body, Req } from '@nestjs/common';
import express from 'express';
import { AnalyticsService } from './analytics.service';
import { CreateAnalyticsDto } from './dto/create-analytics.dto';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) { }

  // 供前端 (Next.js) 手動回傳紀錄 (例如：按鈕點擊、暫留時間)
  @Post('log')
  async logManualEvent(
    @Body() dto: CreateAnalyticsDto,
    @Req() req: express.Request
  ) {
    return this.analyticsService.createEvent({
      ...dto,
      sessionId: req.headers['x-session-id'] as string,
      metadata: {
        ...dto.metadata,
        ip: req.headers['cf-connecting-ip'] || req.ip,
        userAgent: req.headers['user-agent'],
      }
    });
  }
}
