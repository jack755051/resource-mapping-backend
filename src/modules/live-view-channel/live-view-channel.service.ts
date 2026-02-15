import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { CreateLiveViewChannelDto } from './dto/create-live-view-channel.dto';
import { UpdateLiveViewChannelDto } from './dto/update-live-view-channel.dto';
import { QueryLiveViewChannelDto } from './dto/query-live-view-channel.dto';
import { LiveViewChannel } from './entities/live-view-channel.entity';

@Injectable()
export class LiveViewChannelService {
  constructor(
    @InjectRepository(LiveViewChannel)
    private readonly repo: Repository<LiveViewChannel>,
  ) {}

  /**
   * 創建新的即時監控頻道
   */
  async create(createDto: CreateLiveViewChannelDto): Promise<LiveViewChannel> {
    // 檢查名稱是否已存在
    const existing = await this.repo.findOne({ where: { name: createDto.name } });
    if (existing) {
      throw new BadRequestException(`頻道名稱 "${createDto.name}" 已經存在`);
    }

    const channel = this.repo.create(createDto);
    return await this.repo.save(channel);
  }

  /**
   * 分頁查詢所有頻道（支援搜尋）
   */
  async findAll(query: QueryLiveViewChannelDto) {
    const { page = 1, limit = 10, search } = query;
    const skip = (page - 1) * limit;

    // 構建查詢條件
    let whereCondition: any = {};

    // 如果有搜尋關鍵字，則搜尋 name 或 description
    if (search) {
      const searchPattern = `%${search}%`;
      whereCondition = [
        { name: ILike(searchPattern) },
        { description: ILike(searchPattern) },
      ];
    }

    const [items, total] = await this.repo.findAndCount({
      where: whereCondition,
      order: { sort: 'ASC', createdAt: 'DESC' },
      take: limit,
      skip: skip,
    });

    return {
      items,
      meta: {
        total,
        page,
        limit,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  /**
   * 查詢單個頻道（by UUID）
   */
  async findOne(id: string): Promise<LiveViewChannel> {
    const channel = await this.repo.findOne({ where: { id } });
    if (!channel) {
      throw new NotFoundException(`找不到 ID 為 ${id} 的頻道`);
    }
    return channel;
  }

  /**
   * 更新頻道資訊
   */
  async update(id: string, updateDto: UpdateLiveViewChannelDto): Promise<LiveViewChannel> {
    const channel = await this.repo.preload({ id, ...updateDto });
    if (!channel) {
      throw new NotFoundException(`找不到 ID 為 ${id} 的頻道`);
    }
    return await this.repo.save(channel);
  }

  /**
   * 刪除頻道
   */
  async remove(id: string): Promise<void> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`找不到 ID 為 ${id} 的頻道`);
    }
  }
}
