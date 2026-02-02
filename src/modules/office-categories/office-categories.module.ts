import { Module } from '@nestjs/common';
import { OfficeCategoriesService } from './office-categories.service';
import { OfficeCategoriesController } from './office-categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfficeCategory } from './entities/office-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OfficeCategory])],
  controllers: [OfficeCategoriesController],
  providers: [OfficeCategoriesService],
})
export class OfficeCategoriesModule { }
