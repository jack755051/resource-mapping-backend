import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { SupportType } from './entities/support-type.entity';
import { Repository } from 'typeorm';
import { CreateSupportTypeDto } from './dto/create-support-type.dto';
import { UpdateSupportTypeDto } from './dto/update-support-type.dto';

@Injectable()
export class SupportTypesService {
  constructor(
    @InjectRepository(SupportType)
    private readonly repo: Repository<SupportType>,
  ) { }

  async create(createSupportTypeDto: CreateSupportTypeDto) {
    const entity = this.repo.create(createSupportTypeDto as any);
    return this.repo.save(entity);
  }

  async findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException(`Office type with ID ${id} not found`);
    }
    return entity;
  }

  async update(id: string, updateSupportTypeDto: UpdateSupportTypeDto) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException(`Office type with ID ${id} not found`);
    }

    Object.assign(entity, updateSupportTypeDto);

    return this.repo.save(entity);
  }

  async remove(id: string) {
    const entity = await this.findOne(id);
    if (!entity) {
      throw new NotFoundException(`Office type with ID ${id} not found`);
    }
    return this.repo.delete(entity);
  }
}
