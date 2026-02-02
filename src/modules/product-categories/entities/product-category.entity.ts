// src/product-categories/entities/product-category.entity.ts
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductCategory {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // 產品種類名稱 (i18n)
    @Column({ type: 'jsonb' })
    name: { zh: string; en: string;[key: string]: string };

    // 產品種類描述 (i18n, 選配)
    @Column({ type: 'jsonb', nullable: true })
    description: { zh: string; en: string;[key: string]: string };

    // 識別碼 (如: iot-devices, sensors)
    @Column({ unique: true })
    value: string;

    @Column({ default: 0 })
    sort: number;
}