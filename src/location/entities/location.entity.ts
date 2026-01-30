import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { LocationCategory } from "src/location-categories/entities/location-category.entity";

/**
 * 聯絡地址
 */
@Entity()
export class Location {
    @PrimaryGeneratedColumn()
    id: number;

    // 地點名稱 (i18n)
    @Column({ type: 'jsonb', nullable: true })
    name: { [key: string]: string };

    // 類別：總公司 / 分公司 / 辦事處 (i18n)
    @ManyToOne(() => LocationCategory, (category) => category.locations)
    category: LocationCategory;

    // 排序用：請維持純數字或簡單字串
    @Column()
    sort: number;
}