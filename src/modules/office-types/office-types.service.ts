import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOfficeTypeDto } from './dto/create-office-type.dto';
import { UpdateOfficeTypeDto } from './dto/update-office-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OfficeType } from './entities/office-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OfficeTypesService {
  constructor(
    @InjectRepository(OfficeType)
    private readonly repo: Repository<OfficeType>,
  ) { }

  async create(createDto: CreateOfficeTypeDto) {
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
      throw new NotFoundException(`Office type with ID ${id} not found`);
    }
    return entity;
  }

  async update(id: string, updateDto: UpdateOfficeTypeDto) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException(`Office type with ID ${id} not found`);
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
