import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import express from 'express';
import { AnalyticsService } from './analytics.service';
import { CreateAnalyticsDto } from './dto/create-analytics.dto';
import { TrackEvent } from './decorators/track-event.decorator';
import { ProductsService } from '../products/products.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService, private readonly productsService: ProductsService) { }

  @Get(':id')
  @TrackEvent({ type: 'PRODUCT_VIEW', resourceType: 'product' }) // 貼上標籤
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

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
