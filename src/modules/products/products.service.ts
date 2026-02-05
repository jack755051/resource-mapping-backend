import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
  ) { }

  // 1. 建立單筆產品
  async create(createProductDto: CreateProductDto): Promise<Product> {
    // 💡 這裡假設 DTO 裡有 categoryId
    const product = this.repo.create(createProductDto);
    return await this.repo.save(product);
  }

  // 2. 建立多筆產品 (針對你提問的 createMulti)
  async createMulti(createProductDtos: CreateProductDto[]): Promise<Product[]> {
    const products = this.repo.create(createProductDtos);
    return await this.repo.save(products);
  }

  // 3. 查詢所有產品 (包含分類資訊)
  async findAll(): Promise<Product[]> {
    return await this.repo.find({
      relations: ['category'], // 💡 務必加上這行，前端才能拿到分類資料
      order: { createdAt: 'DESC' },
    });
  }

  // 4. 依據 ID 或 Slug 查詢
  async findOne(idOrSlug: string): Promise<Product> {
    const product = await this.repo.findOne({
      where: [
        { id: idOrSlug },
        { slug: idOrSlug }
      ],
      relations: ['category'],
    });

    if (!product) {
      throw new NotFoundException(`Product with identifier ${idOrSlug} not found`);
    }
    return product;
  }

  // 5. 更新產品
  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    // 💡 使用 preload 可以自動處理關聯並合併變動
    const product = await this.repo.preload({
      id,
      ...updateProductDto,
    });

    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return await this.repo.save(product);
  }

  // 6. 刪除產品
  async remove(id: string): Promise<void> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product #${id} not found`);
    }
  }
}