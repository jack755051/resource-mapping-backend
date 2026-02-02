import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { SupportCategory } from './entities/support-category.entity';
import { Repository } from 'typeorm';
import { CreateSupportCategoryDto } from './dto/create-support-category.dto';
import { UpdateSupportCategoryDto } from './dto/update-support-category.dto';

@Injectable()
export class SupportCategoriesService {
  constructor(
    @InjectRepository(SupportCategory)
    private readonly repo: Repository<SupportCategory>,
  ) { }

  async create(createSupportCategoryDto: CreateSupportCategoryDto) {
    const entity = this.repo.create(createSupportCategoryDto as any);
    return this.repo.save(entity);
  }

  async findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException(`Support category with ID ${id} not found`);
    }
    return entity;
  }

  async update(id: string, updateSupportCategoryDto: UpdateSupportCategoryDto) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException(`Support category with ID ${id} not found`);
    }

    Object.assign(entity, updateSupportCategoryDto);

    return this.repo.save(entity);
  }

  async remove(id: string) {
    const entity = await this.findOne(id);
    if (!entity) {
      throw new NotFoundException(`Support category with ID ${id} not found`);
    }
    return this.repo.delete(entity);
  }
}
