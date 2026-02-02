// src/product-categories/product-categories.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from './entities/product-category.entity';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';

@Injectable()
export class ProductCategoriesService {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly repo: Repository<ProductCategory>,
  ) {}

  async create(createDto: CreateProductCategoryDto) {
    const entity = this.repo.create(createDto as any);
    return await this.repo.save(entity);
  }

  async findAll() {
    return await this.repo.find({ order: { sort: 'ASC' } });
  }

  async findOne(id: string) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity)
      throw new NotFoundException(`Product category with ID ${id} not found`);
    return entity;
  }

  async update(id: string, updateDto: UpdateProductCategoryDto) {
    const entity = await this.repo.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException(`Product category with ID ${id} not found`);
    }

    Object.assign(entity, updateDto);
    return await this.repo.save(entity);
  }

  async remove(id: string) {
    const result = await this.repo.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`Product category with ID ${id} not found`);
    return { success: true };
  }
}
