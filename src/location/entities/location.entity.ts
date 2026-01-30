import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OfficeType } from "src/office-types/entities/office-type.entity";

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

    // 辦公室類型：總公司 / 分公司 / 辦事處 (i18n)
    @ManyToOne(() => OfficeType, (officeType) => officeType.locations)
    officeType: OfficeType;

    // 排序用：請維持純數字或簡單字串
    @Column()
    sort: number;
}