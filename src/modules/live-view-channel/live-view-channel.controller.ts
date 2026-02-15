import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LiveViewChannelService } from './live-view-channel.service';
import { CreateLiveViewChannelDto } from './dto/create-live-view-channel.dto';
import { UpdateLiveViewChannelDto } from './dto/update-live-view-channel.dto';

@Controller('live-view-channel')
export class LiveViewChannelController {
  constructor(private readonly liveViewChannelService: LiveViewChannelService) {}

  @Post()
  create(@Body() createLiveViewChannelDto: CreateLiveViewChannelDto) {
    return this.liveViewChannelService.create(createLiveViewChannelDto);
  }

  @Get()
  findAll() {
    return this.liveViewChannelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.liveViewChannelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLiveViewChannelDto: UpdateLiveViewChannelDto) {
    return this.liveViewChannelService.update(+id, updateLiveViewChannelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.liveViewChannelService.remove(+id);
  }
}
