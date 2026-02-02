import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ConactService } from './conact.service';
import { CreateConactDto } from './dto/create-conact.dto';
import { UpdateConactDto } from './dto/update-conact.dto';

@Controller('contact')
export class ConactController {
  constructor(private readonly conactService: ConactService) {}

  @Post()
  create(@Body() createConactDto: CreateConactDto) {
    return this.conactService.create(createConactDto);
  }

  @Post('form')
  submitForm(@Body() createConactDto: CreateConactDto) {
    return this.conactService.create(createConactDto);
  }

  @Get()
  findAll() {
    return this.conactService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conactService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConactDto: UpdateConactDto) {
    return this.conactService.update(+id, updateConactDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conactService.remove(+id);
  }
}
