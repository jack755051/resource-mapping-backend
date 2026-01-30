import { Module } from '@nestjs/common';
import { SupportTypesService } from './support-types.service';
import { SupportTypesController } from './support-types.controller';

@Module({
  controllers: [SupportTypesController],
  providers: [SupportTypesService],
})
export class SupportTypesModule {}
