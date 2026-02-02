import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { SupportsService } from './supports.service';
import { QuerySupportDto } from './dto/query-support.dto';
import { CreateSupportDto } from './dto/create-support.dto';
import { UpdateSupportDto } from './dto/update-support.dto';

@Controller('support/resources')
export class SupportsController {
  constructor(private readonly SupportsService: SupportsService) {}

  @Get()
  async findAll(@Query() query: QuerySupportDto) {
    return this.SupportsService.findAll(query);
  }

  @Post()
  async create(@Body() dto: CreateSupportDto) {
    return this.SupportsService.create(dto);
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string, // 💡 確保傳入的是有效的 UUID
    @Body() dto: UpdateSupportDto,
  ) {
    return this.SupportsService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.SupportsService.delete(id);
  }
}
