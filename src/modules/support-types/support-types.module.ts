import { Module } from '@nestjs/common';
import { SupportTypesService } from './support-types.service';
import { SupportTypesController } from './support-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupportType } from './entities/support-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SupportType])
  ],
  controllers: [SupportTypesController],
  providers: [SupportTypesService],
})
export class SupportTypesModule { }
