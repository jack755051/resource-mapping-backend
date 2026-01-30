// src/product-types/product-types.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductType } from './entities/product-type.entity';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';

@Injectable()
export class ProductTypesService {
  constructor(
    @InjectRepository(ProductType)
    private readonly repo: Repository<ProductType>,
  ) { }

  async create(createDto: CreateProductTypeDto) {
    const entity = this.repo.create(createDto as any);
    return await this.repo.save(entity);
  }

  async findAll() {
    return await this.repo.find({ order: { sort: 'ASC' } });
  }

  async findOne(id: string) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException(`Product type with ID ${id} not found`);
    return entity;
  }

  async update(id: string, updateDto: UpdateProductTypeDto) {
    const entity = await this.repo.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException(`Product type with ID ${id} not found`);
    }

    Object.assign(entity, updateDto);
    return await this.repo.save(entity);
  }

  async remove(id: string) {
    const result = await this.repo.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Product type with ID ${id} not found`);
    return { success: true };
  }
}