import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductCategory } from '../product-categories/entities/product-category.entity';
import { AnalyticsModule } from '../analytics/analytics.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductCategory]),
    AnalyticsModule, // 💡 導入 AnalyticsModule 以使用 AnalyticsInterceptor
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
