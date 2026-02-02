import { Module } from '@nestjs/common';
import { SupportCategoriesService } from './support-categories.service';
import { SupportCategoriesController } from './support-categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupportCategory } from './entities/support-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SupportCategory])],
  controllers: [SupportCategoriesController],
  providers: [SupportCategoriesService],
})
export class SupportCategoriesModule {}
