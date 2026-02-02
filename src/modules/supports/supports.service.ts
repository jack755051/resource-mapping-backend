import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Support } from './entities/support.entity';
import { Repository } from 'typeorm';
import { QuerySupportDto } from './dto/query-support.dto';
import { CreateSupportDto } from './dto/create-support.dto';
import { UpdateSupportDto } from './dto/update-support.dto';

@Injectable()
export class SupportsService {
  constructor(
    @InjectRepository(Support)
    private readonly repo: Repository<Support>,
  ) {}

  async create(dto: CreateSupportDto) {
    const { categoryId, ...rest } = dto;

    const entity = this.repo.create({
      ...rest,
      category: { id: categoryId } as any,
    } as any);

    return await this.repo.save(entity);
  }

  async findAll(query: QuerySupportDto) {
    const { keyword, categoryId, page, limit } = query;
    const skip = (page - 1) * limit;

    const queryBuilder = this.repo
      .createQueryBuilder('support')
      .leftJoinAndSelect('support.category', 'category')
      .orderBy('support.sort', 'ASC')
      .addOrderBy('support.createdAt', 'DESC')
      .skip(skip)
      .take(limit);

    // 💡 關鍵字搜尋 (支援 i18n JSONB 搜尋)
    if (keyword) {
      queryBuilder.andWhere(
        "(support.title->>'zh' ILIKE :kw OR support.title->>'en' ILIKE :kw)",
        { kw: `%${keyword}%` },
      );
    }

    // 💡 類別過濾
    if (categoryId && categoryId !== 'all') {
      queryBuilder.andWhere('category.id = :categoryId', { categoryId });
    }

    const [items, total] = await queryBuilder.getManyAndCount();

    // 💡 封裝成前端要的 PaginatedResDto 格式
    return {
      data: items,
      total: total, // 💡 放在最外層，讓 TransformInterceptor 識別
      meta: {
        pagination: {
          current_page: Number(page),
          total_pages: Math.ceil(total / limit),
          total_items: total,
          items_per_page: Number(limit),
        },
      },
    };
  }

  async update(id: string, dto: UpdateSupportDto) {
    // 1. 先確認資料是否存在，這也能確保 findOne 的邏輯被複用
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException(`Support resource with ID ${id} not found`);
    }

    // 2. 解構出 categoryId，因為它在資料庫中是關聯物件而非字串
    const { categoryId, ...rest } = dto;

    // 3. 合併一般欄位
    Object.assign(entity, rest);

    // 4. 如果有傳入新的類別 ID，更新關聯物件
    if (categoryId) {
      entity.category = { id: categoryId } as any;
    }

    // 5. 儲存並回傳
    return await this.repo.save(entity);
  }

  async delete(id: string) {
    return await this.repo.delete(id);
  }
}
