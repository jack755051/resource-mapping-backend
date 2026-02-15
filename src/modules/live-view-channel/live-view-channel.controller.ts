import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe
} from '@nestjs/common';
import { LiveViewChannelService } from './live-view-channel.service';
import { CreateLiveViewChannelDto } from './dto/create-live-view-channel.dto';
import { UpdateLiveViewChannelDto } from './dto/update-live-view-channel.dto';
import { QueryLiveViewChannelDto } from './dto/query-live-view-channel.dto';

@Controller('live-view/channels')
export class LiveViewChannelController {
  constructor(private readonly liveViewChannelService: LiveViewChannelService) {}

  /**
   * POST /api/v1/live-view/channels
   * 創建新的即時監控頻道
   */
  @Post()
  create(@Body() createDto: CreateLiveViewChannelDto) {
    return this.liveViewChannelService.create(createDto);
  }

  /**
   * GET /api/v1/live-view/channels?page=1&limit=10&search=...
   * 分頁查詢所有頻道（支援搜尋）
   */
  @Get()
  findAll(@Query() query: QueryLiveViewChannelDto) {
    return this.liveViewChannelService.findAll(query);
  }

  /**
   * GET /api/v1/live-view/channels/:id
   * 查詢單個頻道
   */
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.liveViewChannelService.findOne(id);
  }

  /**
   * PATCH /api/v1/live-view/channels/:id
   * 更新頻道資訊
   */
  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateDto: UpdateLiveViewChannelDto,
  ) {
    return this.liveViewChannelService.update(id, updateDto);
  }

  /**
   * DELETE /api/v1/live-view/channels/:id
   * 刪除頻道
   */
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.liveViewChannelService.remove(id);
  }
}
