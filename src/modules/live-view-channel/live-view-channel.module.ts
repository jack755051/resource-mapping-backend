import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LiveViewChannelService } from './live-view-channel.service';
import { LiveViewChannelController } from './live-view-channel.controller';
import { LiveViewChannel } from './entities/live-view-channel.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([LiveViewChannel]),
  ],
  controllers: [LiveViewChannelController],
  providers: [LiveViewChannelService],
  exports: [LiveViewChannelService],
})
export class LiveViewChannelModule {}
