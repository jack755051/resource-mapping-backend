// src/modules/products/products.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryProductDto } from './dto/query-product.dto';
import { BulkCreateProductDto } from './dto/bulk-create-product.dto';
import { UseInterceptors } from '@nestjs/common';
import { AnalyticsInterceptor } from '../analytics/interceptors/analytics.interceptor';

@Controller('products')
@UseInterceptors(AnalyticsInterceptor)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Post('bulk')
  createMulti(@Body() bulkDto: BulkCreateProductDto) {
    // 💡 透過 BulkCreateProductDto 確保陣列內容有被驗證到
    return this.productsService.createMulti(bulkDto.products);
  }

  @Get()
  findAll(@Query() query: QueryProductDto) {
    // 💡 傳入 Query 物件
    return this.productsService.findAll(query);
  }

  @Get(':idOrSlug')
  findOne(@Param('idOrSlug') idOrSlug: string) {
    return this.productsService.findOne(idOrSlug);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}