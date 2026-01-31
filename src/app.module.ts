import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './modules/products/products.module';
import { ConactModule } from './modules/conact/conact.module';
import { OfficeTypesModule } from './modules/office-types/office-types.module';
import { LocationModule } from './modules/location/location.module';
import { SharedModule } from './shared/shared.module';
import { SupportTypesModule } from './modules/support-types/support-types.module';
import { ProductTypesModule } from './modules/product-types/product-types.module';
import { SupportsModule } from './modules/supports/supports.module';
import { HistoryModule } from './modules/about/history/history.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    /**先載入config，讓其他module可以取用 */
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    /** 非同步載入 TypeOrm 設定 */
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        autoLoadEntities: true, // 自動載入 Entity
        // entities: [__dirname + '/**/*.entity.{js,ts}'],
        synchronize: process.env.NODE_ENV !== 'production',
      }),
      inject: [ConfigService],
    }),
    RouterModule.register([
      {
        path: 'about', // 這是父層路徑
        module: HistoryModule, // 此模組下的所有 Controller 都會掛在 /about 下
      },
    ]),

    ProductsModule,
    ConactModule,
    OfficeTypesModule,
    LocationModule,
    SharedModule,
    SupportTypesModule,
    ProductTypesModule,
    SupportsModule,
    HistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
