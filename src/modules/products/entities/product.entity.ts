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

// 💡 定義巢狀介面，方便實體內部型別檢查
export interface ProductSpecItem {
    label: string;
    value: string;
    type: string;
}

export interface ProductDownload {
    id: string;
    title: string;
    type: string;
    size: number;
    date: string;
    url: string;
}

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid') // 比照你的 ContactForm 使用 uuid
    id: string;

    @Column({ default: 'NEW ARRIVAL' })
    tag: string;

    @Column({ unique: true }) // Slug 必須唯一，方便 SEO 查詢
    slug: string;

    @Column()
    title: string;

    @ManyToOne(() => ProductCategory, (category) => category.products, { eager: false })
    category: ProductCategory;

    @Column()
    image: string; // 主圖路徑

    @Column({ nullable: true })
    href: string; // 預先組好的連結

    @Column()
    model: string; // 型號

    @Column('text', { array: true, default: [] }) // 標籤陣列
    tags: string[];

    // 💡 複雜物件使用 jsonb 儲存
    @Column({ type: 'jsonb', nullable: true })
    specs: ProductSpecItem[];

    @Column('text')
    description: string;

    @Column('text', { array: true, default: [] })
    features: string[];

    @Column('text', { array: true, default: [] })
    images: string[]; // 畫廊圖片路徑陣列

    @Column({ type: 'jsonb', nullable: true })
    downloads: ProductDownload[];

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;
}