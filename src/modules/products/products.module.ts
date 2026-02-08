import { Module, forwardRef } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductCategory } from '../product-categories/entities/product-category.entity';
import { AnalyticsModule } from '../analytics/analytics.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductCategory]),
    forwardRef(() => AnalyticsModule), // 💡 使用 forwardRef 處理循環依賴
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService], // 導出 ProductsService 供其他模組使用
})
export class ProductsModule {}
