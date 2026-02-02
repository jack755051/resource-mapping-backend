import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { HistoryService } from './history.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post()
  create(@Body() createHistoryDto: CreateHistoryDto) {
    return this.historyService.create(createHistoryDto);
  }

  @Get()
  findAll() {
    return this.historyService.findAll();
  }

  @Get(':id')
  // 💡 移除 +id，並加上 ParseUUIDPipe
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.historyService.findOne(id);
  }

  @Patch(':id')
  // 💡 移除 +id
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateHistoryDto: UpdateHistoryDto,
  ) {
    return this.historyService.update(id, updateHistoryDto);
  }

  @Delete(':id')
  // 💡 移除 +id
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.historyService.remove(id);
  }
}
