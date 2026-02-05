// src/modules/products/products.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductCategory } from '../product-categories/entities/product-category.entity';
import { QueryProductDto } from './dto/query-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
  ) { }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { categoryId, ...productData } = createProductDto;

    const existing = await this.repo.findOne({ where: { slug: productData.slug } });
    if (existing) throw new BadRequestException('Slug 已經存在');

    const product = this.repo.create(productData);
    if (categoryId) product.category = { id: categoryId } as ProductCategory;

    return await this.repo.save(product);
  }

  async createMulti(dtos: CreateProductDto[]): Promise<Product[]> {
    const products = dtos.map(dto => {
      const { categoryId, ...data } = dto;
      const p = this.repo.create(data);
      if (categoryId) p.category = { id: categoryId } as ProductCategory;
      return p;
    });
    return await this.repo.save(products);
  }

  async findAll(query: QueryProductDto) {
    const {
      page = 1,
      limit = 10,
      search,
      categoryId
    } = query;

    const skip = (page - 1) * limit;

    // 建立查詢條件
    const whereCondition: any = {};

    // 如果有傳入 categoryId，則過濾該分類
    if (categoryId) {
      whereCondition.category = { id: categoryId };
    }

    // 如果有搜尋字串，針對 title 或 model 進行模糊搜尋 (不分大小寫)
    // 💡 注意：由於 title 現在是 JSONB，搜尋邏輯會稍微複雜
    // 這裡示範基本的欄位搜尋，若要搜尋 JSONB 內部文字，建議在資料庫層優化
    const searchConditions = search ? [
      { ...whereCondition, model: ILike(`%${search}%`) },
      // 如果 title 是字串，可以直接 ILike；如果是 JSONB，建議搭配特定的原始查詢
    ] : whereCondition;

    const [items, total] = await this.repo.findAndCount({
      where: searchConditions,
      relations: ['category'],
      order: { createdAt: 'DESC' },
      take: limit,
      skip: skip,
    });

    // 💡 回傳與 ContactFormService 一致的結構
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

  async findOne(idOrSlug: string): Promise<Product> {
    const product = await this.repo.findOne({
      where: [{ id: idOrSlug }, { slug: idOrSlug }],
      relations: ['category'],
    });
    if (!product) throw new NotFoundException(`Product not found`);
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const { categoryId, ...data } = updateProductDto;

    const product = await this.repo.preload({ id, ...data });
    if (!product) throw new NotFoundException(`Product #${id} not found`);

    if (categoryId) product.category = { id: categoryId } as ProductCategory;

    return await this.repo.save(product);
  }

  async remove(id: string): Promise<void> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Product #${id} not found`);
  }
}