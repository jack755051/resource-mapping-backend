import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './modules/products/products.module';
import { OfficeCategoriesModule } from './modules/office-categories/office-categories.module';
import { LocationModule } from './modules/location/location.module';
import { SharedModule } from './shared/shared.module';
import { SupportCategoriesModule } from './modules/support-categories/support-categories.module';
import { ProductCategoriesModule } from './modules/product-categories/product-categories.module';
import { SupportsModule } from './modules/supports/supports.module';
import { HistoryModule } from './modules/about/history/history.module';
import { APP_INTERCEPTOR, RouterModule } from '@nestjs/core';
import { I18nInterceptor } from './shared/I18nInterceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { ContactFormModule } from './modules/contact-form/contact-form.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { NotificationModule } from './modules/notification/notification.module';
import { ContactModule } from './modules/contact/contact.module';
import { AuditSubscriber } from './common/subscribers/audit.subscriber';
import { StorageModule } from './modules/storage/storage.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { AnalyticsInterceptor } from './modules/analytics/interceptors/analytics.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: process.env.NODE_ENV !== 'production', // 💡 生產環境務必設為 false
        subscribers: [AuditSubscriber], // 💡 註冊訂閱者
      }),
    }),

    // 💡 合併後的路由註冊，結構更清晰
    RouterModule.register([
      {
        path: 'about',
        module: HistoryModule,
      },
      {
        path: 'contact',
        children: [
          { path: 'form', module: ContactFormModule },
          { path: 'locations', module: LocationModule },
          { path: '/', module: ContactModule },
        ],
      },
    ]),

    ProductsModule,
    OfficeCategoriesModule,
    LocationModule,
    SharedModule,
    SupportCategoriesModule,
    ProductCategoriesModule,
    SupportsModule,
    HistoryModule,
    ContactFormModule,
    ContactModule,
    // 💡 郵件設定
    MailerModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        transport: {
          host: 'smtp.sendgrid.net',
          port: 587,
          secure: false, // 💡 587 埠必須為 false
          auth: {
            user: 'apikey',
            pass: config.get('MAIL_APP_PASS'), // SG.xxxx
          },
        },
      }),
      inject: [ConfigService],
    }),
    NotificationModule,
    StorageModule,
    AnalyticsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // 💡 關鍵：全域註冊攔截器，這樣才能正確注入 Reflector
    {
      provide: APP_INTERCEPTOR,
      useClass: I18nInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    // 💡 全域註冊分析攔截器（循環依賴已通過 forwardRef 解決）
    {
      provide: APP_INTERCEPTOR,
      useClass: AnalyticsInterceptor,
    },
  ],
})
export class AppModule { }
