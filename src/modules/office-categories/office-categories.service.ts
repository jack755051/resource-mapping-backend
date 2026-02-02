import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOfficeCategoryDto } from './dto/create-office-category.dto';
import { UpdateOfficeCategoryDto } from './dto/update-office-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OfficeCategory } from './entities/office-category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OfficeCategoriesService {
  constructor(
    @InjectRepository(OfficeCategory)
    private readonly repo: Repository<OfficeCategory>,
  ) { }

  async create(createDto: CreateOfficeCategoryDto) {
    const entity = this.repo.create(createDto);
    return this.repo.save(entity);
  }

  async findAll() {
    const [items, total] = await this.repo.findAndCount();

    return {
      data: items,
      total: total, // 這裡就是你要的 amount
    };
  }

  async findOne(id: string) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException(`Office category with ID ${id} not found`);
    }
    return entity;
  }

  async update(id: string, updateDto: UpdateOfficeCategoryDto) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException(`Office category with ID ${id} not found`);
    }

    Object.assign(entity, updateDto);

    return this.repo.save(entity);
  }

  async remove(id: string) {
    const result = await this.repo.delete(id);
    if (result.affected === 0) throw new NotFoundException('找不到該辦公室類型以供刪除');
    return { success: true };
  }
}
