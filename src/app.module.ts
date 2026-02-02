import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './modules/products/products.module';
import { ConactModule } from './modules/conact/conact.module';
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
          { path: 'locations', module: LocationModule },
          { path: '/', module: ConactModule },
        ],
      },
    ]),

    ProductsModule,
    ConactModule,
    OfficeCategoriesModule,
    LocationModule,
    SharedModule,
    SupportCategoriesModule,
    ProductCategoriesModule,
    SupportsModule,
    HistoryModule,
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
  ],
})
export class AppModule { }
