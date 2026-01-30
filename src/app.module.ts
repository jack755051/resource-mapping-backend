import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { ConactModule } from './conact/conact.module';
import { ConstantModule } from './constant/constant.module';
import { OfficeTypesModule } from './office-types/office-types.module';
import { LocationModule } from './location/location.module';
import { SharedModule } from './shared/shared.module';
import { ProductTypeModule } from './product-type/product-type.module';
import { SupportTypeModule } from './support-type/support-type.module';
import { SupportTypesModule } from './support-types/support-types.module';
import { ProductTypesModule } from './product-types/product-types.module';

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
    ProductsModule,
    ConactModule,
    ConstantModule,
    OfficeTypesModule,
    LocationModule,
    SharedModule,
    ProductTypeModule,
    SupportTypeModule,
    SupportTypesModule,
    ProductTypesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
