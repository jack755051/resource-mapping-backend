// src/product-categories/entities/product-category.entity.ts
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class ProductCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // 產品種類名稱 (i18n)
  @Column({ type: 'jsonb' })
  name: { zh: string; en: string; [key: string]: string };

  // 💡 產品種類描述 (i18n, 選配) - 完整保留
  @Column({ type: 'jsonb', nullable: true })
  description: { zh: string; en: string; [key: string]: string };

  // 識別碼 (如: iot-devices)
  @Column({ unique: true })
  value: string;

  // 💡 排序欄位 - 完整保留，這對前端選單排序至關重要
  @Column({ default: 0 })
  sort: number;

  // 💡 建立反向關聯，方便一次查詢該分類下所有產品
  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
