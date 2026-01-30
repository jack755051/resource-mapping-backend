import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { SupportTypesService } from './support-types.service';
import { CreateSupportTypeDto } from './dto/create-support-type.dto';
import { UpdateSupportTypeDto } from './dto/update-support-type.dto';

@Controller('support-types')
export class SupportTypesController {
  constructor(private readonly supportTypesService: SupportTypesService) { }

  @Post()
  create(@Body() createSupportTypeDto: CreateSupportTypeDto) {
    return this.supportTypesService.create(createSupportTypeDto);
  }

  @Get()
  findAll() {
    return this.supportTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.supportTypesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateSupportTypeDto: UpdateSupportTypeDto) {
    return this.supportTypesService.update(id, updateSupportTypeDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.supportTypesService.remove(id);
  }
}
