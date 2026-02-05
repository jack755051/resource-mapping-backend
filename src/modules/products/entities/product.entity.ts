// src/modules/products/entities/product.entity.ts
import { ProductCategory } from '../../product-categories/entities/product-category.entity';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

// 💡 保持跟 OfficeCategory 一致的結構
export interface I18nText {
  zh: string;
  en: string;
}

export interface I18nArray {
  zh: string[];
  en: string[];
}

export interface ProductSpecItem {
  label: I18nText; // 💡 規格名稱通常也需要翻譯
  value: string;
  type: string;
}

export interface ProductDownload {
  id: string;
  title: I18nText; // 💡 下載檔案名稱通常也需要翻譯
  type: string;
  size: number;
  date: string;
  url: string;
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'jsonb', default: { zh: '新品上市', en: 'NEW ARRIVAL' } })
  tag: I18nText; // 💡 標籤改為多語系

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'jsonb' })
  title: I18nText; // 💡 標題改為多語系

  @ManyToOne(() => ProductCategory, (category) => category.products, {
    eager: false,
  })
  category: ProductCategory;

  @Column()
  image: string;

  @Column({ nullable: true })
  href: string;

  @Column()
  model: string;

  @Column('text', { array: true, default: [] })
  tags: string[]; // 這裡的 tags 通常是 SEO 用，維持 string[] 或依需求調整

  @Column({ type: 'jsonb', nullable: true })
  specs: ProductSpecItem[];

  @Column({ type: 'jsonb' })
  description: I18nText; // 💡 描述改為多語系

  @Column({ type: 'jsonb', default: { zh: [], en: [] } })
  features: I18nArray; // 💡 特點列表改為多語系

  @Column('text', { array: true, default: [] })
  images: string[];

  @Column({ type: 'jsonb', nullable: true })
  downloads: ProductDownload[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
