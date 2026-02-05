// src/modules/products/products.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Raw, Repository } from 'typeorm';
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
    const ALL_SERIES_ID = '27a8a0d1-61ce-4746-82fe-468403cb5ab2'; // 💡 來自資料庫的 ID

    // 1. 基礎過濾條件
    const whereCondition: any = {};

    // 💡 如果 categoryId 不是「全系列」，才加入過濾條件
    if (categoryId && categoryId !== ALL_SERIES_ID) {
      whereCondition.category = { id: categoryId };
    }

    // 2. 處理搜尋邏輯 (包含 JSONB 內部搜尋)
    let finalWhere = whereCondition;

    if (search) {
      const searchPattern = `%${search}%`;
      // 💡 使用陣列代表 "OR" 邏輯：型號符合 OR 標題(中)符合 OR 標題(英)符合
      finalWhere = [
        { ...whereCondition, model: ILike(searchPattern) },
        {
          ...whereCondition,
          title: Raw((alias) => `${alias} ->> 'zh' ILike :val`, { val: searchPattern })
        },
        {
          ...whereCondition,
          title: Raw((alias) => `${alias} ->> 'en' ILike :val`, { val: searchPattern })
        },
      ];
    }

    const [items, total] = await this.repo.findAndCount({
      where: finalWhere,
      relations: ['category'],
      order: { createdAt: 'DESC' },
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