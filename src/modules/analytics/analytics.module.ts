import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { AnalyticEvent } from './entities/analytics.entity';
import { AnalyticsInterceptor } from './interceptors/analytics.interceptor';

@Module({
  imports: [
    TypeOrmModule.forFeature([AnalyticEvent]),
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService, AnalyticsInterceptor],
  exports: [AnalyticsService, AnalyticsInterceptor], // 匯出以便其他模組使用
})
export class AnalyticsModule { }
