import { Module } from '@nestjs/common';
import { ConactService } from './conact.service';
import { ConactController } from './conact.controller';

@Module({
  controllers: [ConactController],
  providers: [ConactService],
})
export class ConactModule {}
