import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto'; // 記得建立這個 DTO
import { History } from './entities/history.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private readonly repo: Repository<History>,
  ) { }

  async create(createDto: CreateHistoryDto) {
    // 💡 使用 as any 避開 JSONB 索引簽名檢查問題
    const entity = this.repo.create(createDto as any);
    return await this.repo.save(entity);
  }

  async findAll() {
    // 💡 關鍵：確保時間軸永遠按 sort 欄位升序排列
    return await this.repo.find({
      order: { sort: 'ASC' }
    });
  }

  async findOne(id: string) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException(`History node with ID ${id} not found`);
    return entity;
  }

  async update(id: string, updateDto: UpdateHistoryDto) {
    const entity = await this.findOne(id);
    Object.assign(entity, updateDto);
    return await this.repo.save(entity);
  }

  async remove(id: string) {
    const result = await this.repo.delete(id);
    if (result.affected === 0) throw new NotFoundException('找不到該歷史節點以供刪除');
    return { success: true };
  }
}