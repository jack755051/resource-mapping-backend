import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly repo: Repository<Location>,
  ) { }


  async create(createDto: CreateLocationDto) {
    const entity = this.repo.create(createDto);
    return this.repo.save(entity);
  }

  async findAll() {
    return this.repo.find({ relations: ['officeType'] });
  }

  async findOne(id: number) {
    const entity = await this.repo.findOne({
      where: { id },
      relations: ['officeType'] // 同樣要 Join
    });
    if (!entity) throw new NotFoundException(`Location with ID ${id} not found`);
    return entity;
  }

  async update(id: number, updateDto: UpdateLocationDto) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException(`Location with ID ${id} not found`);
    }

    Object.assign(entity, updateDto);

    return this.repo.save(entity);
  }

  async remove(id: number) {
    const result = await this.repo.delete(id);
    if (result.affected === 0) throw new NotFoundException('找不到該地點以供刪除');
    return { success: true };
  }
}
