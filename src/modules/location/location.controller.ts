import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) { }

  @Post()
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create(createLocationDto);
  }

  @Get()
  findAll() {
    return this.locationService.findAll();
  }

  @Get(':id')
  // 💡 使用 ParseUUIDPipe 確保傳入的是合法 UUID，否則直接擋掉回傳 400
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.locationService.findOne(id);
  }

  @Patch(':id')
  // 💡 這裡也建議加上 Pipe，且移除原本的 +id 轉型
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateLocationDto: UpdateLocationDto
  ) {
    return this.locationService.update(id, updateLocationDto);
  }

  @Delete(':id')
  // ❌ 修正：原本的 +id 會變成 NaN，必須直接傳入字串
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.locationService.remove(id);
  }
}