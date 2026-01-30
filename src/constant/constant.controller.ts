import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConstantService } from './constant.service';
import { CreateConstantDto } from './dto/create-constant.dto';
import { UpdateConstantDto } from './dto/update-constant.dto';

@Controller('constant')
export class ConstantController {
  constructor(private readonly constantService: ConstantService) { }

  @Post()
  create(@Body() createConstantDto: CreateConstantDto) {
    return this.constantService.create(createConstantDto);
  }

  @Get('contact-location')
  findContactLocation() {
    return this.constantService.findContactLocation();
  }
}
