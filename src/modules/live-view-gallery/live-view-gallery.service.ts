import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLiveViewGalleryDto } from './dto/create-live-view-gallery.dto';
import { UpdateLiveViewGalleryDto } from './dto/update-live-view-gallery.dto';
import { LiveViewGallery } from './entities/live-view-gallery.entity';

@Injectable()
export class LiveViewGalleryService {
  constructor(
    @InjectRepository(LiveViewGallery)
    private readonly repo: Repository<LiveViewGallery>,
  ) {}

  /**
   * 創建新的畫廊項目
   */
  async create(createDto: CreateLiveViewGalleryDto): Promise<LiveViewGallery> {
    const gallery = this.repo.create(createDto);
    return await this.repo.save(gallery);
  }

  /**
   * 查詢所有畫廊項目（不分頁，僅返回啟用的項目）
   * 按 sort 和 createdAt 排序
   */
  async findAll(): Promise<LiveViewGallery[]> {
    return await this.repo.find({
      where: { isActive: true },
      order: { sort: 'ASC', createdAt: 'DESC' },
    });
  }

  /**
   * 查詢單個畫廊項目（by UUID）
   */
  async findOne(id: string): Promise<LiveViewGallery> {
    const gallery = await this.repo.findOne({ where: { id } });
    if (!gallery) {
      throw new NotFoundException(`找不到 ID 為 ${id} 的畫廊項目`);
    }
    return gallery;
  }

  /**
   * 更新畫廊項目
   */
  async update(id: string, updateDto: UpdateLiveViewGalleryDto): Promise<LiveViewGallery> {
    const gallery = await this.repo.preload({ id, ...updateDto });
    if (!gallery) {
      throw new NotFoundException(`找不到 ID 為 ${id} 的畫廊項目`);
    }
    return await this.repo.save(gallery);
  }

  /**
   * 刪除畫廊項目
   */
  async remove(id: string): Promise<void> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`找不到 ID 為 ${id} 的畫廊項目`);
    }
  }
}
