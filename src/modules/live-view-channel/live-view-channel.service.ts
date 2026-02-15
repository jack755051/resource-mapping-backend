import { Injectable } from '@nestjs/common';
import { CreateLiveViewChannelDto } from './dto/create-live-view-channel.dto';
import { UpdateLiveViewChannelDto } from './dto/update-live-view-channel.dto';

@Injectable()
export class LiveViewChannelService {
  create(createLiveViewChannelDto: CreateLiveViewChannelDto) {
    return 'This action adds a new liveViewChannel';
  }

  findAll() {
    return `This action returns all liveViewChannel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} liveViewChannel`;
  }

  update(id: number, updateLiveViewChannelDto: UpdateLiveViewChannelDto) {
    return `This action updates a #${id} liveViewChannel`;
  }

  remove(id: number) {
    return `This action removes a #${id} liveViewChannel`;
  }
}
