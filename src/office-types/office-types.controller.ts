import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OfficeTypesService } from './office-types.service';
import { CreateOfficeTypeDto } from './dto/create-office-type.dto';
import { UpdateOfficeTypeDto } from './dto/update-office-type.dto';

@Controller('office-types')
export class OfficeTypesController {
  constructor(private readonly officeTypesService: OfficeTypesService) { }

  @Post()
  create(@Body() createOfficeTypeDto: CreateOfficeTypeDto) {
    return this.officeTypesService.create(createOfficeTypeDto);
  }

  @Get()
  findAll() {
    return this.officeTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.officeTypesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOfficeTypeDto: UpdateOfficeTypeDto) {
    return this.officeTypesService.update(+id, updateOfficeTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.officeTypesService.remove(+id);
  }
}
