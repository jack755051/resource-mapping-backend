import { Module } from '@nestjs/common';
import { OfficeTypesService } from './office-types.service';
import { OfficeTypesController } from './office-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfficeType } from './entities/office-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OfficeType])],
  controllers: [OfficeTypesController],
  providers: [OfficeTypesService],
})
export class OfficeTypesModule { }
